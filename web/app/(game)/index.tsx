import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { CountryPicker } from '@/components/game/CountryPicker';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';

export default function HomeScreen() {
  const [playerName, setPlayerName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleStartGame = () => {
    if (!playerName.trim() || !selectedCountry) {
      // Show error
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
      >
        Start Game
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 40,
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
}); 