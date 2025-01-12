import { View, StyleSheet } from 'react-native';
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

      {/* Yılan */}
      {snake.map((segment, index) => (
        <View
          key={`${segment.x}-${segment.y}`}
          style={[
            styles.snakeSegment,
            {
              width: cellSize,
              height: cellSize,
              left: segment.x * cellSize,
              top: segment.y * cellSize,
              backgroundColor: index === 0 ? '#48B8A0' : '#5FCFB6',
              borderRadius: cellSize / 2,
            }
          ]}
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
    borderRadius: 8,
  },
  snakeSegment: {
    position: 'absolute',
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