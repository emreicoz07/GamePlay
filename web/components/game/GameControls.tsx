import { ThemedText } from '@/components/ThemedText';

import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import type { Direction } from '@/hooks/useGameLogic';
import { useEffect } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

type GameControlsProps = {
  onDirectionChange: (direction: Direction) => void;
  currentDirection: Direction;
  disabled?: boolean;
};

export function GameControls({ onDirectionChange, currentDirection, disabled }: GameControlsProps) {
  const buttonColor = useThemeColor({}, 'tint');
  const textColor = '#FFFFFF'; // Light Text

  // Web platformu için klavye kontrollerini ekleyelim
  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (disabled) return;
        
        switch (event.key.toLowerCase()) {
          case 'arrowup':
          case 'w':
            if (currentDirection !== 'DOWN') onDirectionChange('UP');
            break;
          case 'arrowdown':
          case 's':
            if (currentDirection !== 'UP') onDirectionChange('DOWN');
            break;
          case 'arrowleft':
          case 'a':
            if (currentDirection !== 'RIGHT') onDirectionChange('LEFT');
            break;
          case 'arrowright':
          case 'd':
            if (currentDirection !== 'LEFT') onDirectionChange('RIGHT');
            break;
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [onDirectionChange, currentDirection, disabled]);

  // Web platformunda kontrol butonlarını göstermeyelim
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webInstructions}>
        <ThemedText>
          Use WASD or Arrow keys to control the snake
        </ThemedText>
      </View>
    );
  }

  // Mobil platformlar için dokunmatik kontroller
  return (
    <View style={styles.container}>
      {/* Up Button */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: buttonColor },
            currentDirection === 'UP' && styles.active
          ]}
          onPress={() => onDirectionChange('UP')}
          disabled={disabled || currentDirection === 'DOWN'}
        >
          <IconSymbol name="chevron.up" size={32} color={textColor} />
        </TouchableOpacity>
      </View>

      {/* Left and Right Buttons */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: buttonColor },
            currentDirection === 'LEFT' && styles.active
          ]}
          onPress={() => onDirectionChange('LEFT')}
          disabled={disabled || currentDirection === 'RIGHT'}
        >
          <IconSymbol name="chevron.left" size={32} color={textColor} />
        </TouchableOpacity>

        <View style={styles.spacer} />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: buttonColor },
            currentDirection === 'RIGHT' && styles.active
          ]}
          onPress={() => onDirectionChange('RIGHT')}
          disabled={disabled || currentDirection === 'LEFT'}
        >
          <IconSymbol name="chevron.right" size={32} color={textColor} />
        </TouchableOpacity>
      </View>

      {/* Down Button */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: buttonColor },
            currentDirection === 'DOWN' && styles.active
          ]}
          onPress={() => onDirectionChange('DOWN')}
          disabled={disabled || currentDirection === 'UP'}
        >
          <IconSymbol name="chevron.down" size={32} color={textColor} />
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
  webInstructions: {
    padding: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  active: {
    opacity: 0.8,
  },
  spacer: {
    width: 60,
    height: 60,
  },
}); 