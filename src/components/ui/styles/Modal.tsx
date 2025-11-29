import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import tw from "tailwind-styled-components";

export const ModalOverlay = tw.div`
  fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4
`;

export const ModalContent = tw.div`
  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
  bg-[#0a0f1e] rounded-3xl shadow-[0_0_100px_-20px_rgba(99,102,241,0.3)] max-w-2xl w-full max-h-[90vh] overflow-y-auto
  transform transition-all duration-300 ease-out scale-100 opacity-100
  dark:bg-[#0a0f1e] dark:text-slate-100 p-8 border border-indigo-500/30
  scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900
`;

export const ModalHeader = tw.div`
  flex justify-between items-center pb-6 mb-6 border-b border-slate-700
`;

export const ModalTitle = tw.h2`
  text-3xl font-bold font-display
  bg-gradient-to-r from-indigo-400 to-violet-300 bg-clip-text text-transparent
  drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]
`;

export const CloseButton = tw.button`
  p-2.5 rounded-xl transition-all duration-300 border backdrop-blur-sm
  bg-white/5 border-white/5 hover:bg-white/10 text-slate-400 hover:text-white
  hover:border-white/20 hover:scale-105 active:scale-95 text-xl
`;

export const ModalBody = tw.div`
  relative flex-auto text-slate-300 text-lg leading-relaxed font-sans
`;

export const StyledH3 = tw.h3`
  text-2xl font-bold mt-18 mb-4 text-slate-200
`;

export const StyledP = tw.p`
  mb-8 leading-relaxed text-lg font-normal
`;

export const StyledUl = tw.ul`
  list-disc ml-5 mt-4 mb-8
`;

export const StyledLi = tw.li`
  mb-4 font-normal
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById("modal-root");
    if (!element) {
      element = document.createElement("div");
      element.setAttribute("id", "modal-root");
      document.body.appendChild(element);
    }
    setPortalTarget(element);
  }, []);

  if (!portalTarget) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalOverlay>,
    portalTarget
  );
};
