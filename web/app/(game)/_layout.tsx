import { Stack } from 'expo-router/stack';

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
          presentation: 'modal',
          headerShown: true,
          headerBackTitle: "Back",
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