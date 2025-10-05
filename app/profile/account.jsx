import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Account() {
  const [userData, setUserData] = useState({
    full_name: '',
    dtid: '',
    mobile_number: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const [fullName, dtid, mobileNumber, userDataJson] = await Promise.all([
        AsyncStorage.getItem('full_name'),
        AsyncStorage.getItem('dtid'),
        AsyncStorage.getItem('mobile_number'),
        AsyncStorage.getItem('user_data')
      ]);

      let parsedUserData = {};
      if (userDataJson) {
        try {
          parsedUserData = JSON.parse(userDataJson);
        } catch (e) {
          console.log('Error parsing user_data:', e);
        }
      }

      setUserData({
        full_name: fullName || parsedUserData.full_name || 'Not Available',
        dtid: dtid || parsedUserData.dtid || 'Not Available',
        mobile_number: mobileNumber || parsedUserData.mobile_number || 'Not Available',
        email: parsedUserData.email || 'Not Available'
      });
    } catch (error) {
      console.error('Error loading user data:', error);
      setUserData({
        full_name: 'Error Loading',
        dtid: 'Error Loading',
        mobile_number: 'Error Loading',
        email: 'Error Loading'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Loading account information...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const accountFields = [
    { label: "Full Name", value: userData.full_name, icon: "person-outline" },
    { label: "Digital Tourist ID", value: userData.dtid, icon: "card-outline" },
    { label: "Mobile Number", value: userData.mobile_number, icon: "call-outline" },
    { label: "Email Address", value: userData.email, icon: "mail-outline" }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Ionicons name="person-circle" size={48} color="#6366F1" />
          <Text style={styles.header}>Account Information</Text>
          <Text style={styles.subHeader}>Manage your personal details</Text>
        </View>
        
        {/* Account Fields */}
        <View style={styles.cardsContainer}>
          {accountFields.map((field, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <Ionicons name={field.icon} size={20} color="#6366F1" />
                </View>
                <Text style={styles.label}>{field.label}</Text>
              </View>
              <Text style={styles.info}>{field.value}</Text>
            </View>
          ))}
        </View>

        {/* Account Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Ionicons name="shield-checkmark" size={24} color="#10B981" />
            <Text style={styles.statusTitle}>Account Status</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Verification Status</Text>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Account Type</Text>
            <Text style={styles.statusValue}>Tourist</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100
  },

  // Enhanced Header
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
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
  header: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 12,
    marginBottom: 8,
    color: "#1E293B",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    fontWeight: "500"
  },

  // Cards Container
  cardsContainer: {
    marginBottom: 24
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#F1F5F9"
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  label: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "700",
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  info: {
    fontSize: 18,
    color: "#1E293B",
    fontWeight: "600",
    lineHeight: 24
  },

  // Status Card
  statusCard: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 20
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginLeft: 12
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  statusLabel: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600'
  },
  statusValue: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600'
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  verifiedText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '700',
    marginLeft: 4
  },

  // Loading States
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500"
  },
});