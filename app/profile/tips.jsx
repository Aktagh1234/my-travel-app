import { Ionicons } from "@expo/vector-icons";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tips() {
  const safetyTips = [
    {
      title: "Keep your valuables hidden",
      content: "Always keep money, passports, and other valuables in a secure place. Avoid showing expensive items in public.",
      icon: "lock-closed",
      priority: "high"
    },
    {
      title: "Avoid traveling alone at night",
      content: "If possible, travel with a companion at night. Stick to well-lit areas and avoid isolated streets.",
      icon: "moon",
      priority: "high"
    },
    {
      title: "Save emergency numbers in your phone",
      content: "Store local emergency numbers, embassy contacts, and hotel info in your phone for quick access.",
      icon: "call",
      priority: "medium"
    },
    {
      title: "Share your itinerary with family/friends",
      content: "Keep your loved ones updated about your travel plans for added safety.",
      icon: "share",
      priority: "medium"
    },
    {
      title: "Research local customs and laws",
      content: "Understanding local customs, laws, and cultural norms helps you avoid unintentional offenses.",
      icon: "book",
      priority: "low"
    },
    {
      title: "Keep copies of important documents",
      content: "Store digital and physical copies of your passport, visa, and other important documents separately.",
      icon: "documents",
      priority: "high"
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6366F1';
    }
  };

  const handlePress = (tip) => {
    Alert.alert(tip.title, tip.content);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Enhanced Header */}
        <View style={styles.headerContainer}>
          <Ionicons name="shield-checkmark" size={48} color="#10B981" />
          <Text style={styles.header}>Safety Tips</Text>
          <Text style={styles.subHeader}>Essential travel safety guidelines</Text>
        </View>

        {safetyTips.map((tip, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card} 
            onPress={() => handlePress(tip)}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <View style={[
                styles.iconContainer,
                { backgroundColor: `${getPriorityColor(tip.priority)}15` }
              ]}>
                <Ionicons 
                  name={tip.icon} 
                  size={20} 
                  color={getPriorityColor(tip.priority)} 
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{tip.title}</Text>
                <View style={styles.priorityContainer}>
                  <View style={[
                    styles.priorityBadge,
                    { backgroundColor: `${getPriorityColor(tip.priority)}20` }
                  ]}>
                    <Text style={[
                      styles.priorityText,
                      { color: getPriorityColor(tip.priority) }
                    ]}>
                      {tip.priority.toUpperCase()} PRIORITY
                    </Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </View>
            <Text style={styles.preview}>{tip.content.substring(0, 80)}...</Text>
          </TouchableOpacity>
        ))}

        {/* Emergency Info Card */}
        <View style={styles.emergencyCard}>
          <View style={styles.emergencyHeader}>
            <Ionicons name="warning" size={24} color="#EF4444" />
            <Text style={styles.emergencyTitle}>Emergency Contacts</Text>
          </View>
          <Text style={styles.emergencyText}>
            In case of emergency, contact local authorities at 911 or your embassy immediately.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100
  },

  // Enhanced Header
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    marginBottom: 24,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#F1F5F9"
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 12,
    marginBottom: 8,
    color: "#1E293B",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    fontWeight: "500"
  },

  // Enhanced Tip Cards
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#F1F5F9"
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  cardContent: {
    flex: 1
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 6,
    lineHeight: 22
  },
  priorityContainer: {
    flexDirection: 'row'
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  preview: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
    marginLeft: 60,
    fontWeight: "500"
  },

  // Emergency Card
  emergencyCard: {
    backgroundColor: '#FEF2F2',
    padding: 20,
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FEE2E2'
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
    marginLeft: 12
  },
  emergencyText: {
    fontSize: 14,
    color: '#B91C1C',
    lineHeight: 20,
    fontWeight: "500"
  },
});