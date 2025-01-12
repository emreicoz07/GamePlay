import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

// Basit root component
function App() {
  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App); 