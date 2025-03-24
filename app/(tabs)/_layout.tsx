import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} >
      <Tabs.Screen name="index"  />
      <Tabs.Screen name="AllCauses" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  );
}



/*

index -> List of causes -> Jaap page
All causes -> cause page (join page)
Profile
*/