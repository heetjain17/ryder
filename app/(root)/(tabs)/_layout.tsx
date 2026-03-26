import { Stack } from "expo-router";

const TabsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="chat" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="rides" options={{ headerShown: false }} />
    </Stack>
  );
};

export default TabsLayout;
