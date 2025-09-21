// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router"; // needed for navigation stack
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: true }}>
        {/* The index, registration, and dashboard pages will be automatically picked up from app/ */}
        {/* No need to manually render Registration here */}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}