import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Dimensions, View, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { GameBoard } from '@/components/game/GameBoard';
import { GameControls } from '@/components/game/GameControls';
import { GameHeader } from '@/components/game/GameHeader';
import { GameOverModal } from '@/components/game/GameOverModal';
import { useGameLogic } from '@/hooks/useGameLogic';

// Web için özel boyutlandırma
const BOARD_SIZE = Platform.OS === 'web' 
  ? Math.min(600, Math.floor(Dimensions.get('window').height * 0.6))
  : Math.floor(Dimensions.get('window').width * 0.9);

const GRID_SIZE = 20;

export default function GameScreen() {
  const params = useLocalSearchParams();
  const playerName = params.playerName as string;
  const country = params.country as string;
  
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
      {Platform.OS === 'web' ? (
        // Web layout
        <View style={styles.webContainer}>
          <View style={styles.gameSection}>
            <GameHeader 
              score={score}
              countryCode={country}
              isPaused={isPaused}
              onPause={() => {
                if (isPaused) {
                  resumeGame();
                } else {
                  pauseGame();
                }
              }}
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
          </View>

          <View style={styles.rankingSection}>
            {/* Burada sıralama bileşeni eklenecek */}
            <ThemedText type="title">Leaderboard</ThemedText>
            {/* Sıralama listesi buraya gelecek */}
          </View>
        </View>
      ) : (
        // Mobile layout
        <>
          <GameHeader 
            score={score}
            countryCode={country}
            isPaused={isPaused}
            onPause={() => {
              if (isPaused) {
                resumeGame();
              } else {
                pauseGame();
              }
            }}
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
        </>
      )}

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
  webContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    gap: 20,
  },
  gameSection: {
    flex: 2, // Oyun alanı 2 birim
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rankingSection: {
    flex: 1, // Sıralama alanı 1 birim
    padding: 20,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
}); 