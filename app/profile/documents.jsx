import { View, Text, StyleSheet } from "react-native";

export default function Documents() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel Documents</Text>
      <Text style={styles.text}>• Passport: Uploaded ✅</Text>
      <Text style={styles.text}>• Visa: Uploaded ✅</Text>
      <Text style={styles.text}>• Travel Insurance: Pending ❌</Text>
      <Text style={styles.note}>Keep your documents safe and accessible.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  text: { fontSize: 16, marginBottom: 10, color: "#333" },
  note: { marginTop: 20, fontSize: 14, color: "gray" },
});