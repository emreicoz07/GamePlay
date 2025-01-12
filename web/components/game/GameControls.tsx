import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import type { Direction } from '@/hooks/useGameLogic';

type GameControlsProps = {
  onDirectionChange: (direction: Direction) => void;
  currentDirection: Direction;
  disabled: boolean;
};

export function GameControls({ onDirectionChange, currentDirection, disabled }: GameControlsProps) {
  return (
    <View style={styles.container}>
      {/* Up Button */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, currentDirection === 'UP' && styles.active]}
          onPress={() => onDirectionChange('UP')}
          disabled={disabled || currentDirection === 'DOWN'}
        >
          <IconSymbol name="chevron.up" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Left and Right Buttons */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, currentDirection === 'LEFT' && styles.active]}
          onPress={() => onDirectionChange('LEFT')}
          disabled={disabled || currentDirection === 'RIGHT'}
        >
          <IconSymbol name="chevron.left" size={32} color="#fff" />
        </TouchableOpacity>

        <View style={styles.spacer} />

        <TouchableOpacity
          style={[styles.button, currentDirection === 'RIGHT' && styles.active]}
          onPress={() => onDirectionChange('RIGHT')}
          disabled={disabled || currentDirection === 'LEFT'}
        >
          <IconSymbol name="chevron.right" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Down Button */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, currentDirection === 'DOWN' && styles.active]}
          onPress={() => onDirectionChange('DOWN')}
          disabled={disabled || currentDirection === 'UP'}
        >
          <IconSymbol name="chevron.down" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#0a7ea4',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  active: {
    backgroundColor: '#065c78',
  },
  spacer: {
    width: 60,
    height: 60,
  },
}); 