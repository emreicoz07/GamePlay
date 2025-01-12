import { View, StyleSheet } from 'react-native';
import type { Point } from '@/hooks/useGameLogic';

type GameBoardProps = {
  size: number;
  gridSize: number;
  snake: Point[];
  food: Point;
};

export function GameBoard({ size, gridSize, snake, food }: GameBoardProps) {
  const cellSize = size / gridSize;

  return (
    <View style={[styles.board, { width: size, height: size }]}>
      {/* Render food */}
      <View
        style={[
          styles.food,
          {
            width: cellSize,
            height: cellSize,
            transform: [
              { translateX: food.x * cellSize },
              { translateY: food.y * cellSize },
            ],
          },
        ]}
      />

      {/* Render snake */}
      {snake.map((segment, index) => (
        <View
          key={`${segment.x}-${segment.y}-${index}`}
          style={[
            styles.snakeSegment,
            {
              width: cellSize,
              height: cellSize,
              transform: [
                { translateX: segment.x * cellSize },
                { translateY: segment.y * cellSize },
              ],
            },
            index === 0 && styles.snakeHead,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#ccc',
    position: 'relative',
  },
  snakeSegment: {
    backgroundColor: '#4CAF50',
    position: 'absolute',
    borderRadius: 4,
  },
  snakeHead: {
    backgroundColor: '#388E3C',
  },
  food: {
    backgroundColor: '#F44336',
    position: 'absolute',
    borderRadius: 8,
  },
}); 