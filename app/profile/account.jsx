import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

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
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text style={styles.loadingText}>Loading account information...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Information</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.info}>{userData.full_name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Digital Tourist ID</Text>
        <Text style={styles.info}>{userData.dtid}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Mobile Number</Text>
        <Text style={styles.info}>{userData.mobile_number}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.info}>{userData.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f6fc",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1a1a1a",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
    fontWeight: "600",
  },
  info: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});