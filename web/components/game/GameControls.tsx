import { ThemedText } from '@/components/ThemedText';

import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useEffect, useCallback } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

type GameControlsProps = {
  onDirectionChange: (direction: Direction) => void;
  currentDirection: Direction;
  disabled?: boolean;
};

export function GameControls({ onDirectionChange, currentDirection, disabled }: GameControlsProps) {
  const buttonColor = useThemeColor({}, 'tint');
  const textColor = '#FFFFFF';

  // Yön değişikliği için memoize edilmiş callback'ler
  const handleDirectionChange = useCallback((direction: Direction) => {
    if (disabled) return;
    
    switch(direction) {
      case 'UP':
        if (currentDirection !== 'DOWN') onDirectionChange('UP');
        break;
      case 'DOWN':
        if (currentDirection !== 'UP') onDirectionChange('DOWN');
        break;
      case 'LEFT':
        if (currentDirection !== 'RIGHT') onDirectionChange('LEFT');
        break;
      case 'RIGHT':
        if (currentDirection !== 'LEFT') onDirectionChange('RIGHT');
        break;
    }
  }, [currentDirection, disabled, onDirectionChange]);

  // Platform kontrolü ve klavye olayları
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

  // Dokunmatik butonlar için ortak stil ve davranış
  const TouchButton = useCallback(({ 
    direction, 
    icon 
  }: { 
    direction: Direction; 
    icon: string;
  }) => (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: buttonColor },
        currentDirection === direction && styles.active
      ]}
      onPress={() => handleDirectionChange(direction)}
      disabled={disabled || (
        (direction === 'UP' && currentDirection === 'DOWN') ||
        (direction === 'DOWN' && currentDirection === 'UP') ||
        (direction === 'LEFT' && currentDirection === 'RIGHT') ||
        (direction === 'RIGHT' && currentDirection === 'LEFT')
      )}
      activeOpacity={0.7}
      pressRetentionOffset={{ top: 20, left: 20, right: 20, bottom: 20 }}
      delayPressIn={0}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <IconSymbol name={icon as "chevron.up" | "chevron.down" | "chevron.left" | "chevron.right"} size={32} color={textColor} />
    </TouchableOpacity>
  ), [buttonColor, currentDirection, disabled, handleDirectionChange, textColor]);

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

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchButton direction="UP" icon="chevron.up" />
      </View>

      <View style={styles.row}>
        <TouchButton direction="LEFT" icon="chevron.left" />
        <View style={styles.spacer} />
        <TouchButton direction="RIGHT" icon="chevron.right" />
      </View>

      <View style={styles.row}>
        <TouchButton direction="DOWN" icon="chevron.down" />
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
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  active: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  spacer: {
    width: 60,
    height: 60,
  },
}); 