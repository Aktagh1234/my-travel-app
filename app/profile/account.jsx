import { View, Text, StyleSheet } from "react-native";

export default function Account() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Information</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.info}>Alex Carter</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Traveler ID</Text>
        <Text style={styles.info}>TRV-2025-0912</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.info}>alex.carter@example.com</Text>
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
});