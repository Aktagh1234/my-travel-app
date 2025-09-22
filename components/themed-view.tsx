import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'background' | 'card'; // 'card' for card/section, 'background' for page bg
};

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function ThemedView({ style, lightColor, darkColor, variant = 'background', ...otherProps }: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const backgroundColor =
    variant === 'card'
      ? useThemeColor({ light: lightColor, dark: darkColor }, 'card')
      : useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  // Card shadow style (soft shadow)
  const cardShadow =
    variant === 'card'
      ? {
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: theme.border,
        }
      : {};

  return <View style={[{ backgroundColor }, cardShadow, style]} {...otherProps} />;
}
