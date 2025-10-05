import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Documents() {
  const handleUpload = (doc) => {
    Alert.alert(`Upload ${doc}`, "This is a demo upload popup!");
  };

  const handlePreview = (doc) => {
    Alert.alert(`${doc} Preview`, "This is a demo preview image!");
  };

  const documents = [
    { 
      name: "Passport", 
      status: "Uploaded", 
      demoImage: "https://via.placeholder.com/150",
      icon: "document-text",
      description: "Valid international passport"
    },
    { 
      name: "Visa", 
      status: "Uploaded", 
      demoImage: "https://via.placeholder.com/150",
      icon: "card",
      description: "Tourist visa documentation"
    },
    { 
      name: "Travel Insurance", 
      status: "Pending", 
      demoImage: "https://via.placeholder.com/150/cccccc/ffffff?text=No+Image",
      icon: "shield-checkmark",
      description: "Travel health insurance coverage"
    },
    { 
      name: "Flight Tickets", 
      status: "Uploaded", 
      demoImage: "https://via.placeholder.com/150",
      icon: "airplane",
      description: "Flight booking confirmation"
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        nestedScrollEnabled={true}
      >
        {/* Enhanced Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="folder-open" size={48} color="#6366F1" />
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>
                {documents.filter(d => d.status === 'Uploaded').length}
              </Text>
            </View>
          </View>
          <Text style={styles.header}>
            Travel Documents
          </Text>
          <Text style={styles.subHeader}>
            Manage your important travel documents
          </Text>
          
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${(documents.filter(d => d.status === 'Uploaded').length / documents.length) * 100}%`
                  }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round((documents.filter(d => d.status === 'Uploaded').length / documents.length) * 100)}% Complete
            </Text>
          </View>
        </View>

        {/* Document Cards */}
        {documents.map((doc, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.docIconContainer}>
                <Ionicons name={doc.icon} size={24} color="#6366F1" />
              </View>
              <View style={styles.docInfo}>
                <Text style={styles.docName}>{doc.name}</Text>
                <Text style={styles.docDescription}>{doc.description}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: doc.status === "Uploaded" ? "#ECFDF5" : "#FEF2F2" }
              ]}>
                <Ionicons 
                  name={doc.status === "Uploaded" ? "checkmark-circle" : "time"} 
                  size={16} 
                  color={doc.status === "Uploaded" ? "#10B981" : "#EF4444"} 
                />
                <Text style={[
                  styles.statusText,
                  { color: doc.status === "Uploaded" ? "#10B981" : "#EF4444" }
                ]}>
                  {doc.status}
                </Text>
              </View>
            </View>

            {/* Document Preview */}
            <Image
              source={{ uri: doc.demoImage }}
              style={styles.demoImage}
              resizeMode="cover"
            />

            {/* Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.uploadButton]}
                onPress={() => handleUpload(doc.name)}
              >
                <Ionicons name="cloud-upload" size={16} color="#FFFFFF" />
                <Text style={styles.buttonText}>
                  {doc.status === "Uploaded" ? "Re-upload" : "Upload"}
                </Text>
              </TouchableOpacity>
              
              {doc.status === "Uploaded" && (
                <TouchableOpacity
                  style={[styles.button, styles.previewButton]}
                  onPress={() => handlePreview(doc.name)}
                >
                  <Ionicons name="eye" size={16} color="#6366F1" />
                  <Text style={[styles.buttonText, { color: "#6366F1" }]}>
                    Preview
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#F59E0B" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Keep Documents Safe</Text>
            <Text style={styles.infoText}>
              Ensure all your travel documents are up-to-date and easily accessible during your journey.
            </Text>
          </View>
        </View>

        {/* Additional Tips Card */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Ionicons name="lightbulb" size={24} color="#10B981" />
            <Text style={styles.tipsTitle}>Quick Tips</Text>
          </View>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Keep digital copies in cloud storage</Text>
            <Text style={styles.tipItem}>• Carry physical copies separately</Text>
            <Text style={styles.tipItem}>• Check expiration dates regularly</Text>
            <Text style={styles.tipItem}>• Inform your bank about travel plans</Text>
          </View>
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
    paddingHorizontal: 24,
    paddingBottom: 120,
    paddingTop: 10
  },

  // Enhanced Header with Animations
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    marginTop: 24,
    marginBottom: 28,
    borderRadius: 28,
    shadowColor: "#6366F1",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0"
  },
  headerIconContainer: {
    position: 'relative',
    marginBottom: 16
  },
  headerBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#10B981',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF'
  },
  headerBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  header: {
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 8,
    color: "#1E293B",
    textAlign: "center",
    letterSpacing: -0.5
  },
  subHeader: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 20
  },

  // Progress Bar
  progressContainer: {
    width: '100%',
    alignItems: 'center'
  },
  progressBar: {
    width: '80%',
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981'
  },

  // Enhanced Document Cards with Better Margins
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    marginHorizontal: 4,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    transform: [{ perspective: 1000 }]
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  docIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  docInfo: {
    flex: 1,
  },
  docName: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: "#1E293B",
    marginBottom: 4
  },
  docDescription: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500"
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 4,
    textTransform: 'uppercase'
  },

  // Document Image
  demoImage: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#F1F5F9",
  },

  // Enhanced Action Buttons
  actions: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  uploadButton: {
    backgroundColor: "#6366F1",
    shadowColor: "#6366F1",
    shadowOpacity: 0.3
  },
  previewButton: {
    backgroundColor: "#EEF2FF",
    borderWidth: 1.5,
    borderColor: "#C7D2FE",
    shadowColor: "#6366F1",
    shadowOpacity: 0.15
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 0.3
  },

  // Enhanced Info Card
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFBEB',
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    shadowColor: '#F59E0B',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4
  },
  infoContent: {
    flex: 1,
    marginLeft: 16
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#92400E',
    marginBottom: 6
  },
  infoText: {
    fontSize: 15,
    color: '#A16207',
    lineHeight: 22,
    fontWeight: "500"
  },

  // Tips Card
  tipsCard: {
    backgroundColor: '#F0FDF4',
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    shadowColor: '#10B981',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#065F46',
    marginLeft: 12
  },
  tipsList: {
    marginLeft: 4
  },
  tipItem: {
    fontSize: 14,
    color: '#047857',
    lineHeight: 22,
    fontWeight: '500',
    marginBottom: 6
  },
});