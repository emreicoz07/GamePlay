import { TextInput as RNTextInput, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type TextInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function TextInput({ placeholder, value, onChangeText, style }: TextInputProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <RNTextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={[
        styles.input,
        { backgroundColor, color: textColor },
        style,
      ]}
      placeholderTextColor="#999"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
}); 