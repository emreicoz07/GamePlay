import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useEffect, useCallback } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

type GameControlsProps = {
  onDirectionChange: (direction: Direction) => void;
  currentDirection: Direction;
  disabled?: boolean;
};

const isOppositeDirection = (dir1: Direction, dir2: Direction): boolean => {
  return (
    (dir1 === 'UP' && dir2 === 'DOWN') ||
    (dir1 === 'DOWN' && dir2 === 'UP') ||
    (dir1 === 'LEFT' && dir2 === 'RIGHT') ||
    (dir1 === 'RIGHT' && dir2 === 'LEFT')
  );
};

export function GameControls({ onDirectionChange, currentDirection, disabled }: GameControlsProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const buttonColor = Colors[colorScheme].buttonPrimary;
  const activeButtonColor = Colors[colorScheme].buttonSecondary;
  const textColor = Colors[colorScheme].textPrimary;

  const handleDirectionChange = useCallback((direction: Direction) => {
    if (disabled) return;
    if (!isOppositeDirection(direction, currentDirection)) {
      onDirectionChange(direction);
    }
  }, [currentDirection, disabled, onDirectionChange]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (disabled) return;
        
        switch (event.key.toLowerCase()) {
          case 'arrowup':
          case 'w':
            handleDirectionChange('UP');
            break;
          case 'arrowdown':
          case 's':
            handleDirectionChange('DOWN');
            break;
          case 'arrowleft':
          case 'a':
            handleDirectionChange('LEFT');
            break;
          case 'arrowright':
          case 'd':
            handleDirectionChange('RIGHT');
            break;
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [handleDirectionChange, disabled]);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.webInstructions}>
        <ThemedText>Use WASD or Arrow keys to control the snake</ThemedText>
      </View>
    );
  }

  const buttonStyle = (direction: Direction) => [
    styles.button,
    { 
      backgroundColor: currentDirection === direction ? activeButtonColor : buttonColor,
      ...(Platform.OS === 'web' 
        ? { boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }
        : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4,
          }
      )
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.controlsGrid}>
        <View style={styles.row}>
          <TouchableOpacity
            style={buttonStyle('UP')}
            onPress={() => handleDirectionChange('UP')}
            disabled={disabled}
          >
            <IconSymbol name="chevron.up" size={32} color={textColor} />
          </TouchableOpacity>
        </View>

        <View style={styles.middleRow}>
          <TouchableOpacity
            style={buttonStyle('LEFT')}
            onPress={() => handleDirectionChange('LEFT')}
            disabled={disabled}
          >
            <IconSymbol name="chevron.left" size={32} color={textColor} />
          </TouchableOpacity>

          <View style={styles.spacer} />

          <TouchableOpacity
            style={buttonStyle('RIGHT')}
            onPress={() => handleDirectionChange('RIGHT')}
            disabled={disabled}
          >
            <IconSymbol name="chevron.right" size={32} color={textColor} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={buttonStyle('DOWN')}
            onPress={() => handleDirectionChange('DOWN')}
            disabled={disabled}
          >
            <IconSymbol name="chevron.down" size={32} color={textColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  controlsGrid: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 60,
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
  },
  spacer: {
    width: 60,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webInstructions: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
}); 