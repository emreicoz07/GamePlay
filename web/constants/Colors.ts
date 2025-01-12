/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
  light: {
    text: '#1A1D21',
    background: '#F5F7FA',
    tint: '#2A6B9B',
    icon: '#6B7280',
    tabIconDefault: '#6B7280',
    tabIconSelected: '#2A6B9B',
    border: '#E5E7EB',
    gridBackground: '#EDF2F7',
    buttonPrimary: '#2196F3',
    buttonSecondary: '#E0E0E0',
    buttonDisabled: '#BDBDBD',
    textPrimary: '#FFFFFF',
    textSecondary: '#000000',
    textDisabled: '#757575',
  },
  dark: {
    text: '#FFFFFF',
    background: '#1A1D21',
    tint: '#48B8A0',
    icon: '#6B7280',
    tabIconDefault: '#6B7280',
    tabIconSelected: '#48B8A0',
    border: '#374151',
    gridBackground: '#2D3748',
    buttonPrimary: '#1976D2',
    buttonSecondary: '#424242',
    buttonDisabled: '#616161',
    textPrimary: '#FFFFFF',
    textSecondary: '#FFFFFF',
    textDisabled: '#9E9E9E',
  },
};

export type ColorScheme = keyof typeof Colors;
