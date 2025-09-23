import { View, Text, StyleSheet } from "react-native";

export default function Account() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Information</Text>
      <Text style={styles.text}>Name: Alex Carter</Text>
      <Text style={styles.text}>Traveler ID: TRV-2025-0912</Text>
      <Text style={styles.text}>Email: alex.carter@example.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  text: { fontSize: 16, marginBottom: 10, color: "#555" },
});