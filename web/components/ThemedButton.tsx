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

  const buttonStyle: ViewStyle = {
    ...styles.button,
    backgroundColor: disabled
      ? colors.buttonDisabled
      : variant === 'primary'
      ? colors.buttonPrimary
      : colors.buttonSecondary,
    pointerEvents: disabled ? 'none' : 'auto',
    ...style,
  };

  const textColor = disabled
    ? colors.textDisabled
    : variant === 'primary'
    ? colors.textPrimary
    : colors.textSecondary;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={buttonStyle}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>
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