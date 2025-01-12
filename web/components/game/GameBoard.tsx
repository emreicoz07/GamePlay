import { View, StyleSheet } from 'react-native';
import type { Point } from '@/hooks/useGameLogic';
import { useThemeColor } from '@/hooks/useThemeColor';

type GameBoardProps = {
  size: number;
  gridSize: number;
  snake: Point[];
  food: Point;
};

export function GameBoard({ size, gridSize, snake, food }: GameBoardProps) {
  const backgroundColor = useThemeColor({}, 'gridBackground');
  const borderColor = useThemeColor({}, 'border');
  const cellSize = size / gridSize;

  return (
    <View style={[
      styles.board, 
      { 
        width: size, 
        height: size,
        backgroundColor,
        borderColor,
      }
    ]}>
      {/* Render food */}
      <View
        style={[
          styles.food,
          {
            width: cellSize,
            height: cellSize,
            backgroundColor: '#FF7F50', // Accent Orange for food
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
              backgroundColor: index === 0 ? '#48B8A0' : '#5FCFB6', // Snake Head/Body colors
              transform: [
                { translateX: segment.x * cellSize },
                { translateY: segment.y * cellSize },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    borderWidth: 2,
    position: 'relative',
  },
  snakeSegment: {
    position: 'absolute',
    borderRadius: 4,
  },
  food: {
    position: 'absolute',
    borderRadius: 8,
  },
}); 