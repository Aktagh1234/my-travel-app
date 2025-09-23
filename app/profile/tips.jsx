import { View, Text, StyleSheet } from "react-native";

export default function Tips() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safety Tips</Text>
      <Text style={styles.text}>• Keep your valuables hidden.</Text>
      <Text style={styles.text}>• Avoid traveling alone at night.</Text>
      <Text style={styles.text}>• Save emergency numbers in your phone.</Text>
      <Text style={styles.text}>• Share your itinerary with family/friends.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  text: { fontSize: 16, marginBottom: 10, color: "#555" },
});
