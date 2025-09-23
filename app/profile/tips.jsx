import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";

export default function Tips() {
  const safetyTips = [
    {
      title: "Keep your valuables hidden",
      content: "Always keep money, passports, and other valuables in a secure place. Avoid showing expensive items in public."
    },
    {
      title: "Avoid traveling alone at night",
      content: "If possible, travel with a companion at night. Stick to well-lit areas and avoid isolated streets."
    },
    {
      title: "Save emergency numbers in your phone",
      content: "Store local emergency numbers, embassy contacts, and hotel info in your phone for quick access."
    },
    {
      title: "Share your itinerary with family/friends",
      content: "Keep your loved ones updated about your travel plans for added safety."
    },
  ];

  const handlePress = (tip) => {
    Alert.alert(tip.title, tip.content);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.header}>Safety Tips</Text>

      {safetyTips.map((tip, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={() => handlePress(tip)}>
          <Text style={styles.cardTitle}>{tip.title}</Text>
          <Text style={styles.readMore}>Tap to read more →</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6fc",
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1a1a1a",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  readMore: {
    marginTop: 5,
    fontSize: 14,
    color: "#1976d2",
    fontWeight: "600",
  },
});