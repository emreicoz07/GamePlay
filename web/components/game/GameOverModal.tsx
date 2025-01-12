import { StyleSheet, Modal, View, Platform } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { CountryFlag } from './CountryFlag';
import { useThemeColor } from '@/hooks/useThemeColor';

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
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'border');

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <ThemedView style={styles.container}>
        <ThemedView 
          style={[
            styles.content,
            { 
              backgroundColor,
              borderColor,
              width: Platform.OS === 'web' ? 400 : '80%',
            }
          ]}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <ThemedText type="title" style={styles.gameOverText}>
              Game Over!
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Great effort! Here's how you did:
            </ThemedText>
          </View>

          {/* Score Section */}
          <View style={styles.scoreSection}>
            <View style={styles.scoreCircle}>
              <ThemedText type="title" style={styles.scoreNumber}>
                {score}
              </ThemedText>
              <ThemedText style={styles.scoreLabel}>POINTS</ThemedText>
            </View>
          </View>

          {/* Player Info Section */}
          <View style={styles.playerInfo}>
            <ThemedText type="subtitle" style={styles.playerName}>
              {playerName}
            </ThemedText>
            <CountryFlag countryCode={countryCode} size={24} />
          </View>

          {/* Buttons Section */}
          <View style={styles.buttonContainer}>
            <Button 
              onPress={onRestart} 
              style={[styles.button, styles.primaryButton]}
            >
              Play Again
            </Button>
            
            <Button 
              onPress={() => router.push('/(game)/leaderboard')}
              style={[styles.button, styles.secondaryButton]}
            >
              View Leaderboard
            </Button>
            
            <Button 
              onPress={() => router.back()} 
              style={[styles.button, styles.tertiaryButton]}
            >
              Exit to Menu
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
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    padding: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      default: {
        elevation: 5,
      },
    }),
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  gameOverText: {
    fontSize: 36,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  scoreSection: {
    marginVertical: 24,
    alignItems: 'center',
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#48B8A0', // Secondary Teal
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreNumber: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
  },
  scoreLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(72, 184, 160, 0.1)', // Secondary Teal with opacity
  },
  playerName: {
    fontSize: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#48B8A0', // Secondary Teal
  },
  secondaryButton: {
    backgroundColor: '#2A6B9B', // Primary Blue
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6B7280', // Muted Text
  },
}); 