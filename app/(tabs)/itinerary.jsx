import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Predefined itineraries
const PREDEFINED_ITINERARIES = [
  {
    id: 'assam-explorer',
    name: 'Assam Explorer (9 Days)',
    description: 'Discover the beauty of Northeast India',
    destinations: [
      {
        destination_lat: 26.1445,
        destination_lng: 91.7362,
        planned_arrival: "2025-10-02",
        destination_name: "Guwahati",
        planned_departure: "2025-10-11"
      },
      {
        destination_lat: 26.5745,
        destination_lng: 93.1717,
        planned_arrival: "2025-10-11",
        destination_name: "Kaziranga National Orchid and Biodiversity Park", 
        planned_departure: "2025-10-12"
      },
      {
        destination_lat: 27.0173,
        destination_lng: 94.2152,
        planned_arrival: "2025-10-12",
        destination_name: "Majuli",
        planned_departure: "2025-10-13"
      }
    ]
  },
  {
    id: 'kerala-backwaters',
    name: 'Kerala Backwaters (7 Days)',
    description: 'Experience God\'s Own Country',
    destinations: [
      {
        destination_lat: 9.9312,
        destination_lng: 76.2673,
        planned_arrival: "2025-11-01",
        destination_name: "Kochi",
        planned_departure: "2025-11-03"
      },
      {
        destination_lat: 9.4981,
        destination_lng: 76.3388,
        planned_arrival: "2025-11-03",
        destination_name: "Alleppey",
        planned_departure: "2025-11-05"
      },
      {
        destination_lat: 8.8932,
        destination_lng: 76.6141,
        planned_arrival: "2025-11-05",
        destination_name: "Thekkady",
        planned_departure: "2025-11-07"
      }
    ]
  },
  {
    id: 'rajasthan-royal',
    name: 'Rajasthan Royal Tour (10 Days)',
    description: 'Explore the land of kings and palaces',
    destinations: [
      {
        destination_lat: 26.9124,
        destination_lng: 75.7873,
        planned_arrival: "2025-12-01",
        destination_name: "Jaipur",
        planned_departure: "2025-12-04"
      },
      {
        destination_lat: 24.5854,
        destination_lng: 73.7125,
        planned_arrival: "2025-12-04",
        destination_name: "Udaipur",
        planned_departure: "2025-12-07"
      },
      {
        destination_lat: 26.2389,
        destination_lng: 73.0243,
        planned_arrival: "2025-12-07",
        destination_name: "Jodhpur",
        planned_departure: "2025-12-10"
      }
    ]
  }
];

export default function Itinerary() {
  const [userItinerary, setUserItinerary] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showPredefined, setShowPredefined] = useState(false);

  // Load user itinerary from storage
  useEffect(() => {
    loadUserItinerary();
  }, []);

  const loadUserItinerary = async () => {
    try {
      const saved = await AsyncStorage.getItem('userItinerary');
      if (saved) {
        setUserItinerary(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading itinerary:', error);
    }
  };

  const saveUserItinerary = async (itinerary) => {
    try {
      await AsyncStorage.setItem('userItinerary', JSON.stringify(itinerary));
      setUserItinerary(itinerary);
    } catch (error) {
      console.error('Error saving itinerary:', error);
      Alert.alert('Error', 'Failed to save itinerary');
    }
  };

  const addDestination = () => {
    setEditingDestination({
      destination_name: '',
      planned_arrival: '',
      planned_departure: '',
      destination_lat: null,
      destination_lng: null,
    });
    setEditingIndex(null);
    setModalVisible(true);
  };

  const editDestination = (destination, index) => {
    setEditingDestination({ ...destination });
    setEditingIndex(index);
    setModalVisible(true);
  };

  const saveDestination = () => {
    if (!editingDestination.destination_name || !editingDestination.planned_arrival || !editingDestination.planned_departure) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newItinerary = [...userItinerary];
    if (editingIndex !== null) {
      newItinerary[editingIndex] = editingDestination;
    } else {
      newItinerary.push(editingDestination);
    }

    saveUserItinerary(newItinerary);
    setModalVisible(false);
    setEditingDestination(null);
    setEditingIndex(null);
  };

  const deleteDestination = (index) => {
    Alert.alert(
      'Delete Destination', 
      'Are you sure you want to remove this destination?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            const newItinerary = userItinerary.filter((_, i) => i !== index);
            saveUserItinerary(newItinerary);
          }
        }
      ]
    );
  };

  const selectPredefinedItinerary = (predefined) => {
    Alert.alert(
      'Replace Itinerary?',
      `This will replace your current itinerary with "${predefined.name}". Continue?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Replace',
          onPress: () => {
            saveUserItinerary(predefined.destinations);
            setShowPredefined(false);
          }
        }
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderDestinationCard = (destination, index, isUserItinerary = true) => (
    <View key={index} style={styles.destinationCard}>
      <View style={styles.destinationHeader}>
        <View style={styles.destinationInfo}>
          <Text style={styles.destinationName}>{destination.destination_name}</Text>
          <View style={styles.datesContainer}>
            <View style={styles.dateItem}>
              <Ionicons name="calendar-outline" size={14} color="#666" />
              <Text style={styles.dateText}>
                Arrive: {formatDate(destination.planned_arrival)}
              </Text>
            </View>
            <View style={styles.dateItem}>
              <Ionicons name="calendar-outline" size={14} color="#666" />
              <Text style={styles.dateText}>
                Depart: {formatDate(destination.planned_departure)}
              </Text>
            </View>
          </View>
        </View>
        {isUserItinerary && (
          <View style={styles.cardActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => editDestination(destination, index)}
            >
              <Ionicons name="pencil-outline" size={20} color="#4F46E5" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => deleteDestination(index)}
            >
              <Ionicons name="trash-outline" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {index < (isUserItinerary ? userItinerary.length - 1 : destination.length - 1) && (
        <View style={styles.connectionLine} />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Itinerary</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setShowPredefined(true)}
          >
            <Ionicons name="library-outline" size={24} color="#4F46E5" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={addDestination}
          >
            <Ionicons name="add-circle-outline" size={24} color="#4F46E5" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {userItinerary.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="map-outline" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>No Itinerary Yet</Text>
            <Text style={styles.emptyText}>
              Start planning your trip by adding destinations or choosing from our predefined itineraries
            </Text>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => setShowPredefined(true)}
            >
              <Text style={styles.primaryButtonText}>Browse Templates</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.itineraryContainer}>
            <Text style={styles.sectionTitle}>Your Journey</Text>
            {userItinerary.map((destination, index) => 
              renderDestinationCard(destination, index, true)
            )}
          </View>
        )}
      </ScrollView>

      {/* Edit Destination Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingIndex !== null ? 'Edit Destination' : 'Add Destination'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-outline" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Destination Name *</Text>
                <TextInput
                  style={styles.textInput}
                  value={editingDestination?.destination_name || ''}
                  onChangeText={(text) => 
                    setEditingDestination({...editingDestination, destination_name: text})
                  }
                  placeholder="Enter destination name"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Arrival Date *</Text>
                <TextInput
                  style={styles.textInput}
                  value={editingDestination?.planned_arrival || ''}
                  onChangeText={(text) => 
                    setEditingDestination({...editingDestination, planned_arrival: text})
                  }
                  placeholder="YYYY-MM-DD"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Departure Date *</Text>
                <TextInput
                  style={styles.textInput}
                  value={editingDestination?.planned_departure || ''}
                  onChangeText={(text) => 
                    setEditingDestination({...editingDestination, planned_departure: text})
                  }
                  placeholder="YYYY-MM-DD"
                />
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={saveDestination}
              >
                <Text style={styles.primaryButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Predefined Itineraries Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPredefined}
        onRequestClose={() => setShowPredefined(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Template</Text>
              <TouchableOpacity onPress={() => setShowPredefined(false)}>
                <Ionicons name="close-outline" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              {PREDEFINED_ITINERARIES.map((itinerary) => (
                <TouchableOpacity
                  key={itinerary.id}
                  style={styles.predefinedCard}
                  onPress={() => selectPredefinedItinerary(itinerary)}
                >
                  <Text style={styles.predefinedName}>{itinerary.name}</Text>
                  <Text style={styles.predefinedDescription}>{itinerary.description}</Text>
                  <Text style={styles.predefinedDestinations}>
                    {itinerary.destinations.length} destinations • {
                      Math.ceil((new Date(itinerary.destinations[itinerary.destinations.length - 1].planned_departure) - 
                      new Date(itinerary.destinations[0].planned_arrival)) / (1000 * 60 * 60 * 24))
                    } days
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#64748b',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  itineraryContainer: {
    marginBottom: 20,
  },
  destinationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    position: 'relative',
  },
  destinationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  datesContainer: {
    gap: 4,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 14,
    color: '#64748b',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  connectionLine: {
    position: 'absolute',
    bottom: -12,
    left: '50%',
    width: 2,
    height: 12,
    backgroundColor: '#e2e8f0',
    marginLeft: -1,
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  modalScroll: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  predefinedCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  predefinedName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  predefinedDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  predefinedDestinations: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
});