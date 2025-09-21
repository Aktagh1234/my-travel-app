// app/(tabs)/profile.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const settings = [
    { title: "Account", icon: "person-outline" },
    { title: "Notifications", icon: "notifications-outline" },
    { title: "Privacy", icon: "lock-closed-outline" },
    { title: "Help & Support", icon: "help-circle-outline" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=12",
          }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>johndoe@example.com</Text>
      </View>

      {/* Settings */}
      <View style={styles.settingsContainer}>
        {settings.map((item, index) => (
          <TouchableOpacity key={index} style={styles.settingItem}>
            <Ionicons name={item.icon} size={24} color="#1e90ff" />
            <Text style={styles.settingText}>{item.title}</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  userInfo: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  userName: { fontSize: 22, fontWeight: "bold", color: "#333" },
  userEmail: { fontSize: 16, color: "#666" },
  settingsContainer: { backgroundColor: "#fff", borderRadius: 15, marginBottom: 20 },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingText: { flex: 1, fontSize: 16, marginLeft: 15, color: "#333" },
  logoutButton: {
    backgroundColor: "#ff4757",
    margin: 20,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
