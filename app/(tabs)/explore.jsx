
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Modal, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

// Static data for demo
const PLACES = [
  {
    id: 1,
    type: "attraction",
    name: "Red Fort",
    distance: "2.1 km",
    rating: 4.7,
    entryFee: "₹500",
    hours: "9am-6pm",
    safe: true,
    restricted: false,
  },
  {
    id: 2,
    type: "hotel",
    name: "Hotel SafeStay",
    distance: "1.2 km",
    rating: 4.3,
    dtidCheckin: true,
    safe: true,
    restricted: false,
  },
  {
    id: 3,
    type: "food",
    name: "Delhi Chaat Corner",
    distance: "0.8 km",
    cuisine: "Veg, Local",
    safe: true,
    restricted: false,
  },
  {
    id: 4,
    type: "attraction",
    name: "Haunted Fort",
    distance: "5.5 km",
    rating: 3.9,
    entryFee: "₹200",
    hours: "10am-5pm",
    safe: false,
    restricted: true,
  },
  {
    id: 5,
    type: "hotel",
    name: "Budget Inn",
    distance: "3.2 km",
    rating: 3.5,
    dtidCheckin: false,
    safe: false,
    restricted: true,
  },
];

const CATEGORIES = ["All", "Attractions", "Hotels", "Food", "Adventure"];

export default function ExploreTab() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [safeOnly, setSafeOnly] = useState(true);
  const [warning, setWarning] = useState(null);

  // Filtered places
  const filtered = PLACES.filter((p) => {
    if (safeOnly && !p.safe) return false;
    if (category !== "All") {
      if (category === "Attractions" && p.type !== "attraction") return false;
      if (category === "Hotels" && p.type !== "hotel") return false;
      if (category === "Food" && p.type !== "food") return false;
      if (category === "Adventure" && p.type !== "adventure") return false;
    }
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handlePlacePress = (place) => {
    if (place.restricted) {
      setWarning(place);
    } else {
      // Navigation/book action placeholder
      alert(`Navigating to ${place.name}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
        <TextInput
          style={{ flex: 1, fontSize: 16 }}
          placeholder="Search for places, hotels, food…"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersRow}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterBtn, category === cat && styles.filterBtnActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.filterText, category === cat && styles.filterTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.safeToggleRow}>
          <Text style={{ fontSize: 14, marginRight: 4 }}>Safe Areas Only</Text>
          <Switch value={safeOnly} onValueChange={setSafeOnly} />
        </View>
      </ScrollView>

      {/* Map Placeholder */}
      <View style={styles.mapPlaceholder}>
        <Ionicons name="map" size={40} color="#4F46E5" />
        <Text style={{ color: '#888', marginTop: 4 }}>Map view coming soon</Text>
      </View>

      {/* List View: Swipeable Cards */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePlacePress(item)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                name={
                  item.type === 'attraction' ? 'location-outline' :
                  item.type === 'hotel' ? 'bed-outline' :
                  item.type === 'food' ? 'restaurant-outline' : 'help-circle-outline'
                }
                size={28}
                color={item.safe ? '#10B981' : '#F59E0B'}
                style={{ marginRight: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSub}>{item.distance} away</Text>
                {item.type === 'attraction' && (
                  <Text style={styles.cardInfo}>Rating: {item.rating} | Entry: {item.entryFee} | Hours: {item.hours}</Text>
                )}
                {item.type === 'hotel' && (
                  <Text style={styles.cardInfo}>{item.dtidCheckin ? 'DTID Check-in Supported' : 'No DTID Check-in'} | Rating: {item.rating}</Text>
                )}
                {item.type === 'food' && (
                  <Text style={styles.cardInfo}>{item.cuisine}</Text>
                )}
              </View>
              <View style={[styles.safetyBadge, { backgroundColor: item.safe ? '#10B981' : '#F59E0B' }] }>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>{item.safe ? 'Safe' : 'Caution'}</Text>
              </View>
              <TouchableOpacity style={styles.quickActionBtn} onPress={() => handlePlacePress(item)}>
                <Ionicons name={item.type === 'hotel' ? 'bed' : 'navigate'} size={20} color="#4F46E5" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Warning Modal */}
      <Modal visible={!!warning} transparent animationType="slide" onRequestClose={() => setWarning(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.warningModal}>
            <Ionicons name="warning" size={40} color="#F59E0B" style={{ marginBottom: 10 }} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#F59E0B', marginBottom: 8 }}>This area may be unsafe.</Text>
            <Text style={{ color: '#333', marginBottom: 18 }}>Proceed?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#F59E0B' }]} onPress={() => setWarning(null)}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#4F46E5' }]} onPress={() => { setWarning(null); alert('Proceeding to restricted area!'); }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', paddingTop: 10 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 16, marginBottom: 10, paddingHorizontal: 12, paddingVertical: 8, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  filtersRow: { flexDirection: 'row', marginBottom: 8, marginLeft: 8 },
  filterBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: '#F3F4F6', marginRight: 8 },
  filterBtnActive: { backgroundColor: '#4F46E5' },
  filterText: { color: '#4F46E5', fontWeight: 'bold', fontSize: 14 },
  filterTextActive: { color: '#fff' },
  safeToggleRow: { flexDirection: 'row', alignItems: 'center', marginLeft: 8, backgroundColor: '#F3F4F6', borderRadius: 16, paddingHorizontal: 10 },
  mapPlaceholder: { height: 120, backgroundColor: '#E5E7EB', borderRadius: 16, margin: 16, alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 16, marginBottom: 14, padding: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  cardTitle: { fontSize: 17, fontWeight: 'bold', color: '#1E293B' },
  cardSub: { fontSize: 13, color: '#6B7280', marginBottom: 2 },
  cardInfo: { fontSize: 13, color: '#666' },
  safetyBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, marginLeft: 8, alignSelf: 'flex-start' },
  quickActionBtn: { marginLeft: 10, backgroundColor: '#E0E7FF', borderRadius: 8, padding: 6 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' },
  warningModal: { backgroundColor: '#fff', borderRadius: 18, padding: 24, alignItems: 'center', width: 300, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 6 },
  modalBtn: { flex: 1, marginHorizontal: 8, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
});
