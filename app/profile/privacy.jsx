import { View, Text, StyleSheet } from "react-native";

export default function Privacy() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy Settings</Text>
      <Text style={styles.text}>• Location sharing: Enabled</Text>
      <Text style={styles.text}>• Emergency contacts: 2 added</Text>
      <Text style={styles.text}>• Data encryption: Active</Text>
      <Text style={styles.note}>You can control who sees your travel details.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  text: { fontSize: 16, marginBottom: 10, color: "#333" },
  note: { marginTop: 20, fontSize: 14, color: "gray" },
});
