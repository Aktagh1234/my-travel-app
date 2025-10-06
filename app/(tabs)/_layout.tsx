import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1e90ff",
        tabBarInactiveTintColor: "#999",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 65 + insets.bottom,
          paddingBottom: insets.bottom + 5,
          paddingTop: 5,
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          // Elevation/shadow so bar sits above system nav
          ...(Platform.OS === 'android'
            ? { elevation: 12 }
            : { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: -2 } }),
        },
        tabBarItemStyle: {
          paddingVertical: 2,
          flex: 1,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={Math.min(size, 22)} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="alerts"
        options={{
          title: "Alerts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alert-circle-outline" size={Math.min(size, 22)} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chatbot"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={Math.min(size, 22)} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="itinerary"
        options={{
          title: "Plans",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={Math.min(size, 22)} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={Math.min(size, 22)} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={Math.min(size, 22)} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
