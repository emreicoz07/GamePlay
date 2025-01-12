import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';

type GameBoardProps = {
  size: number;
  gridSize: number;
  snake: Array<{ x: number; y: number }>;
  food: {
    position: { x: number; y: number };
    type: 'regular' | 'special';
    expiresAt?: number;
  };
};

// Yılan segmentleri için benzersiz key oluşturacak yardımcı fonksiyon
const getSegmentKey = (segment: { x: number; y: number }, index: number) => {
  return `snake-${segment.x}-${segment.y}-${index}`;
};

// Yeni bileşen: Yılan segmenti için
const SnakeSegment = React.memo(({ segment, index, cellSize }: { 
  segment: { x: number; y: number }; 
  index: number; 
  cellSize: number; 
}) => {
  const colorScheme = useColorScheme() ?? 'light';
  
  const animatedStyle = useAnimatedStyle(() => {
    const baseStyle = {
      width: cellSize,
      height: cellSize,
      borderRadius: cellSize / 2,
      backgroundColor: index === 0 ? '#48B8A0' : '#5FCFB6',
      position: 'absolute' as const,
      transform: [
        { translateX: withSpring(segment.x * cellSize) },
        { translateY: withSpring(segment.y * cellSize) },
        { scale: withSpring(index === 0 ? 1.1 : 0.95 - index * 0.01) }
      ],
    };

    // Platform'a özgü gölgelendirme stillerini style objesi içinde birleştir
    if (Platform.OS === 'web') {
      return {
        ...baseStyle,
        style: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }
      };
    } else {
      return {
        ...baseStyle,
        style: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
        }
      };
    }
  });

  return <Animated.View style={animatedStyle} />;
});

// Food bileşeni için de aynı düzeltmeyi yapalım
const FoodView = React.memo(({ food, cellSize }: { 
  food: GameBoardProps['food']; 
  cellSize: number; 
}) => {
  return (
    <View style={[
      styles.food,
      {
        width: cellSize,
        height: cellSize,
        left: food.position.x * cellSize,
        top: food.position.y * cellSize,
        backgroundColor: food.type === 'special' ? '#FFD700' : '#FF7F50',
        style: Platform.OS === 'web' 
          ? {
              boxShadow: food.type === 'special' ? '0 0 10px #FFD700' : 'none'
            }
          : {
              shadowColor: food.type === 'special' ? '#FFD700' : 'transparent',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: food.type === 'special' ? 0.8 : 0,
              shadowRadius: food.type === 'special' ? 10 : 0,
              elevation: food.type === 'special' ? 8 : 0
            }
      }
    ]}>
      {food.type === 'special' && food.expiresAt && (
        <View style={styles.countdown}>
          <ThemedText style={[styles.countdownText, { color: '#FFD700' }]}>
            {formatTimeLeft(food.expiresAt - Date.now())}
          </ThemedText>
        </View>
      )}
    </View>
  );
});

export function GameBoard({ size, gridSize, snake, food }: GameBoardProps) {
  const cellSize = size / gridSize;
  const colorScheme = useColorScheme() ?? 'light';
  const backgroundColor = Colors[colorScheme].gridBackground;

  // Geri sayım süresini formatlama
  const formatTimeLeft = (ms?: number) => {
    if (!ms) return '';
    const seconds = Math.ceil(ms / 1000);
    return `${seconds}`;
  };

  return (
    <View style={[
      styles.board,
      { 
        width: size, 
        height: size, 
        backgroundColor,
        style: Platform.OS === 'web'
          ? { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }
          : {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 6,
            }
      }
    ]}>
      <FoodView food={food} cellSize={cellSize} />
      {snake.map((segment, index) => (
        <SnakeSegment
          key={getSegmentKey(segment, index)}
          segment={segment}
          index={index}
          cellSize={cellSize}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  food: {
    position: 'absolute',
    borderRadius: 100,
    zIndex: 50,
  },
  countdown: {
    position: 'absolute',
    top: -20,
    width: '100%',
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 12,
    fontWeight: 'bold',
  }
}); 