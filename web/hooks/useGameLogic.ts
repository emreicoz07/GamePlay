import { useState, useEffect, useCallback } from 'react';

type Position = {
  x: number;
  y: number;
};

type FoodType = {
  position: Position;
  type: 'regular' | 'special';
  expiresAt?: number;
  timeLeft?: number; // Geri sayım için kalan süre
};

export function useGameLogic(gridSize: number) {
  const [snake, setSnake] = useState<Position[]>([{ x: 5, y: 5 }]);
  const [food, setFood] = useState<FoodType>({ 
    position: { x: 10, y: 10 }, 
    type: 'regular' 
  });
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameInterval, setGameInterval] = useState<NodeJS.Timeout | null>(null);
  const [gameSpeed, setGameSpeed] = useState(200); // Başlangıç hızı (ms)

  // Yılanın kendi kendine çarpışma kontrolü
  const checkCollision = useCallback((head: Position, body: Position[]) => {
    return body.some((segment, index) => {
      // Baş hariç diğer segmentlerle çarpışma kontrolü
      if (index === 0) return false;
      return segment.x === head.x && segment.y === head.y;
    });
  }, []);

  const generateFood = useCallback((): FoodType => {
    const isSpecial = Math.random() < 0.2;
    const SPECIAL_FOOD_DURATION = 15000; // 15 saniye

    return {
      position: {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      },
      type: isSpecial ? 'special' : 'regular',
      expiresAt: isSpecial ? Date.now() + SPECIAL_FOOD_DURATION : undefined,
      timeLeft: isSpecial ? SPECIAL_FOOD_DURATION : undefined
    };
  }, [gridSize]);

  // Özel yem için geri sayım
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (food.type === 'special' && food.expiresAt) {
      countdownInterval = setInterval(() => {
        const timeLeft = food.expiresAt! - Date.now();
        
        if (timeLeft <= 0) {
          setFood(generateFood());
          clearInterval(countdownInterval);
        } else {
          setFood(prev => ({
            ...prev,
            timeLeft: Math.max(0, timeLeft)
          }));
        }
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [food.type, food.expiresAt, generateFood]);

  // Yılan hızını yönetmek için yeni mantık
  const calculateGameSpeed = useCallback((length: number) => {
    const baseSpeed = 150; // Başlangıç hızı daha yavaş
    const speedIncrease = Math.floor((length - 1) / 4) * 5; // Daha yumuşak hız artışı
    return Math.max(70, baseSpeed - speedIncrease); // Minimum hız 70ms
  }, []);

  // Hareket mantığını güncelle
  const moveSnake = useCallback(() => {
    if (isPaused || isGameOver) return;

    setSnake(currentSnake => {
      const head = currentSnake[0];
      const newHead = { ...head };

      // Yeni kafa pozisyonu hesaplama
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

      if (checkCollision(newHead, currentSnake)) {
        setIsGameOver(true);
        return currentSnake;
      }

      // Yem kontrolü
      if (newHead.x === food.position.x && newHead.y === food.position.y) {
        const points = food.type === 'special' ? 5 : 1;
        setScore(s => s + points);
        setFood(generateFood());
        return [newHead, ...currentSnake]; // Yemi yediğinde uzama
      }

      // Normal hareket - kuyruğu kaydır
      return [newHead, ...currentSnake.slice(0, -1)];
    });
  }, [direction, food, generateFood, gridSize, isPaused, isGameOver, checkCollision]);

  // Oyun döngüsü
  useEffect(() => {
    if (!isPaused && !isGameOver) {
      const speed = calculateGameSpeed(snake.length);
      const interval = setInterval(moveSnake, speed);
      setGameInterval(interval);
      
      // Temizleme işlemi
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
    return undefined;
  }, [isPaused, isGameOver, moveSnake, snake.length, calculateGameSpeed]);

  const startGame = useCallback(() => {
    setSnake([{ x: 5, y: 5 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
  }, [generateFood]);

  const pauseGame = useCallback(() => {
    setIsPaused(true);
    if (gameInterval) {
      clearInterval(gameInterval);
      setGameInterval(null);
    }
  }, [gameInterval]);

  const resumeGame = useCallback(() => {
    setIsPaused(false);
  }, []);

  const resetGame = useCallback(() => {
    if (gameInterval) {
      clearInterval(gameInterval);
      setGameInterval(null);
    }
    startGame();
  }, [gameInterval, startGame]);

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