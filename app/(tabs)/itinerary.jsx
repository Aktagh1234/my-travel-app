import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Predefined itineraries for Northeast India
const PREDEFINED_ITINERARIES = [
  {
    id: 'assam-meghalaya-circuit',
    name: 'Assam-Meghalaya Cultural Circuit (10 Days)',
    description: 'Explore Khasi & Garo tribal heritage with proper permits',
    permitRequired: true,
    specialNotes: 'ILP required for some areas. Respect tribal customs.',
    destinations: [
      {
        destination_lat: 26.1445,
        destination_lng: 91.7362,
        planned_arrival: "2025-11-01",
        destination_name: "Guwahati (Gateway & Permits)",
        planned_departure: "2025-11-03",
        tribal_area: false,
        permits_needed: "None",
        cultural_notes: "Kamakhya Temple, Brahmaputra River Cruise"
      },
      {
        destination_lat: 26.5745,
        destination_lng: 93.1717,
        planned_arrival: "2025-11-03",
        destination_name: "Kaziranga National Park",
        planned_departure: "2025-11-05",
        tribal_area: false,
        permits_needed: "Forest Department Permit",
        cultural_notes: "One-horned rhino habitat, Mishing tribe villages nearby"
      },
      {
        destination_lat: 25.5788,
        destination_lng: 91.8933,
        planned_arrival: "2025-11-05",
        destination_name: "Shillong (Khasi Hills)",
        planned_departure: "2025-11-07",
        tribal_area: true,
        permits_needed: "ILP for restricted areas",
        cultural_notes: "Khasi tribal culture, traditional markets, respect matrilineal society"
      },
      {
        destination_lat: 25.2644,
        destination_lng: 91.7898,
        planned_arrival: "2025-11-07",
        destination_name: "Cherrapunji (Sohra)",
        planned_departure: "2025-11-09",
        tribal_area: true,
        permits_needed: "Local guide mandatory",
        cultural_notes: "Khasi sacred groves, living root bridges, traditional villages"
      },
      {
        destination_lat: 27.0173,
        destination_lng: 94.2152,
        planned_arrival: "2025-11-09",
        destination_name: "Majuli Island (Mishing Tribe)",
        planned_departure: "2025-11-11",
        tribal_area: true,
        permits_needed: "District administration permission",
        cultural_notes: "Vaishnavite monasteries, Mishing & Deori tribal villages"
      }
    ]
  },
  {
    id: 'arunachal-pradesh-adventure',
    name: 'Arunachal Pradesh Tribal Discovery (12 Days)',
    description: 'Experience Monpa, Apatani & Nyishi cultures',
    permitRequired: true,
    specialNotes: 'Mandatory ILP, local guides, and restricted area permits required',
    destinations: [
      {
        destination_lat: 27.0844,
        destination_lng: 93.6053,
        planned_arrival: "2025-12-01",
        destination_name: "Itanagar (Entry Point)",
        planned_departure: "2025-12-03",
        tribal_area: true,
        permits_needed: "ILP + RAP",
        cultural_notes: "Nyishi tribe capital, Ita Fort, tribal museum"
      },
      {
        destination_lat: 27.3389,
        destination_lng: 93.6056,
        planned_arrival: "2025-12-03",
        destination_name: "Ziro Valley (Apatani Tribe)",
        planned_departure: "2025-12-06",
        tribal_area: true,
        permits_needed: "Special Area Permit + Local guide",
        cultural_notes: "UNESCO site, Apatani sustainable farming, facial tattoos tradition"
      },
      {
        destination_lat: 27.2046,
        destination_lng: 91.6915,
        planned_arrival: "2025-12-06",
        destination_name: "Tawang (Monpa Tribe)",
        planned_departure: "2025-12-09",
        tribal_area: true,
        permits_needed: "Military restricted area permit",
        cultural_notes: "Monpa Buddhist culture, Tawang Monastery, border sensitivity"
      },
      {
        destination_lat: 28.2180,
        destination_lng: 94.7278,
        planned_arrival: "2025-12-09",
        destination_name: "Bomdila (Monpa Culture)",
        planned_departure: "2025-12-12",
        tribal_area: true,
        permits_needed: "District collector permit",
        cultural_notes: "Monpa handloom, apple orchards, Buddhist gompa"
      }
    ]
  },
  {
    id: 'nagaland-mizoram-heritage',
    name: 'Nagaland-Mizoram Tribal Heritage (8 Days)',
    description: 'Explore Naga & Mizo warrior cultures respectfully',
    permitRequired: true,
    specialNotes: 'Hornbill Festival season recommended. Photography permissions needed.',
    destinations: [
      {
        destination_lat: 25.6751,
        destination_lng: 94.1086,
        planned_arrival: "2025-12-01",
        destination_name: "Kohima (Naga Heritage)",
        planned_departure: "2025-12-04",
        tribal_area: true,
        permits_needed: "ILP + Photography permit",
        cultural_notes: "Angami Naga tribe, WWII cemetery, traditional morung (bachelor huts)"
      },
      {
        destination_lat: 26.1584,
        destination_lng: 94.5624,
        planned_arrival: "2025-12-04",
        destination_name: "Mon District (Konyak Tribe)",
        planned_departure: "2025-12-06",
        tribal_area: true,
        permits_needed: "Restricted area permit + Tribal elder permission",
        cultural_notes: "Last headhunter tribes, traditional tattoos, respect elder protocols"
      },
      {
        destination_lat: 23.7271,
        destination_lng: 92.7176,
        planned_arrival: "2025-12-06",
        destination_name: "Aizawl (Mizo Culture)",
        planned_departure: "2025-12-08",
        tribal_area: true,
        permits_needed: "ILP for Mizoram",
        cultural_notes: "Mizo traditional bamboo dance, Presbyterian influence, tribal councils"
      }
    ]
  },
  {
    id: 'manipur-tripura-cultural',
    name: 'Manipur-Tripura Cultural Circuit (9 Days)',
    description: 'Discover Meitei, Manipuri & Tripuri traditions',
    permitRequired: true,
    specialNotes: 'Dance festivals, polo origins, and tribal textiles focus',
    destinations: [
      {
        destination_lat: 24.8170,
        destination_lng: 93.9368,
        planned_arrival: "2025-01-15",
        destination_name: "Imphal (Meitei Culture)",
        planned_departure: "2025-01-18",
        tribal_area: true,
        permits_needed: "ILP + Disturbed area guidelines",
        cultural_notes: "Manipuri dance birthplace, Kangla Fort, Ima Keithel (women's market)"
      },
      {
        destination_lat: 24.5698,
        destination_lng: 93.9528,
        planned_arrival: "2025-01-18",
        destination_name: "Loktak Lake (Fishing Communities)",
        planned_departure: "2025-01-20",
        tribal_area: false,
        permits_needed: "Eco-tourism permit",
        cultural_notes: "Floating phumdis, traditional fishing, conservation awareness needed"
      },
      {
        destination_lat: 23.8315,
        destination_lng: 91.2868,
        planned_arrival: "2025-01-20",
        destination_name: "Agartala (Tripuri Heritage)",
        planned_departure: "2025-01-22",
        tribal_area: true,
        permits_needed: "Tribal area permit for villages",
        cultural_notes: "Tripuri tribal kingdom, Ujjayanta Palace, traditional weaving"
      },
      {
        destination_lat: 23.9408,
        destination_lng: 91.9800,
        planned_arrival: "2025-01-22",
        destination_name: "Unakoti (Sacred Sculptures)",
        planned_departure: "2025-01-24",
        tribal_area: true,
        permits_needed: "Archaeological survey permission",
        cultural_notes: "Ancient rock carvings, tribal spiritual sites, local guide essential"
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
          <View style={styles.destinationTitleRow}>
            <Text style={styles.destinationName}>{destination.destination_name}</Text>
            {destination.tribal_area && (
              <View style={styles.tribalBadge}>
                <Ionicons name="people-outline" size={12} color="#F59E0B" />
                <Text style={styles.tribalBadgeText}>Tribal Area</Text>
              </View>
            )}
          </View>
          
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

          {/* Permit Information */}
          {destination.permits_needed && (
            <View style={styles.permitInfo}>
              <View style={styles.permitItem}>
                <Ionicons name="document-text-outline" size={14} color="#DC2626" />
                <Text style={styles.permitText}>Permits: {destination.permits_needed}</Text>
              </View>
            </View>
          )}

          {/* Cultural Notes */}
          {destination.cultural_notes && (
            <View style={styles.culturalInfo}>
              <View style={styles.culturalItem}>
                <Ionicons name="information-circle-outline" size={14} color="#059669" />
                <Text style={styles.culturalText}>{destination.cultural_notes}</Text>
              </View>
            </View>
          )}
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
                  <View style={styles.predefinedHeader}>
                    <Text style={styles.predefinedName}>{itinerary.name}</Text>
                    {itinerary.permitRequired && (
                      <View style={styles.permitRequiredBadge}>
                        <Ionicons name="shield-checkmark-outline" size={12} color="#DC2626" />
                        <Text style={styles.permitBadgeText}>Permits Required</Text>
                      </View>
                    )}
                  </View>
                  
                  <Text style={styles.predefinedDescription}>{itinerary.description}</Text>
                  
                  {itinerary.specialNotes && (
                    <View style={styles.specialNotesContainer}>
                      <Ionicons name="alert-circle-outline" size={14} color="#F59E0B" />
                      <Text style={styles.specialNotesText}>{itinerary.specialNotes}</Text>
                    </View>
                  )}
                  
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
  predefinedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  predefinedName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
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
  permitRequiredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  permitBadgeText: {
    fontSize: 10,
    color: '#DC2626',
    fontWeight: '600',
  },
  specialNotesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF3C7',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    gap: 6,
  },
  specialNotesText: {
    fontSize: 12,
    color: '#92400E',
    flex: 1,
    lineHeight: 16,
  },
  destinationTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tribalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 3,
  },
  tribalBadgeText: {
    fontSize: 9,
    color: '#F59E0B',
    fontWeight: '600',
  },
  permitInfo: {
    marginTop: 6,
    marginBottom: 4,
  },
  permitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  permitText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '500',
    flex: 1,
  },
  culturalInfo: {
    marginTop: 4,
  },
  culturalItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  culturalText: {
    fontSize: 12,
    color: '#059669',
    flex: 1,
    lineHeight: 16,
  },
});