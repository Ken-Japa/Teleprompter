import React, { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { trackEvent } from "../../utils/analytics";

interface ShareButtonProps {
    variant?: 'primary' | 'secondary' | 'icon' | 'card';
    className?: string;
}

/**
 * ShareButton Component
 * 
 * Uses Web Share API to allow users to share PromptNinja with friends.
 * Falls back to copy-to-clipboard on browsers that don't support Web Share API.
 */
export const ShareButton: React.FC<ShareButtonProps> = ({
    variant = 'secondary',
    className = ''
}) => {
    const { t, lang } = useTranslation();
    const [showFeedback, setShowFeedback] = useState(false);

    // Get localized URL based on current language
    const getShareUrl = (): string => {
        const baseUrl = "https://promptninja.solutionkit.com.br/";

        if (lang === 'pt') {
            return `${baseUrl}#app`;
        } else if (lang === 'en') {
            return `${baseUrl}?lang=en/#app`;
        } else if (lang === 'es') {
            return `${baseUrl}?lang=es/#app`;
        }

        return `${baseUrl}#app`; // Default to Portuguese
    };

    const handleShare = async () => {
        const shareUrl = getShareUrl();
        const shareData = {
            title: t("share.title"),
            text: t("share.text"),
            url: shareUrl,
        };

        // Track share attempt
        trackEvent('share_button_clicked', { lang, url: shareUrl });

        // Check if Web Share API is available
        if (navigator.share) {
            try {
                await navigator.share(shareData);

                // Track successful share
                trackEvent('share_completed', { lang, url: shareUrl });

                setShowFeedback(true);
                setTimeout(() => setShowFeedback(false), 3000);
            } catch (err) {
                // User cancelled or error occurred
                if ((err as Error).name !== 'AbortError') {
                    console.error('Error sharing:', err);
                    // Fallback to copy
                    copyToClipboard(shareUrl);
                }
            }
        } else {
            // Fallback: Copy to clipboard
            copyToClipboard(shareUrl);
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(`${t("share.text")} ${url}`).then(() => {
            setShowFeedback(true);
            setTimeout(() => setShowFeedback(false), 3000);
            trackEvent('share_copied_to_clipboard', { lang, url });
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };

    // Render based on variant
    if (variant === 'card') {
        return (
            <div className={`space-y-3 ${className}`}>
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">
                    {t("share.cardTitle") || t("share.title")}
                </div>
                <div className="bg-gradient-to-br from-brand-600/20 to-purple-600/20 p-4 rounded-xl border border-brand-500/30">
                    <p className="text-sm text-slate-300 mb-3">
                        {t("share.cardDescription") || "Gostou do PromptNinja? Compartilhe com amigos!"}
                    </p>
                    <button
                        onClick={handleShare}
                        className="w-full p-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
                        aria-label={t("share.button")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                        {t("share.button")}
                    </button>
                    {showFeedback && (
                        <p className="text-xs text-green-400 mt-2 text-center animate-fade-in">
                            ✓ {t("share.success")}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    if (variant === 'icon') {
        return (
            <button
                onClick={handleShare}
                className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-95 ${className}`}
                title={t("share.button")}
                aria-label={t("share.button")}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
            </button>
        );
    }

    if (variant === 'primary') {
        return (
            <button
                onClick={handleShare}
                className={`px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 text-white font-bold transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg ${className}`}
                aria-label={t("share.button")}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                {t("share.button")}
                {showFeedback && <span className="text-xs">✓</span>}
            </button>
        );
    }

    // Default: secondary variant
    return (
        <button
            onClick={handleShare}
            className={`px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2 ${className}`}
            aria-label={t("share.button")}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            {t("share.button")}
            {showFeedback && <span className="text-xs text-green-400">✓</span>}
        </button>
    );
};
