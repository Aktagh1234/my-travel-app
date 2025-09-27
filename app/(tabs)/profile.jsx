// app/(tabs)/profile.jsx
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const router = useRouter();
  const [userName, setUserName] = useState('User');
  const [dtid, setDtid] = useState('');

  // Load user data from AsyncStorage
  useEffect(() => {
    (async () => {
      const storedUserName = await AsyncStorage.getItem('full_name');
      const storedDtid = await AsyncStorage.getItem('dtid');
      if (storedUserName) setUserName(storedUserName);
      if (storedDtid) setDtid(storedDtid);
    })();
  }, []);

  const options = [
    { title: "Account", icon: "person-outline", route: "/profile/account" },
    { title: "Travel Documents", icon: "document-text-outline", route: "/profile/documents" },
    { title: "Nearby Help Centers", icon: "location-outline", route: "/profile/help-centers" },
    { title: "Safety Tips", icon: "shield-checkmark-outline", route: "/profile/tips" },
    { title: "Privacy", icon: "lock-closed-outline", route: "/profile/privacy" },
    { title: "Help & Support", icon: "help-circle-outline", route: "/profile/help" },
  ];

  const handleLogout = () => {
    // 👉 add your logout logic here
    router.replace("/login"); 
  };

  return (
    <ScrollView style={styles.container}>
      {/* Traveler Info */}
      <View style={styles.userInfo}>
        <Image
          source={require('../../assets/images/profile-photo.png')}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>Traveler ID: {dtid || 'Not Available'}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {options.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionItem}
            onPress={() => router.push(item.route)}
          >
            <Ionicons name={item.icon} size={24} color="#1e90ff" />
            <Text style={styles.optionText}>{item.title}</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
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

  optionsContainer: { backgroundColor: "#fff", borderRadius: 15, marginBottom: 20 },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: { flex: 1, fontSize: 16, marginLeft: 15, color: "#333" },

  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff4757",
    margin: 20,
    padding: 15,
    borderRadius: 15,
  },
  logoutText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 10 },
});