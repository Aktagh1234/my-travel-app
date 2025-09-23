import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default function Help() {
  const helpItems = [
    {
      title: "FAQ",
      subtitle: "Common traveler questions",
      icon: "help-outline",
      action: () => alert("Open FAQ page (demo)"),
    },
    {
      title: "Contact Support",
      subtitle: "support@travelsafe.in",
      icon: "email",
      action: () => Linking.openURL("mailto:support@travelsafe.in"),
    },
    {
      title: "Emergency Hotline",
      subtitle: "+91 98765 43210",
      icon: "call",
      action: () => Linking.openURL("tel:+919876543210"),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help & Support</Text>

      {helpItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={item.action}
        >
          <View style={styles.iconContainer}>
            <MaterialIcons name={item.icon} size={24} color="#1976d2" />
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={styles.note}>
        We’re here to assist you 24/7.
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
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#e0f0ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  subtitle: {
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