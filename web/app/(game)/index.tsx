import { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { CountryPicker } from '@/components/game/CountryPicker';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';

export default function HomeScreen() {
  const [playerName, setPlayerName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const router = useRouter();

  const handleStartGame = () => {
    if (!playerName.trim() || !selectedCountry) {
      return;
    }
    
    router.push({
      pathname: '/game',
      params: {
        playerName,
        country: selectedCountry
      }
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Snake Game
      </ThemedText>

      <ThemedView style={styles.formContainer}>
        <TextInput
          placeholder="Enter your name"
          value={playerName}
          onChangeText={setPlayerName}
          style={styles.input}
        />

        <CountryPicker
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
        />

        <Button 
          onPress={handleStartGame}
          disabled={!playerName.trim() || !selectedCountry}
          style={styles.startButton}
        >
          Start Game
        </Button>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1A1D21', // Dark mode background
  },
  title: {
    fontSize: 48,
    marginBottom: 60,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  formContainer: {
    width: Platform.OS === 'web' ? 400 : '100%',
    maxWidth: '100%',
    gap: 20,
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#2D3748',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#374151',
  },
  startButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#48B8A0', // Secondary Teal from design system
    marginTop: 20,
  },
}); 