import { View, Text, StyleSheet } from "react-native";

export default function Help() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>
      <Text style={styles.text}>• FAQ: Common traveler questions</Text>
      <Text style={styles.text}>• Contact Support: support@travelsafe.com</Text>
      <Text style={styles.text}>• Emergency Hotline: +1 800-123-4567</Text>
      <Text style={styles.note}>We’re here to assist you 24/7.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  text: { fontSize: 16, marginBottom: 10, color: "#333" },
  note: { marginTop: 20, fontSize: 14, color: "gray" },
});
