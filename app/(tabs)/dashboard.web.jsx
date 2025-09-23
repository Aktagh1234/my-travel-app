import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import QRCode from 'react-native-qrcode-svg';

export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const [safetyScore, setSafetyScore] = useState(85);
  const [alerts] = useState([
    { id: 1, type: 'warning', title: 'Restricted Zone Entered', time: '10:15 AM', status: 'Active' },
    { id: 2, type: 'sos', title: 'SOS Alert Triggered', time: 'Yesterday 6:40 PM', status: 'Resolved' },
  ]);
  const router = useRouter();

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(false)} />}>
      <View style={styles.headerRow}>
        <Image source={{ uri: 'https://i.pravatar.cc/100?img=12' }} style={styles.avatar} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.greeting}>Welcome,</Text>
          <Text style={styles.userName}>John Doe</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Digital Tourist ID</Text>
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <QRCode value="DTID12345" size={140} />
          <Text style={styles.qrCaption}>Show this at check-posts</Text>
          <View style={styles.dtidBadge}><Text style={styles.dtidBadgeText}>DTID: DTID12345</Text></View>
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
        {alerts.map((alert) => (
          <View key={alert.id} style={[styles.alertRow, { borderLeftColor: alert.type === 'sos' ? '#EF4444' : '#F59E0B' } ]}>
            <Text style={[styles.alertIcon, { color: alert.type === 'sos' ? '#EF4444' : '#F59E0B' } ]}>
              {alert.type === 'sos' ? '🚨' : '⚠️'}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertTime}>{alert.time}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.viewAllBtn} onPress={() => router.push('/(tabs)/alerts')}>
          <Text style={styles.viewAllBtnText}>View All Alerts</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Your Location</Text>
        <View style={{ padding: 14, backgroundColor: '#F3F4F6', borderRadius: 12 }}>
          <Text style={{ color: '#374151' }}>
            Map preview is available on Android/iOS builds.
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 12, gap: 10 }}>
          <TouchableOpacity style={[styles.quickBtn, { backgroundColor: '#4F46E5' }]} onPress={() => router.push('/history')}>
            <Text style={styles.quickBtnText}>View History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickBtn, { backgroundColor: '#EF4444' }]} onPress={() => router.push('/emergency-details')}>
            <Text style={styles.quickBtnText}>Emergency Contacts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 0 },
  headerRow: { flexDirection: 'row', alignItems: 'center', padding: 24, paddingBottom: 10 },
  avatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#4F46E5' },
  greeting: { fontSize: 16, color: '#6B7280' },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#1E293B' },
  card: { backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 18, marginBottom: 18, padding: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#4F46E5', marginBottom: 8 },
  qrCaption: { color: '#6B7280', marginTop: 10, fontSize: 14 },
  dtidBadge: { backgroundColor: '#4F46E5', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4, marginTop: 10 },
  dtidBadgeText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  safetyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  safetyScore: { fontSize: 22, fontWeight: 'bold', color: '#10B981' },
  safetyLabel: { fontSize: 16, color: '#10B981', fontWeight: '600' },
  alertRow: { flexDirection: 'row', alignItems: 'center', borderLeftWidth: 5, backgroundColor: '#F3F4F6', borderRadius: 12, marginBottom: 10, padding: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' },
  alertIcon: { fontSize: 28, marginRight: 10 },
  alertTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  alertTime: { fontSize: 13, color: '#6B7280' },
  viewAllBtn: { marginTop: 8, alignSelf: 'flex-end', backgroundColor: '#4F46E5', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 8 },
  viewAllBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  quickBtn: { borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10 },
  quickBtnText: { color: '#fff', fontWeight: 'bold' },
});



