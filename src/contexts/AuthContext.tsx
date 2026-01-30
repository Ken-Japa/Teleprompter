import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth, db } from "../config/firebase-client";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { logger } from "../utils/logger";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    isPro: boolean;
    proSource: "local" | "account" | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPro, setIsPro] = useState(false);
    const [proSource, setProSource] = useState<"local" | "account" | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // Check if user is PRO in Firestore
                try {
                    const userRef = doc(db, "users", currentUser.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        if (userData.isPro) {
                            setIsPro(true);
                            setProSource("account");
                        } else {
                            // User exists but is not PRO. 
                            // Default to checking Local Storage later (outside this context or via current implementation)
                            // For now, we only set isPro=true here if the account has it.
                            setIsPro(false);
                            setProSource(null);
                        }
                    } else {
                        // Create user document if it doesn't exist
                        await setDoc(userRef, {
                            email: currentUser.email,
                            createdAt: serverTimestamp(),
                            isPro: false
                        });
                        setIsPro(false);
                        setProSource(null);
                    }
                } catch (error) {
                    logger.error("Error fetching user data", { error: error as Error });
                }
            } else {
                setIsPro(false);
                setProSource(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error: any) {
            if (error?.code === 'auth/popup-closed-by-user') {
                logger.warn("Login popup closed by user");
                return; // Don't throw for simple closure
            }
            logger.error("Error logging in with Google", { error: error as Error });
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            logger.error("Error logging out", { error: error as Error });
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout, isPro, proSource }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
