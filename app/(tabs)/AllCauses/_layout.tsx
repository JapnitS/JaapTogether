import { Stack } from 'expo-router';

export default function AllCausesLayout() {
  return (
    <Stack  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"  />
      {/* <Stack.Screen name="CauseScreen" options={{ headerTitle: 'Cause Screen' }} /> */}
      <Stack.Screen name="StartCause"  />
    </Stack>
  );
}