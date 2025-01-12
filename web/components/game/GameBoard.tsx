import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  withTiming,
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
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(segment.x * cellSize, {
          mass: 0.2,
          damping: 8,
          stiffness: 60,
          overshootClamping: false,
          restDisplacementThreshold: 0.0001,
          restSpeedThreshold: 0.0001,
          velocity: 20,
        }),
      },
      {
        translateY: withSpring(segment.y * cellSize, {
          mass: 0.2,
          damping: 8,
          stiffness: 60,
          overshootClamping: false,
          restDisplacementThreshold: 0.0001,
          restSpeedThreshold: 0.0001,
          velocity: 20,
        }),
      },
      {
        scale: withSpring(index === 0 ? 1.1 : 0.95 - index * 0.01, {
          mass: 0.1,
          damping: 5,
          stiffness: 40,
        }),
      },
      {
        rotate: withSpring(
          `${Math.atan2(
            segment.y - (index > 0 ? segment.y : segment.y - 1),
            segment.x - (index > 0 ? segment.x : segment.x - 1)
          )}rad`,
          {
            mass: 0.1,
            damping: 5,
            stiffness: 40,
          }
        ),
      },
    ],
  }), [segment.x, segment.y, index, cellSize]);

  return (
    <Animated.View
      key={getSegmentKey(segment, index)}
      style={[
        styles.snakeSegment,
        {
          width: cellSize * 0.95,
          height: cellSize * 0.95,
          backgroundColor: index === 0 
            ? '#48B8A0' 
            : `rgba(95, 207, 182, ${1 - index * 0.03})`,
          borderRadius: cellSize / 2,
          position: 'absolute',
          zIndex: 100 - index,
        },
        animatedStyle,
      ]}
    />
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
    <View style={[styles.board, { width: size, height: size, backgroundColor }]}>
      {/* Yem */}
      <View style={[
        styles.food,
        {
          width: cellSize,
          height: cellSize,
          left: food.position.x * cellSize,
          top: food.position.y * cellSize,
          backgroundColor: food.type === 'special' ? '#FFD700' : '#FF7F50',
          // Özel yem için parıldama animasyonu
          shadowColor: food.type === 'special' ? '#FFD700' : 'transparent',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: food.type === 'special' ? 0.8 : 0,
          shadowRadius: food.type === 'special' ? 10 : 0,
          transform: [{ scale: food.type === 'special' ? 1.2 : 1 }],
        }
      ]}>
        {/* Özel yem için geri sayım göstergesi */}
        {food.type === 'special' && food.expiresAt && (
          <View style={styles.countdown}>
            <ThemedText style={styles.countdownText}>
              {formatTimeLeft(food.expiresAt - Date.now())}
            </ThemedText>
          </View>
        )}
      </View>

      {/* Yılan - şimdi ayrı bileşen kullanıyoruz */}
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
    borderRadius: 8,
    overflow: 'hidden',
  },
  food: {
    position: 'absolute',
    borderRadius: 100,
    zIndex: 50,
  },
  snakeSegment: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  countdown: {
    position: 'absolute',
    top: -20,
    width: '100%',
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFD700',
  },
}); 