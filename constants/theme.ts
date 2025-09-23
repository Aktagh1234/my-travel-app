/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';


// New color scheme
const PRIMARY = '#4F46E5'; // Indigo / Deep Blue
const SECONDARY = '#10B981'; // Emerald Green
const ACCENT_WARNING = '#F59E0B'; // Amber/Orange
const ACCENT_DANGER = '#EF4444'; // Red
const BACKGROUND = '#F9FAFB'; // Neutral Light Gray
const CARD = '#fff'; // White
const tintColorLight = PRIMARY;
const tintColorDark = PRIMARY;

export const Colors = {
  light: {
    text: '#1E293B', // Slate-800 for strong contrast
    background: BACKGROUND,
    card: CARD,
    tint: PRIMARY,
    icon: PRIMARY,
    tabIconDefault: '#A1A1AA', // Neutral gray
    tabIconSelected: PRIMARY,
    primary: PRIMARY,
    secondary: SECONDARY,
    warning: ACCENT_WARNING,
    danger: ACCENT_DANGER,
    success: SECONDARY,
    border: '#E5E7EB', // Light border
  },
  dark: {
    text: '#F3F4F6', // Light text
    background: '#18181B', // Very dark gray
    card: '#23232B', // Slightly lighter for cards
    tint: PRIMARY,
    icon: PRIMARY,
    tabIconDefault: '#52525B',
    tabIconSelected: PRIMARY,
    primary: PRIMARY,
    secondary: SECONDARY,
    warning: ACCENT_WARNING,
    danger: ACCENT_DANGER,
    success: SECONDARY,
    border: '#27272A',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
