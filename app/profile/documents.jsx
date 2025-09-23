import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";

export default function Documents() {
  const handleUpload = (doc) => {
    Alert.alert(`Upload ${doc}`, "This is a demo upload popup!");
  };

  const handlePreview = (doc) => {
    Alert.alert(`${doc} Preview`, "This is a demo preview image!");
  };

  const documents = [
    { name: "Passport", status: "Uploaded", demoImage: "https://via.placeholder.com/150" },
    { name: "Visa", status: "Uploaded", demoImage: "https://via.placeholder.com/150" },
    { name: "Travel Insurance", status: "Pending", demoImage: "https://via.placeholder.com/150/cccccc/ffffff?text=No+Image" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Travel Documents</Text>

      {documents.map((doc, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.docInfo}>
            <Text style={styles.docName}>{doc.name}</Text>
            <Text
              style={[
                styles.status,
                { color: doc.status === "Uploaded" ? "#4caf50" : "#f44336" },
              ]}
            >
              {doc.status === "Uploaded" ? "✅ Uploaded" : "❌ Pending"}
            </Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleUpload(doc.name)}
            >
              <Text style={styles.buttonText}>
                {doc.status === "Uploaded" ? "Re-upload" : "Upload"}
              </Text>
            </TouchableOpacity>
            {doc.status === "Uploaded" && (
              <TouchableOpacity
                style={[styles.button, styles.previewButton]}
                onPress={() => handlePreview(doc.name)}
              >
                <Text style={[styles.buttonText, { color: "#1976d2" }]}>
                  Preview
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* Show demo image or placeholder */}
          <Image
            source={{ uri: doc.demoImage }}
            style={styles.demoImage}
            resizeMode="cover"
          />
        </View>
      ))}

      <Text style={styles.note}>
        Keep your documents safe and accessible. You can upload or preview your documents here.
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
  docInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  docName: { fontSize: 18, fontWeight: "500", color: "#333" },
  status: { fontSize: 14, fontWeight: "600" },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1976d2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  previewButton: {
    backgroundColor: "#e0f0ff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  demoImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#ddd", // placeholder background
  },
  note: {
    marginTop: 20,
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
});