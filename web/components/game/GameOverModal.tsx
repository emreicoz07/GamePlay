import { StyleSheet, Modal, View } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { CountryFlag } from './CountryFlag';

type GameOverModalProps = {
  visible: boolean;
  score: number;
  playerName: string;
  countryCode: string;
  onRestart: () => void;
};

export function GameOverModal({
  visible,
  score,
  playerName,
  countryCode,
  onRestart,
}: GameOverModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.gameOver}>
            Game Over!
          </ThemedText>

          <View style={styles.playerInfo}>
            <ThemedText type="subtitle">{playerName}</ThemedText>
            <CountryFlag countryCode={countryCode} size={24} />
          </View>

          <ThemedText type="subtitle" style={styles.score}>
            Score: {score}
          </ThemedText>

          <View style={styles.buttonContainer}>
            <Button onPress={onRestart} style={styles.button}>
              Play Again
            </Button>

            <Button 
              onPress={() => router.push('/leaderboard')} 
              style={styles.button}
            >
              Leaderboard
            </Button>

            <Button 
              onPress={() => router.back()} 
              style={styles.button}
            >
              Exit
            </Button>
          </View>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  gameOver: {
    marginBottom: 20,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  score: {
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  button: {
    width: '100%',
  },
}); 