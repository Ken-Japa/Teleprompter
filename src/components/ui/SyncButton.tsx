import React, { useState } from "react";
import { RefreshIcon } from "./Icons";
import { IconButton } from "./Styled";
import { useTranslation } from "../../hooks/useTranslation";

interface SyncButtonProps {
    onSync: () => void;
    className?: string;
}

export const SyncButton: React.FC<SyncButtonProps> = ({ onSync, className }) => {
    const { t } = useTranslation();
    const [isSpinning, setIsSpinning] = useState(false);

    const handleClick = () => {
        setIsSpinning(true);
        onSync();
        // Stop spinning after a short delay to give feedback
        setTimeout(() => setIsSpinning(false), 1000);
    };

    return (
        <IconButton
            onClick={handleClick}
            className={className}
            title={t("common.sync") || "Sync"}
        >
            <RefreshIcon className={`w-5 h-5 ${isSpinning ? "animate-spin" : ""}`} />
        </IconButton>
    );
};
