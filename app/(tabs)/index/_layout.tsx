import { Stack } from 'expo-router';

export default function HomeScreenLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerTitle: 'Supporting Causes' }} />
      <Stack.Screen name="Jaap" options={{ headerTitle: 'Jaap Counter' }} />
    </Stack>
  );
}