import { defineTheme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";

/**
 * Neutral light surfaces with Linka orange. Uses token overrides, not
 * `color.accent`, so Neutral's gray/white scale is not regenerated from orange.
 */
export const linkaTheme = defineTheme({
  name: "linka",
  extends: neutralTheme,
  tokens: {
    "--color-accent": ["#ff5c39", "#ff5c39"],
    "--color-on-accent": ["#2a100b", "#2a100b"],
    "--color-accent-muted": ["#ffe4dc", "#503424"],
    "--color-text-accent": ["#c43a1f", "#ffb37e"],
    "--color-icon-accent": ["#c43a1f", "#ff9e55"],
  },
});
