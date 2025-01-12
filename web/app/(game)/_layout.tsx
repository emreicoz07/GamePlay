import { Stack } from 'expo-router';

export default function GameLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          title: "Snake Game"
        }} 
      />
      <Stack.Screen 
        name="game" 
        options={{ 
          headerShown: false,
          presentation: 'fullScreenModal'
        }} 
      />
      <Stack.Screen 
        name="leaderboard" 
        options={{ 
          title: "Leaderboard",
          presentation: 'modal'
        }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ 
          title: "Settings",
          presentation: 'modal'
        }} 
      />
    </Stack>
  );
} 