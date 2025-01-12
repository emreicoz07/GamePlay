import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { GameBoard } from '@/components/game/GameBoard';
import { GameControls } from '@/components/game/GameControls';
import { GameHeader } from '@/components/game/GameHeader';
import { GameOverModal } from '@/components/game/GameOverModal';
import { useGameLogic } from '@/hooks/useGameLogic';

const { width } = Dimensions.get('window');
const BOARD_SIZE = Math.floor(width * 0.9); // 90% of screen width
const GRID_SIZE = 20; // 20x20 grid

export default function GameScreen() {
  const { playerName, country } = useLocalSearchParams<{ 
    playerName: string;
    country: string;
  }>();
  
  const {
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
  } = useGameLogic(GRID_SIZE);

  return (
    <ThemedView style={styles.container}>
      <GameHeader 
        score={score}
        countryCode={country}
        onPause={pauseGame}
        isPaused={isPaused}
      />
      
      <GameBoard
        size={BOARD_SIZE}
        gridSize={GRID_SIZE}
        snake={snake}
        food={food}
      />

      <GameControls
        onDirectionChange={setDirection}
        currentDirection={direction}
        disabled={isGameOver || isPaused}
      />

      <GameOverModal
        visible={isGameOver}
        score={score}
        playerName={playerName}
        countryCode={country}
        onRestart={resetGame}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
}); 