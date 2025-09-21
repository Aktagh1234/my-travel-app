import { View, Text, StyleSheet } from "react-native";

export default function ExploreTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Explore Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, fontWeight: "bold" },
});
