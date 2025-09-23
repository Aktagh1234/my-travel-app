import { View, Text, StyleSheet } from "react-native";

export default function HelpCenter() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Help Centers</Text>
      <Text style={styles.text}>• Embassy of USA – 1.2 km</Text>
      <Text style={styles.text}>• Local Police Station – 0.8 km</Text>
      <Text style={styles.text}>• Tourist Help Desk – 500 m</Text>
      <Text style={styles.note}>Tap a center for directions (map integration can be added).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  text: { fontSize: 16, marginBottom: 10, color: "#333" },
  note: { marginTop: 20, fontSize: 14, color: "gray" },
});
