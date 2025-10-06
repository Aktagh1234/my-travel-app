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
import { SafeAreaView } from "react-native-safe-area-context";

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

  const handleLogout = async () => {
    try {
      // Clear all user data from AsyncStorage
      await AsyncStorage.multiRemove([
        'auth_token',
        'user_data', 
        'dtid',
        'full_name',
        'mobile_number',
        'locationHistory',
        'userItinerary'
      ]);
      
      // Navigate back to the starting page
      router.replace("/");
    } catch (error) {
      console.error('Error during logout:', error);
      // Still navigate to start page even if clearing storage fails
      router.replace("/");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Enhanced Traveler Info Card */}
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../assets/images/profile-photo.png')}
              style={styles.avatar}
            />
            <View style={styles.statusIndicator} />
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <View style={styles.dtidContainer}>
            <Ionicons name="card-outline" size={16} color="#6366F1" />
            <Text style={styles.userEmail}>ID: {dtid || 'Not Available'}</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="location" size={20} color="#10B981" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Places Visited</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="shield-checkmark" size={20} color="#6366F1" />
            <Text style={styles.statNumber}>Safe</Text>
            <Text style={styles.statLabel}>Travel Status</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="star" size={20} color="#F59E0B" />
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Safety Score</Text>
          </View>
        </View>

        {/* Enhanced Options */}
        <View style={styles.optionsContainer}>
          <Text style={styles.sectionTitle}>Account & Settings</Text>
          {options.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionItem,
                index === options.length - 1 && styles.lastOptionItem
              ]}
              onPress={() => router.push(item.route)}
            >
              <View style={styles.optionIconContainer}>
                <Ionicons name={item.icon} size={22} color="#6366F1" />
              </View>
              <Text style={styles.optionText}>{item.title}</Text>
              <Ionicons name="chevron-forward-outline" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Enhanced Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: "#F8FAFC" 
  },
  container: { 
    flex: 1, 
    backgroundColor: "#F8FAFC" 
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100
  },

  // Enhanced User Info Card
  userInfo: {
    alignItems: "center",
    padding: 32,
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    marginBottom: 24,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#F1F5F9"
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16
  },
  avatar: { 
    width: 120, 
    height: 120, 
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#FFFFFF'
  },
  userName: { 
    fontSize: 26, 
    fontWeight: "800", 
    color: "#1E293B",
    marginBottom: 8
  },
  dtidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 4
  },
  userEmail: { 
    fontSize: 14, 
    color: "#6366F1",
    fontWeight: "600",
    marginLeft: 6
  },

  // Quick Stats Section
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F1F5F9"
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    textAlign: 'center'
  },

  // Enhanced Options Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
    marginLeft: 4
  },
  optionsContainer: { 
    backgroundColor: "#FFFFFF", 
    borderRadius: 20, 
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    padding: 20
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  lastOptionItem: {
    borderBottomWidth: 0
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  optionText: { 
    flex: 1, 
    fontSize: 16, 
    fontWeight: "600",
    color: "#1E293B" 
  },

  // Enhanced Logout Button
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EF4444",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: "#EF4444",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 20
  },
  logoutText: { 
    color: "#FFFFFF", 
    fontSize: 16, 
    fontWeight: "700", 
    marginLeft: 8 
  },
});