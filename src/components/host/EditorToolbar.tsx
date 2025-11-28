import { memo } from "react";
import * as S from "../ui/Styled";
import { TrashIcon } from "../ui/Icons";
import { useTranslation } from "../../hooks/useTranslation";

interface EditorToolbarProps {
 onInsertTag: (tag: string) => void;
 onClear: () => void;
}

export const EditorToolbar = memo(({ onInsertTag, onClear }: EditorToolbarProps) => {
 const { t } = useTranslation();

 return (
  <S.FormattingToolbar>
   <div className="flex items-center">
    <span className="text-[10px] uppercase font-bold text-slate-500 mr-3 tracking-wider">{t("host.editor.highlight")}</span>
    <div
     className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg border border-slate-700/50"
     role="group"
     aria-label="Text Highlights"
    >
     <S.ColorButton color="red" label="Red Highlight" onClick={() => onInsertTag("r")} />
     <S.ColorButton color="yellow" label="Yellow Highlight" onClick={() => onInsertTag("y")} />
     <S.ColorButton color="green" label="Green Highlight" onClick={() => onInsertTag("g")} />
     <S.ColorButton color="blue" label="Blue Highlight" onClick={() => onInsertTag("b")} />
    </div>
   </div>

   <S.ToolbarDivider />

   <S.IconButton
    onClick={onClear}
    className="hover:text-red-400"
    aria-label="Clear All Text"
    title="Clear All Text"
   >
    <TrashIcon className="w-4 h-4" />
   </S.IconButton>

   <span className="text-[10px] text-slate-600 hidden sm:inline-block ml-2 font-mono pl-3 border-l border-slate-800">
    {t("host.tips.desc")} &lt;tag&gt;
   </span>
  </S.FormattingToolbar>
 );
});
