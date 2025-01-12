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
          title: "Playing Snake",
          presentation: 'fullScreenModal'
        }} 
      />
    </Stack>
  );
} 