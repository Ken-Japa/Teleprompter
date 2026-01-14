import { useState } from 'react';
import { GoogleIcon, LogoutIcon } from '../ui/Icons';
import { useAuth } from '../../contexts/AuthContext';

export const GoogleAuthButton = ({ compact = false }: { compact?: boolean }) => {
    const { user, loginWithGoogle, logout, loading } = useAuth();
    const [isHovered, setIsHovered] = useState(false);

    if (loading) return (
        <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse border border-slate-700" />
    );

    if (user) {
        return (
            <div
                className="relative group "
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {compact ? (
                    <button className="w-8 h-8 rounded-full overflow-hidden border border-brand-500/50 shadow-brand-500/20 shadow-md transition-transform hover:scale-105">
                        {user.photoURL ? (
                            <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold">
                                {user.email?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </button>
                ) : (
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-full transition-all group">
                        {user.photoURL ? (
                            <img src={user.photoURL} alt="User" className="w-5 h-5 rounded-full" />
                        ) : (
                            <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[8px] text-white">
                                {user.email?.charAt(0).toUpperCase()}
                            </div>
                        )}

                    </button>
                )}

                {/* Dropdown for Logout */}
                <div className={`absolute top-full right-0 mt-2 w-48 bg-[#0f172a] border border-slate-700 rounded-xl shadow-xl overflow-hidden transition-all duration-200 z-[100] ${isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <div className="p-3 border-b border-slate-800">
                        <p className="text-xs text-slate-400 font-medium truncate">{user.displayName}</p>
                        <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                    </div>
                    <button
                        onClick={() => logout()}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors text-left"
                    >
                        <LogoutIcon className="w-3.5 h-3.5" />
                        Sign Out
                    </button>
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={() => loginWithGoogle()}
            className={`
                group flex items-center justify-center gap-2 
                ${compact ? 'p-2' : 'px-3 py-1.5'}
                bg-white text-slate-900 hover:bg-slate-100
                font-medium text-sm rounded-full transition-all duration-200
                shadow-lg shadow-white/5 active:scale-95
            `}
            title="Sign in with Google"
        >
            <GoogleIcon className="w-4 h-4" />
            {!compact}
        </button>
    );
};
