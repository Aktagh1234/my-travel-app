import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function History() {
  const [locationHistory, setLocationHistory] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showAllMap, setShowAllMap] = useState(false);

  useEffect(() => {
    const data = [];
    const now = new Date();
    for (let i = 0; i < 10; i++) {
      const timestamp = new Date(now.getTime() - i * 15 * 60 * 1000);
      data.push({ id: i.toString(), latitude: 28.59 + Math.random() * 0.01, longitude: 77.02 + Math.random() * 0.01, timestamp: timestamp.toLocaleString() });
    }
    setLocationHistory(data);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemText}>
        <Text style={styles.coords}>Lat: {item.latitude.toFixed(5)}, Lon: {item.longitude.toFixed(5)}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      <TouchableOpacity onPress={() => setSelectedLocation(item)}>
        <Ionicons name="map-outline" size={28} color="#1e90ff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location History (Every 15 mins)</Text>
      <TouchableOpacity style={styles.seeAllButton} onPress={() => setShowAllMap(true)}>
        <Text style={styles.seeAllText}>See All on Map</Text>
      </TouchableOpacity>
      <FlatList data={locationHistory} renderItem={renderItem} keyExtractor={(item) => item.id} contentContainerStyle={{ paddingBottom: 20 }} />

      <Modal visible={!!selectedLocation} animationType="slide" transparent={false} onRequestClose={() => setSelectedLocation(null)}>
        <View style={styles.mapModal}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedLocation(null)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
          <View style={[styles.map, { alignItems: 'center', justifyContent: 'center' }]}>
            <Text style={{ color: '#333' }}>Map is available on Android/iOS builds.</Text>
          </View>
        </View>
      </Modal>

      <Modal visible={showAllMap} animationType="slide" transparent={false} onRequestClose={() => setShowAllMap(false)}>
        <View style={styles.mapModal}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowAllMap(false)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
          <View style={[styles.map, { alignItems: 'center', justifyContent: 'center' }]}>
            <Text style={{ color: '#333' }}>Map is available on Android/iOS builds.</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 15 },
  title: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 15, textAlign: "center" },
  seeAllButton: { backgroundColor: "#1e90ff", padding: 12, borderRadius: 15, marginBottom: 15, alignItems: "center" },
  seeAllText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  item: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", padding: 15, borderRadius: 15, marginBottom: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  itemText: { flex: 1 },
  coords: { fontSize: 16, color: "#333", marginBottom: 5 },
  timestamp: { fontSize: 14, color: "#666" },
  mapModal: { flex: 1 },
  closeButton: { padding: 15, backgroundColor: "#1e90ff", alignItems: "center" },
  closeText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  map: { flex: 1 },
});



