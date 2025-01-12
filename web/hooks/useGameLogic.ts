import { useState, useEffect, useCallback } from 'react';

export type Point = {
  x: number;
  y: number;
};

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export function useGameLogic(gridSize: number) {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameInterval, setGameInterval] = useState<NodeJS.Timeout>();

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
    // Ensure food doesn't spawn on snake
    if (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      return generateFood();
    }
    return newFood;
  }, [snake, gridSize]);

  const moveSnake = useCallback(() => {
    if (isPaused || isGameOver) return;

    setSnake(currentSnake => {
      const head = currentSnake[0];
      const newHead = { ...head };

      // Calculate new head position
      switch (direction) {
        case 'UP':
          newHead.y = (newHead.y - 1 + gridSize) % gridSize;
          break;
        case 'DOWN':
          newHead.y = (newHead.y + 1) % gridSize;
          break;
        case 'LEFT':
          newHead.x = (newHead.x - 1 + gridSize) % gridSize;
          break;
        case 'RIGHT':
          newHead.x = (newHead.x + 1) % gridSize;
          break;
      }

      // Check for collision with self
      if (currentSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return currentSnake;
      }

      const newSnake = [newHead, ...currentSnake];

      // Check if food is eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 1);
        setFood(generateFood());
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }

      return newSnake;
    });
  }, [direction, food, generateFood, gridSize, isGameOver, isPaused]);

  const startGame = useCallback(() => {
    if (gameInterval) clearInterval(gameInterval);
    const interval = setInterval(moveSnake, 150); // Adjust speed here
    setGameInterval(interval);
  }, [moveSnake]);

  const pauseGame = useCallback(() => {
    setIsPaused(true);
    if (gameInterval) clearInterval(gameInterval);
  }, [gameInterval]);

  const resumeGame = useCallback(() => {
    setIsPaused(false);
    startGame();
  }, [startGame]);

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    startGame();
  }, [generateFood, startGame]);

  // Start game on mount
  useEffect(() => {
    startGame();
    return () => {
      if (gameInterval) clearInterval(gameInterval);
    };
  }, [startGame]);

  return {
    snake,
    food,
    score,
    direction,
    isGameOver,
    isPaused,
    setDirection,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
  };
} 