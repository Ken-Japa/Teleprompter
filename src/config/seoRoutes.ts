import React from "react";

export const SeoPages = {
 TeleprompterOnlineGratis: React.lazy(() =>
  import("../pages/seo/TeleprompterOnlineGratis").then((module) => ({
   default: module.TeleprompterOnlineGratis,
  }))
 ),
 ComoUsarTeleprompter: React.lazy(() =>
  import("../pages/seo/ComoUsarTeleprompter").then((module) => ({ default: module.ComoUsarTeleprompter }))
 ),
 MelhorAppTeleprompter: React.lazy(() =>
  import("../pages/seo/MelhorAppTeleprompter").then((module) => ({
   default: module.MelhorAppTeleprompter,
  }))
 ),
 AlternativasTeleprompterConcorrente: React.lazy(() =>
  import("../pages/seo/AlternativasTeleprompterConcorrente").then((module) => ({
   default: module.AlternativasTeleprompterConcorrente,
  }))
 ),
 TeleprompterParaYoutubers: React.lazy(() =>
  import("../pages/seo/TeleprompterParaYoutubers").then((module) => ({
   default: module.TeleprompterParaYoutubers,
  }))
 ),
 TeleprompterTravandoSolucao: React.lazy(() =>
  import("../pages/seo/TeleprompterTravandoSolucao").then((module) => ({
   default: module.TeleprompterTravandoSolucao,
  }))
 ),
 TeleprompterCaseiroDIY: React.lazy(() =>
  import("../pages/seo/TeleprompterCaseiroDIY").then((module) => ({
   default: module.TeleprompterCaseiroDIY,
  }))
 ),
 // Novas páginas
 OratoriaVideo: React.lazy(() =>
  import("../pages/seo/OratoriaVideo").then((module) => ({ default: module.OratoriaVideo }))
 ),
 ComoDecorarTexto: React.lazy(() =>
  import("../pages/seo/ComoDecorarTexto").then((module) => ({ default: module.ComoDecorarTexto }))
 ),
};

export type SeoRouteKey =
 | "SEO_GRATIS"
 | "SEO_TUTORIAL"
 | "SEO_MELHOR_APP"
 | "SEO_ALTERNATIVAS"
 | "SEO_YOUTUBERS"
 | "SEO_TRAVANDO"
 | "SEO_DIY"
 | "SEO_ORATORIA"
 | "SEO_DECORAR";
