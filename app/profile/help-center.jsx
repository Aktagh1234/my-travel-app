import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function HelpCenter() {
  const centers = [
    { name: "Indian Embassy, New Delhi", distance: "2.3 km", icon: "flag" },
    { name: "Connaught Place Police Station", distance: "1.1 km", icon: "local-police" },
    { name: "Tourist Help Desk, Delhi Railway Station", distance: "800 m", icon: "info" },
    { name: "Airport Assistance Desk, IGI Airport", distance: "15 km", icon: "flight" },
  ];

  const handlePress = (center) => {
    alert(`Directions to ${center.name} (map integration can be added)`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nearby Help Centers</Text>

      {centers.map((center, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => handlePress(center)}
        >
          <View style={styles.iconContainer}>
            <MaterialIcons name={center.icon} size={24} color="#1976d2" />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{center.name}</Text>
            <Text style={styles.distance}>{center.distance}</Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#888" />
        </TouchableOpacity>
      ))}

      <Text style={styles.note}>
        Tap a center for directions. (Map integration can be added later)
      </Text>
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
    textAlign: "center",
    color: "#1a1a1a",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
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
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#e0f0ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  distance: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  note: {
    marginTop: 20,
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
});
