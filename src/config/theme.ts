// src/config/theme.ts

export const THEME_LIGHT = "light";
export const THEME_DARK = "dark";

// Обʼєкти з відповідними стилями
export const themes = {
  [THEME_LIGHT]: {
    background: "#ffffff", // білий фон
    color: "#000000", // чорний текст
  },
  [THEME_DARK]: {
    background: "#000000", // чорний фон
    color: "#ffffff", // білий текст
  },
};
