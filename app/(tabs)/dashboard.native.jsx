import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Image, Linking, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import MapView, { Marker } from 'react-native-maps';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';

export default function Dashboard() {
  const [location, setLocation] = useState(null);
  // For local location history
  const [locationHistory, setLocationHistory] = useState([]);
  const [permissionStatus, setPermissionStatus] = useState("undetermined");
  const [refreshing, setRefreshing] = useState(false);
  const [safetyScore, setSafetyScore] = useState(85);
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'critical', title: 'ILP Verification Required - Tawang', time: '2 hours ago', status: 'Active', priority: 'high' },
    { id: 2, type: 'weather', title: 'Heavy Rainfall Alert - Cherrapunji', time: '3 hours ago', status: 'Active', priority: 'medium' },
    { id: 3, type: 'cultural', title: 'Hornbill Festival - Crowd Advisory', time: '5 hours ago', status: 'Active', priority: 'low' },
    { id: 4, type: 'info', title: 'Majuli Ferry Service Restored', time: 'Yesterday 8:20 PM', status: 'Resolved', priority: 'low' },
  ]);
  const router = useRouter();
  const [dtid, setDtid] = useState(null);
  const [userName, setUserName] = useState('User');
  const intervalRef = useRef();
  // Load user data from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      const storedDtid = await AsyncStorage.getItem('dtid');
      const storedUserName = await AsyncStorage.getItem('full_name');
      if (storedDtid) setDtid(storedDtid);
      if (storedUserName) setUserName(storedUserName);
    })();
  }, []);
  // Periodically update location in Supabase and local history every 2 minutes
  useEffect(() => {
    // Always set up location update interval, even if dtid is not set
    async function sendLocationToSupabase(coords) {
      if (!coords) return;
      try {
        await supabase.from('locations').insert([
          {
            dtid,
            latitude: coords.latitude,
            longitude: coords.longitude,
            timestamp: new Date().toISOString(),
          },
        ]);
      } catch (e) {
        console.log('Supabase location update error:', e);
      }
    }

    // Helper to save location to AsyncStorage history
    async function saveLocationToHistory(coords) {
      if (!coords) return;
      try {
        const prev = await AsyncStorage.getItem('locationHistory');
        let arr = [];
        if (prev) arr = JSON.parse(prev);
        arr.unshift({
          latitude: coords.latitude,
          longitude: coords.longitude,
          timestamp: new Date().toISOString(),
        });
        // Keep only last 100 entries
        if (arr.length > 100) arr = arr.slice(0, 100);
        await AsyncStorage.setItem('locationHistory', JSON.stringify(arr));
        setLocationHistory(arr);
      } catch (e) {
        // ignore
      }
    }

    let isMounted = true;

    // Immediately update location on mount
    (async () => {
      try {
        const loc = await Location.getCurrentPositionAsync({});
        if (isMounted) {
          setLocation(loc.coords);
          if (dtid) sendLocationToSupabase(loc.coords);
          saveLocationToHistory(loc.coords);
          console.log('Location updated (immediate):', loc.coords);
        }
      } catch (e) {
        // ignore
      }
    })();

    console.log('Starting location update interval');
    intervalRef.current = setInterval(async () => {
      try {
        const loc = await Location.getCurrentPositionAsync({});
        if (isMounted) {
          setLocation(loc.coords);
          if (dtid) sendLocationToSupabase(loc.coords);
          saveLocationToHistory(loc.coords);
          console.log('Location updated (interval):', loc.coords);
        }
      } catch (e) {
        // ignore
      }
    }, 60 * 1000); // 1 minute

    return () => {
      isMounted = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        console.log('Stopped location update interval');
      }
    };
    // Only start interval if permission granted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionStatus, dtid]);
  // Load location history on mount
  useEffect(() => {
    (async () => {
      try {
        const prev = await AsyncStorage.getItem('locationHistory');
        if (prev) setLocationHistory(JSON.parse(prev));
      } catch {}
    })();
  }, []);

  useEffect(() => {
    const ensurePermissionAndLocate = async () => {
      const current = await Location.getForegroundPermissionsAsync();
      if (current.status !== "granted") {
        console.log('Location permission not granted, requesting...');
        const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
        setPermissionStatus(status);
        if (status !== 'granted') {
          if (!canAskAgain) {
            Alert.alert(
              'Location Permission Required',
              'Please enable location in Settings to see your location on the map.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => Linking.openSettings?.() },
              ]
            );
          }
          return;
        }
      } else {
        setPermissionStatus('granted');
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    };
    ensurePermissionAndLocate();
  }, []);



  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setSafetyScore(85 + Math.floor(Math.random() * 5 - 2));
      setAlerts((prev) => prev);
      setRefreshing(false);
    }, 1200);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
      <View style={styles.headerRow}>
        <Image 
          source={require('../../assets/images/profile-photo.png')} 
          style={styles.avatar}
          key={`avatar-${Date.now()}`}
        />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.greeting}>Welcome,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Digital Tourist ID</Text>
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <QRCode value={dtid || "..."} size={140} />
          <Text style={styles.qrCaption}>Show this at check-posts</Text>
          <View style={styles.dtidBadge}><Text style={styles.dtidBadgeText}>DTID: {dtid || "..."}</Text></View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Safety Score</Text>
        <View style={styles.safetyRow}>
          <AnimatedCircularProgress size={90} width={10} fill={safetyScore} tintColor="#10B981" backgroundColor="#E5E7EB" rotation={0} lineCap="round">
            {() => (<Text style={styles.safetyScore}>{safetyScore}/100</Text>)}
          </AnimatedCircularProgress>
          <View style={{ marginLeft: 18 }}>
            <Text style={styles.safetyLabel}>Safe – Low Risk</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Recent Alerts</Text>
        {alerts.slice(0,2).map((alert) => {
          const getAlertStyle = (type) => {
            const styles = {
              critical: { color: '#DC2626', icon: '🚨' },
              weather: { color: '#2563EB', icon: '🌧️' },
              cultural: { color: '#9333EA', icon: '🎭' },
              info: { color: '#059669', icon: '✅' },
              default: { color: '#6B7280', icon: 'ℹ️' }
            };
            return styles[type] || styles.default;
          };
          
          const alertStyle = getAlertStyle(alert.type);
          
          return (
            <View key={alert.id} style={[styles.alertRow, { borderLeftColor: alertStyle.color }]}>
              <Text style={[styles.alertIcon, { color: alertStyle.color }]}>
                {alertStyle.icon}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertTime}>{alert.time}</Text>
              </View>
              <View style={[styles.statusChip, { 
                backgroundColor: alert.status === 'Active' ? (alert.priority === 'high' ? '#DC2626' : '#F59E0B') : '#10B981' 
              }]}>
                <Text style={styles.statusChipText}>{alert.status}</Text>
              </View>
            </View>
          );
        })}
        <TouchableOpacity style={styles.viewAllBtn} onPress={() => router.push('/(tabs)/alerts')}>
          <Text style={styles.viewAllBtnText}>View All Alerts</Text>
        </TouchableOpacity>
      </View>

      {/* Educational Section about Northeast India */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Northeast India Guide</Text>
        <View style={styles.educationalContent}>
          <View style={styles.educationalItem}>
            <View style={styles.educationalIcon}>
              <Text style={styles.educationalEmoji}>🏛️</Text>
            </View>
            <View style={styles.educationalText}>
              <Text style={styles.educationalTitle}>Cultural Heritage</Text>
              <Text style={styles.educationalDescription}>
                Home to 200+ tribes with unique traditions, languages, and festivals
              </Text>
            </View>
          </View>
          
          <View style={styles.educationalItem}>
            <View style={styles.educationalIcon}>
              <Text style={styles.educationalEmoji}>🎭</Text>
            </View>
            <View style={styles.educationalText}>
              <Text style={styles.educationalTitle}>Major Festivals</Text>
              <Text style={styles.educationalDescription}>
                Hornbill (Dec), Bihu (Apr), Cheiraoba (Apr), Chapchar Kut (Mar)
              </Text>
            </View>
          </View>
          
          <View style={styles.educationalItem}>
            <View style={styles.educationalIcon}>
              <Text style={styles.educationalEmoji}>📋</Text>
            </View>
            <View style={styles.educationalText}>
              <Text style={styles.educationalTitle}>Travel Documents</Text>
              <Text style={styles.educationalDescription}>
                ILP required for Arunachal, Nagaland, Mizoram. RAP for border areas
              </Text>
            </View>
          </View>
          
          <View style={styles.educationalItem}>
            <View style={styles.educationalIcon}>
              <Text style={styles.educationalEmoji}>🌿</Text>
            </View>
            <View style={styles.educationalText}>
              <Text style={styles.educationalTitle}>Biodiversity</Text>
              <Text style={styles.educationalDescription}>
                Kaziranga rhinos, living root bridges, sacred groves, unique ecosystems
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.viewAllBtn, { backgroundColor: '#059669', marginTop: 12 }]} 
          onPress={() => router.push('/(tabs)/chatbot')}
        >
          <Text style={styles.viewAllBtnText}>Ask AI Assistant</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Facts Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Did You Know?</Text>
        <View style={styles.factsContainer}>
          <View style={styles.factItem}>
            <Text style={styles.factNumber}>8</Text>
            <Text style={styles.factLabel}>States</Text>
          </View>
          <View style={styles.factItem}>
            <Text style={styles.factNumber}>200+</Text>
            <Text style={styles.factLabel}>Tribes</Text>
          </View>
          <View style={styles.factItem}>
            <Text style={styles.factNumber}>220</Text>
            <Text style={styles.factLabel}>Languages</Text>
          </View>
          <View style={styles.factItem}>
            <Text style={styles.factNumber}>3</Text>
            <Text style={styles.factLabel}>Seasons</Text>
          </View>
        </View>
        
        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Best Time to Visit:</Text> October to March for pleasant weather and clear mountain views
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Your Location</Text>
        {permissionStatus !== 'granted' ? (
          <View style={{ padding: 14, backgroundColor: '#F3F4F6', borderRadius: 12 }}>
            <Text style={{ color: '#374151', marginBottom: 10 }}>
              We need your permission to access your location and display it on the map.
            </Text>
            <TouchableOpacity
              style={[styles.quickBtn, { backgroundColor: '#4F46E5', alignSelf: 'flex-start' }]}
              onPress={async () => {
                const { status } = await Location.requestForegroundPermissionsAsync();
                setPermissionStatus(status);
                if (status === 'granted') {
                  const loc = await Location.getCurrentPositionAsync({});
                  setLocation(loc.coords);
                }
              }}
            >
              <Text style={styles.quickBtnText}>Enable Location</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ height: 160, borderRadius: 12, overflow: 'hidden' }}>
            <MapView
              style={{ flex: 1 }}
              pointerEvents="none"
              initialRegion={{
                latitude: location?.latitude || 28.6139,
                longitude: location?.longitude || 77.2090,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
            >
              {location && (
                <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
              )}
            </MapView>
          </View>
        )}
        <View style={styles.quickButtonsContainer}>
          <TouchableOpacity style={[styles.quickBtn, { backgroundColor: '#4F46E5' }]} onPress={() => router.push('/history')}>
            <Text style={styles.quickBtnText}>View History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickBtn, { backgroundColor: '#EF4444' }]} onPress={() => router.push('/emergency-details')}>
            <Text style={styles.quickBtnText}>Emergency Contacts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scrollContent: { 
    paddingBottom: 100,
    flexGrow: 1 
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', padding: 24, paddingBottom: 10 },
  avatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#4F46E5' },
  greeting: { fontSize: 16, color: '#6B7280' },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#1E293B' },
  card: { backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 18, marginBottom: 18, padding: 18, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#4F46E5', marginBottom: 8 },
  qrCaption: { color: '#6B7280', marginTop: 10, fontSize: 14 },
  dtidBadge: { backgroundColor: '#4F46E5', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4, marginTop: 10 },
  dtidBadgeText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  safetyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  safetyScore: {
    fontSize: 18,        // Make the number larger
    fontWeight: 'bold',
    color: '#10B981',
    textAlign: 'center', // Ensure it's centered
    width: 80,           // Optional: set width to help centering
    alignSelf: 'center', // Optional: center in parent
  },
  safetyLabel: { fontSize: 16, color: '#10B981', fontWeight: '600' },
  alertRow: { flexDirection: 'row', alignItems: 'center', borderLeftWidth: 5, backgroundColor: '#F3F4F6', borderRadius: 12, marginBottom: 10, padding: 10, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 2 },
  alertIcon: { fontSize: 28, marginRight: 10 },
  alertTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  alertTime: { fontSize: 13, color: '#6B7280' },
  statusChip: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginLeft: 8 },
  statusChipText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  viewAllBtn: { marginTop: 8, alignSelf: 'flex-end', backgroundColor: '#4F46E5', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 8 },
  viewAllBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  quickButtonsContainer: { 
    flexDirection: 'row', 
    marginTop: 16, 
    gap: 12,
    marginBottom: 8
  },
  quickBtn: { 
    flex: 1,
    borderRadius: 12, 
    paddingHorizontal: 16, 
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  quickBtnText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 14
  },
  // Educational Content Styles
  educationalContent: {
    marginTop: 12,
  },
  educationalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  educationalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  educationalEmoji: {
    fontSize: 18,
  },
  educationalText: {
    flex: 1,
  },
  educationalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  educationalDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  // Quick Facts Styles
  factsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 16,
  },
  factItem: {
    alignItems: 'center',
    flex: 1,
  },
  factNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  factLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
    alignItems: 'flex-start',
  },
  tipIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#065F46',
    lineHeight: 18,
  },
  tipBold: {
    fontWeight: '600',
  },
});



