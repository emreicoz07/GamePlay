import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { CountryFlag } from '@/components/game/CountryFlag';

type GameHeaderProps = {
  score: number;
  countryCode: string;
  isPaused: boolean;
  onPause: () => void;
};

export function GameHeader({ score, countryCode, isPaused, onPause }: GameHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <ThemedText type="subtitle">Score: {score}</ThemedText>
        <CountryFlag countryCode={countryCode} size={24} />
      </View>
      
      <Button 
        onPress={onPause}
        style={styles.pauseButton}
      >
        {isPaused ? 'Resume' : 'Pause'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pauseButton: {
    paddingHorizontal: 20,
  },
}); 