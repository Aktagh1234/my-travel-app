import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  Animated,
} from "react-native";

export default function Emergency() {
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: "1", name: "Police", phone: "100", address: "Local Police Station" },
    { id: "2", name: "Ambulance", phone: "102", address: "City Hospital" },
    { id: "3", name: "Fire Brigade", phone: "101", address: "Fire Department" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const addContact = () => {
    if (!newName || !newPhone || !newAddress) return;

    const newContact = {
      id: Date.now().toString(),
      name: newName,
      phone: newPhone,
      address: newAddress,
    };

    setEmergencyContacts([...emergencyContacts, newContact]);
    setNewName(""); setNewPhone(""); setNewAddress(""); setModalVisible(false);
  };

  const toggleSelectContact = (id) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((c) => c !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const deleteSelectedContacts = () => {
    setEmergencyContacts(
      emergencyContacts.filter((c) => !selectedContacts.includes(c.id))
    );
    setSelectedContacts([]);
    setDeleteMode(false);
  };

  const renderItem = ({ item }) => (
    <Animated.View style={styles.contactCard}>
      {deleteMode && (
        <TouchableOpacity
          style={[
            styles.checkbox,
            selectedContacts.includes(item.id) && styles.checkedBox,
          ]}
          onPress={() => toggleSelectContact(item.id)}
        />
      )}
      <View style={{ marginLeft: deleteMode ? 15 : 0 }}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>📞 {item.phone}</Text>
        <Text style={styles.contactAddress}>📍 {item.address}</Text>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>

      <FlatList
        data={emergencyContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

    {/* Floating Buttons */}
    {!deleteMode && (
    <View style={styles.floatingButtons}>
        <TouchableOpacity
        style={[styles.floatingButton, { backgroundColor: "#1e90ff" }]}
        onPress={() => setModalVisible(true)}
        >
        <Text style={styles.floatingButtonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={[styles.floatingButton, { backgroundColor: "#ff4757" }]}
        onPress={() => setDeleteMode(true)}
        >
        <Text style={styles.floatingButtonText}>Delete</Text>
        </TouchableOpacity>
    </View>
    )}

    {deleteMode && (
    <TouchableOpacity
        style={[styles.floatingButton, { backgroundColor: "#ff6b81", bottom: 30 }]}
        onPress={deleteSelectedContacts}
    >
        <Text style={styles.floatingButtonText}>Delete Selected</Text>
    </TouchableOpacity>
    )}


      {/* Modal Form */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Emergency Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={newAddress}
              onChangeText={setNewAddress}
            />
            <TouchableOpacity style={styles.modalAddButton} onPress={addContact}>
              <Text style={styles.modalAddButtonText}>Add Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#eef2f5" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#333" },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  contactName: { fontSize: 20, fontWeight: "bold", color: "#111" },
  contactPhone: { fontSize: 16, color: "#555", marginTop: 5 },
  contactAddress: { fontSize: 16, color: "#555", marginTop: 3 },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#1e90ff",
    borderRadius: 12,
  },
  checkedBox: { backgroundColor: "#1e90ff" },
  floatingButtons: {
    position: "absolute",
    right: 20,
    bottom: 20,
    flexDirection: "column",
    gap: 15,
  },
  floatingButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  floatingButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 10,
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  modalAddButton: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  modalAddButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  closeButton: { padding: 15, backgroundColor: "#ff4757", alignItems: "center", borderRadius: 15 },
  closeText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});