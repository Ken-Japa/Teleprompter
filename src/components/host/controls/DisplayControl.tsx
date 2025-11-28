import { memo } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { FlipIcon, MarginIcon, CapsIcon } from "../../ui/Icons";
import { PrompterSettings, PrompterActions } from "../../../hooks/usePrompterSettings";

interface DisplayControlProps {
 settings: PrompterSettings;
 actions: PrompterActions;
}

export const DisplayControl = memo(({ settings, actions }: DisplayControlProps) => {
 const { t } = useTranslation();
 const { isMirrored, isUpperCase, margin } = settings;
 const { setIsMirrored, setIsUpperCase, setMargin } = actions;

 return (
  <S.HudGroup>
   <S.IconButton
    onClick={() => setIsMirrored(!isMirrored)}
    active={isMirrored}
    title={t("host.mirror")}
    aria-label={t("host.mirror")}
   >
    <FlipIcon />
   </S.IconButton>
   <S.IconButton
    onClick={() => setMargin((m) => (m === 10 ? 30 : 10))}
    active={margin === 30}
    title={t("host.controls.margin")}
    aria-label={t("host.controls.margin")}
   >
    <MarginIcon />
   </S.IconButton>
   <S.IconButton
    onClick={() => setIsUpperCase(!isUpperCase)}
    active={isUpperCase}
    title={t("host.controls.caps")}
    aria-label={t("host.controls.caps")}
   >
    <CapsIcon />
   </S.IconButton>
  </S.HudGroup>
 );
});
