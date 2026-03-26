import { Stack } from "expo-router";

const RootLayout2 = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout2;
