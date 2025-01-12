import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function ThemedButton({ 
  title, 
  onPress, 
  disabled = false,
  variant = 'primary',
  style,
  textStyle
}: ThemedButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getBackgroundColor = () => {
    if (disabled) return colors.buttonDisabled;
    if (variant === 'secondary') return colors.buttonSecondary;
    return colors.buttonPrimary;
  };

  const getTextColor = () => {
    if (disabled) return colors.textDisabled;
    if (variant === 'secondary') return colors.textSecondary;
    return colors.textPrimary;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        style
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          { color: getTextColor() },
          textStyle
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 