import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import * as Location from "expo-location";
import { useRouter } from "expo-router";

export default function Registration() {
  const [regId, setRegId] = useState("");
  const router = useRouter();

  const handleVerify = () => {
    const isValid = true;

    if (!isValid) {
      Alert.alert("Verification Failed", "Invalid Registration ID.");
      return;
    }

    Alert.alert(
      "Tourist Verified",
      `Your ID (${regId || "N/A"}) is valid.`,
      [
        {
          text: "OK",
          onPress: async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
              Alert.alert(
                "Permission Denied",
                "Location permission is required to share your location."
              );
              return;
            }
            const location = await Location.getCurrentPositionAsync({});
            console.log("User location:", location.coords);
            router.replace("/dashboard");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Register Your ID</Text>
        <Text style={styles.subtitle}>Enter the registration ID given at the tourist spot.</Text>

        <TextInput
          style={styles.input}
          placeholder="Registration ID"
          placeholderTextColor="#aaa"
          value={regId}
          onChangeText={setRegId}
        />

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});