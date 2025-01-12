import { Image, StyleSheet } from 'react-native';

type CountryFlagProps = {
  countryCode: string;
  size: number;
};

export function CountryFlag({ countryCode, size }: CountryFlagProps) {
  return (
    <Image
      source={{ uri: `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png` }}
      style={[
        styles.flag,
        {
          width: size,
          height: size * 0.75, // Standard flag aspect ratio
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  flag: {
    borderRadius: 4,
  },
}); 