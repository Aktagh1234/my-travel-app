import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Privacy() {
  const dummyPolicy = `
Welcome to TravelSafe! We value your privacy and are committed to protecting your personal information. 

1. **Information Collection:** We collect your travel details, location data, and emergency contacts to provide a safe and seamless travel experience.

2. **Data Usage:** Your information is used solely for travel planning, emergency assistance, and personalized recommendations.

3. **Sharing Data:** We never sell your data. Information may be shared only with authorized partners and government agencies in case of emergencies.

4. **Data Security:** All personal information is encrypted and stored securely. Access is limited to authorized personnel only.

5. **Cookies & Tracking:** We use minimal tracking to improve app performance and provide better recommendations.

6. **User Control:** You can manage location sharing, emergency contacts, and other privacy settings anytime in the app.

7. **Changes to Policy:** This policy may be updated from time to time. Users will be notified of significant changes.

8. **Contact Us:** For privacy-related queries, contact support@travelsafe.in.

By using TravelSafe, you consent to our privacy policy.
`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.header}>Privacy Settings</Text>

      <View style={styles.card}>
        <Text style={styles.setting}>Location sharing: Enabled</Text>
        <Text style={styles.setting}>Emergency contacts: 2 added</Text>
        <Text style={styles.setting}>Data encryption: Active</Text>
      </View>

      <Text style={styles.note}>
        You can control who sees your travel details.
      </Text>

      <View style={styles.policyCard}>
        <Text style={styles.policyHeader}>Privacy Policy</Text>
        <Text style={styles.policyText}>{dummyPolicy}</Text>
      </View>
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
    color: "#1a1a1a",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  setting: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  note: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  policyCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  policyHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1976d2",
  },
  policyText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
});