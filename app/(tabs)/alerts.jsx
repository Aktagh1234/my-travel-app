import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Alerts() {
  const [alerts] = useState([
    { id: '1', type: 'warning', title: 'Restricted Zone Entered', time: '10:15 AM' },
    { id: '2', type: 'sos', title: 'SOS Alert Triggered', time: 'Yesterday 6:40 PM' },
    { id: '3', type: 'info', title: 'Checkpoint Cleared', time: 'Yesterday 2:10 PM' },
    { id: '4', type: 'warning', title: 'Curfew Area Near You', time: '2 days ago' },
  ]);

  const renderItem = ({ item }) => (
    <View style={[styles.card, { borderLeftColor: item.type === 'sos' ? '#EF4444' : item.type === 'warning' ? '#F59E0B' : '#10B981' } ]}>
      <Text style={[styles.icon, { color: item.type === 'sos' ? '#EF4444' : item.type === 'warning' ? '#F59E0B' : '#10B981' } ]}>
        {item.type === 'sos' ? '🚨' : item.type === 'warning' ? '⚠️' : '✅'}
      </Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <Text style={styles.header}>All Alerts</Text>
      <FlatList
        data={alerts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', padding: 16, paddingBottom: 8 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, borderLeftWidth: 5, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  icon: { fontSize: 26, marginRight: 10 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  time: { fontSize: 13, color: '#6B7280' },
});



