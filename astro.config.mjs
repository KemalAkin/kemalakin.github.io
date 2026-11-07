// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";

// Old academicpages URLs -> new routes. GitHub Pages has no server redirects, so Astro
// emits a small meta-refresh page at each old path.
const legacyRedirects = {
  "/about": "/",
  "/resume": "/cv/",
  "/year-archive": "/writing/",
  "/portfolio": "/#work",
  "/publications": "/research/",
  "/talks": "/research/#talks",
  "/teaching": "/research/#teaching",

  "/posts/2022/04/sir": "/writing/sir-model/",
  "/posts/2021/04/frw-models": "/writing/frw-universe/",
  "/posts/2012/08/dsa-lcdm": "/writing/dynamical-system-lcdm/",
  "/posts/2022/04/technical-analysis": "/work/technical-analysis/",

  "/portfolio/1_koronoloji": "/work/koronoloji/",
  "/portfolio/2_dow_jones": "/work/dow-jones/",
  "/portfolio/2_frw": "/writing/frw-universe/",
  "/portfolio/2_interactive-excel-dashboard": "/work/sales-dashboard/",
  "/portfolio/3_infectious_disease": "/work/infectious-disease/",
  "/portfolio/4_portfolio-crypto": "/work/portfolio-tracker/",
  "/portfolio/5_ta-crypto": "/work/technical-analysis/",
  "/portfolio/6_inflationary_cosmology": "/work/inflationary-cosmology/",
  "/portfolio/7_classification_forensic_evidence": "/work/forensic-evidence/",
  "/portfolio/8_dynamical_system_quintessence": "/work/quintessence/",

  "/publication/formalizing-SR": "/research/#publications",
  "/talks/inflationary-cosmology": "/research/#talk-inflationary-cosmology",
  "/talks/introduction-cosmology": "/research/#talk-introduction-cosmology",
  "/talks/document-latex": "/research/#talk-document-latex",
  "/talks/mendeley": "/research/#talk-mendeley",
  "/teaching/2021-forensic-physics-I-II": "/research/#teaching",
  "/teaching/2021-spring-forensic-mathematics": "/research/#teaching",
  "/teaching/2021-spring-csi": "/research/#teaching",
  "/teaching/2021-spring-criminalistics": "/research/#teaching",
};

export default defineConfig({
  site: "https://kemalakin.github.io",
  redirects: legacyRedirects,
  integrations: [
    expressiveCode({
      themes: ["github-dark-default"],
      plugins: [pluginLineNumbers()],
      // Every block gets the macOS-style window frame from the prototype.
      defaultProps: { frame: "terminal", showLineNumbers: true },
      styleOverrides: {
        borderRadius: "12px",
        borderColor: "rgba(215, 222, 235, 0.10)",
        codeBackground: "#0E131C",
        codeFontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace',
        codeFontSize: "0.84rem",
        codeLineHeight: "1.7",
        uiFontFamily: '"JetBrains Mono", ui-monospace, monospace',
        frames: {
          editorBackground: "#0E131C",
          terminalBackground: "#0E131C",
          terminalTitlebarBackground: "#141B27",
          terminalTitlebarForeground: "#5F6A7E",
          terminalTitlebarBorderBottomColor: "rgba(215, 222, 235, 0.10)",
          terminalTitlebarDotsOpacity: "1",
          frameBoxShadowCssValue: "0 18px 40px -24px rgba(5, 10, 20, 0.55)",
          inlineButtonForeground: "#D6DCE6",
          inlineButtonBorder: "rgba(215, 222, 235, 0.25)",
        },
      },
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    // Astro 7 defaults to the Sätteri processor; math needs the unified (remark/rehype) pipeline.
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
