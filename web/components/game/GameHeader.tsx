import { StyleSheet, View, Platform } from 'react-native';
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
    <View style={[
      styles.container,
      Platform.OS !== 'web' && styles.mobileContainer
    ]}>
      <View style={styles.scoreContainer}>
        <ThemedText type="subtitle">Score: {score}</ThemedText>
        <CountryFlag countryCode={countryCode} size={24} />
      </View>
      
      <Button 
        onPress={onPause}
        style={[
          styles.pauseButton,
          Platform.OS !== 'web' && styles.mobilePauseButton
        ]}
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
  mobileContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingTop: 35,
    paddingBottom: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pauseButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  mobilePauseButton: {
    backgroundColor: '#48B8A0',
    minWidth: 70,
    height: 36,
    borderRadius: 6,
  },
}); 