import React from 'react';
import { View, StyleSheet, Image, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '../ThemedText';
import { ThemedButton } from '../ThemedButton';

interface GameHeaderProps {
  score: number;
  countryCode: string;
  isPaused: boolean;
  onPause: () => void;
}

export function GameHeader({ score, countryCode, isPaused, onPause }: GameHeaderProps) {
  const router = useRouter();

  const exitButtonStyle: ViewStyle = {
    ...styles.button,
    backgroundColor: '#ff4444',
  };

  return (
    <View style={styles.header}>
      <View style={styles.scoreContainer}>
        <ThemedText style={styles.score}>Score: {score}</ThemedText>
        {countryCode && (
          <Image
            source={{ uri: `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png` }}
            style={styles.flag}
          />
        )}
      </View>
      
      <View style={styles.buttonContainer}>
        <ThemedButton
          title={isPaused ? "Devam Et" : "Duraklat"}
          onPress={onPause}
          variant="secondary"
          style={styles.button}
        />
        <ThemedButton
          title="Çıkış"
          onPress={() => router.push('/')}
          variant="secondary"
          style={exitButtonStyle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    marginBottom: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  flag: {
    width: 30,
    height: 20,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    minWidth: 100,
  },
}); 