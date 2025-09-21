import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const [location, setLocation] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    };
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {/* Map */}
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={location} title="You are here" />
          </MapView>
        ) : (
          <View style={styles.mapPlaceholder}>
            <Text>Loading map...</Text>
          </View>
        )}
      </View>

      {/* Buttons */}
        <TouchableOpacity
        style={styles.historyButton}
        onPress={() => router.push("/history")}
        >
        <Text style={styles.buttonText}>See History</Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.panicButton} onPress={() => alert("Panic triggered!")}>
        <Text style={styles.panicText}>PANIC</Text>
      </TouchableOpacity>

        <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => router.push("/emergency-details")}
        >
        <Text style={styles.buttonText}>Emergency Details</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  mapContainer: { flex: 3, borderRadius: 15, overflow: "hidden", marginBottom: 15 },
  map: { flex: 1 },
  mapPlaceholder: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ddd" },
  historyButton: { backgroundColor: "#1e90ff", padding: 15, borderRadius: 15, alignItems: "center", marginBottom: 10 },
  panicButton: { backgroundColor: "red", padding: 25, borderRadius: 25, alignItems: "center", marginBottom: 10 },
  emergencyButton: { backgroundColor: "#ffa500", padding: 15, borderRadius: 15, alignItems: "center", marginBottom: 10 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  panicText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
});