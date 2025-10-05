
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { 
  Animated, 
  FlatList, 
  Modal, 
  ScrollView, 
  StyleSheet, 
  Switch, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  Dimensions,
  Platform
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get('window');

// Static data for demo
const SAMPLE_PLACES = [
  {
    id: 1,
    type: "attraction",
    name: "Local Museum",
    distance: "1.2 km",
    rating: 4.2,
    entryFee: "₹50",
    hours: "9am-6pm",
    safe: true,
    restricted: false,
    coordinates: { latitude: 28.6139, longitude: 77.2090 }, // Delhi coordinates
  },
  {
    id: 2,
    type: "hotel",
    name: "Heritage Hotel",
    distance: "2.3 km",
    rating: 4.5,
    dtidCheckin: true,
    safe: true,
    restricted: false,
    coordinates: { latitude: 28.6127, longitude: 77.2073 },
  },
  {
    id: 3,
    type: "food",
    name: "Delhi Chaat Corner",
    distance: "0.8 km",
    cuisine: "Veg, Local",
    safe: true,
    restricted: false,
    coordinates: { latitude: 28.6155, longitude: 77.2167 },
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
    coordinates: { latitude: 28.6100, longitude: 77.2300 },
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
    coordinates: { latitude: 28.6200, longitude: 77.2000 },
  },
];

const CATEGORIES = ["All", "Attractions", "Hotels", "Food", "Adventure"];

export default function ExploreTab() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [safeOnly, setSafeOnly] = useState(true);
  const [warning, setWarning] = useState(null);
  const [location, setLocation] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState("undetermined");
  
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const scaleAnim = useState(new Animated.Value(0.9))[0];

  // Filtered places
  const filtered = SAMPLE_PLACES.filter((p) => {
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

  useEffect(() => {
    const setupLocation = async () => {
      const current = await Location.getForegroundPermissionsAsync();
      if (current.status !== "granted") {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionStatus(status);
        if (status !== 'granted') {
          return;
        }
      } else {
        setPermissionStatus('granted');
      }

      try {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      } catch (error) {
        console.log('Error getting location:', error);
      }
    };
    setupLocation();
    
    // Animation on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePlacePress = (place) => {
    if (place.restricted) {
      setWarning(place);
    } else {
      // Navigation/book action placeholder
      alert(`Navigating to ${place.name}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={styles.container}>
          {/* Enhanced Search Bar */}
          <Animated.View 
            style={[
              styles.searchBar,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Ionicons name="search" size={22} color="#6366F1" style={{ marginRight: 12 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Discover amazing places near you..."
              placeholderTextColor="#9CA3AF"
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </Animated.View>

          {/* Enhanced Filters */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.filtersRow}
              contentContainerStyle={styles.filtersContent}
            >
              {CATEGORIES.map((cat, index) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.filterBtn, 
                    category === cat && styles.filterBtnActive,
                    { 
                      transform: [{ 
                        scale: category === cat ? 1.05 : 1 
                      }] 
                    }
                  ]}
                  onPress={() => setCategory(cat)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.filterText, category === cat && styles.filterTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
              
              <View style={styles.safeToggleRow}>
                <Ionicons name="shield-checkmark" size={18} color="#10B981" style={{ marginRight: 6 }} />
                <Text style={styles.safeToggleText}>Safe Only</Text>
                <Switch 
                  value={safeOnly} 
                  onValueChange={setSafeOnly}
                  trackColor={{ false: '#E5E7EB', true: '#10B981' }}
                  thumbColor={safeOnly ? '#FFFFFF' : '#F3F4F6'}
                />
              </View>
            </ScrollView>
          </Animated.View>

          {/* Real map using react-native-maps */}
          <View style={styles.map}>
            {location && permissionStatus === 'granted' ? (
              <MapView
                style={styles.mapView}
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
              >
                {filtered.map((place) => (
                  <Marker
                    key={place.id}
                    coordinate={place.coordinates}
                    title={place.name}
                    description={place.distance}
                    pinColor={place.restricted ? 'red' : 'green'}
                  />
                ))}
              </MapView>
            ) : (
              <View style={styles.mapPlaceholder}>
                <Text style={styles.mapPlaceholderText}>
                  {permissionStatus === 'denied' 
                    ? 'Location permission required to show map'
                    : 'Loading map...'
                  }
                </Text>
              </View>
            )}
          </View>

          {/* List View: Cards rendered directly */}
          <View style={styles.cardsContainer}>
            {filtered.map((item, index) => (
              <Animated.View
                key={item.id}
                style={[
                  styles.cardContainer,
                  {
                    opacity: fadeAnim,
                    transform: [
                      { 
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 50],
                          outputRange: [0, index * 10],
                        })
                      }
                    ]
                  }
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.card,
                    item.restricted && styles.restrictedCard,
                    !item.safe && styles.warningCard
                  ]}
                  onPress={() => handlePlacePress(item)}
                  activeOpacity={0.9}
                >
                  <View style={styles.cardHeader}>
                    <View style={[
                      styles.iconContainer,
                      { backgroundColor: item.safe ? '#EBF8F2' : item.restricted ? '#FEF2F2' : '#FEF3C7' }
                    ]}>
                      <Ionicons
                        name={
                          item.type === 'attraction' ? 'camera' :
                          item.type === 'hotel' ? 'bed' :
                          item.type === 'food' ? 'restaurant' : 'help-circle'
                        }
                        size={24}
                        color={item.safe ? '#10B981' : item.restricted ? '#EF4444' : '#F59E0B'}
                      />
                    </View>
                    
                    <View style={styles.cardContent}>
                      <View style={styles.cardTitleRow}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                      </View>
                      
                      <Text style={styles.cardDistance}>
                        <Ionicons name="location" size={14} color="#9CA3AF" /> {item.distance} away
                      </Text>
                      
                      <View style={styles.cardDetailsRow}>
                        {item.type === 'attraction' && (
                          <>
                            <View style={styles.detailChip}>
                              <Ionicons name="star" size={12} color="#F59E0B" />
                              <Text style={styles.detailText}>{item.rating}</Text>
                            </View>
                            <View style={styles.detailChip}>
                              <Ionicons name="cash" size={12} color="#10B981" />
                              <Text style={styles.detailText}>{item.entryFee}</Text>
                            </View>
                            <View style={styles.detailChip}>
                              <Ionicons name="time" size={12} color="#6366F1" />
                              <Text style={styles.detailText}>{item.hours}</Text>
                            </View>
                          </>
                        )}
                        {item.type === 'hotel' && (
                          <>
                            <View style={styles.detailChip}>
                              <Ionicons name="star" size={12} color="#F59E0B" />
                              <Text style={styles.detailText}>{item.rating}</Text>
                            </View>
                            {item.dtidCheckin && (
                              <View style={[styles.detailChip, { backgroundColor: '#EBF8F2' }]}>
                                <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                                <Text style={[styles.detailText, { color: '#10B981' }]}>DTID</Text>
                              </View>
                            )}
                          </>
                        )}
                        {item.type === 'food' && (
                          <View style={styles.detailChip}>
                            <Ionicons name="leaf" size={12} color="#10B981" />
                            <Text style={styles.detailText}>{item.cuisine}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                    
                    <View style={styles.cardActions}>
                      <View style={[
                        styles.safetyBadge, 
                        { backgroundColor: item.safe ? '#10B981' : item.restricted ? '#EF4444' : '#F59E0B' }
                      ]}>
                        <Ionicons 
                          name={item.safe ? 'shield-checkmark' : item.restricted ? 'warning' : 'alert-circle'} 
                          size={12} 
                          color="#fff" 
                        />
                        <Text style={styles.safetyText}>
                          {item.safe ? 'Safe' : item.restricted ? 'Restricted' : 'Caution'}
                        </Text>
                      </View>
                      
                      <TouchableOpacity 
                        style={styles.quickActionBtn} 
                        onPress={() => handlePlacePress(item)}
                      >
                        <Ionicons 
                          name={item.type === 'hotel' ? 'bed' : 'navigate'} 
                          size={18} 
                          color="#6366F1" 
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#F8FAFC' 
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  container: { 
    backgroundColor: '#F8FAFC', 
    paddingTop: 25 
  },
  
  // Enhanced Search Bar
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    marginHorizontal: 20, 
    marginTop: 15, 
    marginBottom: 20, 
    paddingHorizontal: 16, 
    paddingVertical: 14, 
    shadowColor: '#6366F1', 
    shadowOpacity: 0.08, 
    shadowRadius: 12, 
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500'
  },
  clearButton: {
    padding: 4,
    marginLeft: 8
  },
  
  // Enhanced Filters
  filtersRow: { 
    marginBottom: 20, 
    paddingHorizontal: 20 
  },
  filtersContent: {
    alignItems: 'center',
    paddingRight: 20
  },
  filterBtn: { 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 20, 
    backgroundColor: '#F1F5F9', 
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  filterBtnActive: { 
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  filterText: { 
    color: '#64748B', 
    fontWeight: '600', 
    fontSize: 14 
  },
  filterTextActive: { 
    color: '#FFFFFF',
    fontWeight: '700'
  },
  safeToggleRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F1F5F9', 
    borderRadius: 20, 
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  safeToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginRight: 8
  },
  
  // Enhanced Map
  map: { 
    height: 220, 
    marginHorizontal: 20, 
    marginBottom: 15, 
    borderRadius: 20, 
    overflow: 'hidden', 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 10, 
    elevation: 6 
  },
  mapView: { 
    flex: 1 
  },
  mapPlaceholder: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#E2E8F0' 
  },
  mapPlaceholderText: { 
    fontSize: 16, 
    color: '#64748B', 
    textAlign: 'center', 
    paddingHorizontal: 20,
    fontWeight: '500' 
  },
  
  // Enhanced Cards
  cardsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100
  },
  cardContainer: {
    marginBottom: 4
  },
  card: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    marginVertical: 8, 
    padding: 20, 
    shadowColor: '#64748B', 
    shadowOpacity: 0.08, 
    shadowRadius: 12, 
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9'
  },
  restrictedCard: {
    borderColor: '#FEE2E2',
    backgroundColor: '#FFFBFB'
  },
  warningCard: {
    borderColor: '#FEF3C7',
    backgroundColor: '#FFFBEB'
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  cardContent: {
    flex: 1
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#1E293B'
  },
  cardDistance: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
    fontWeight: '500'
  },
  cardDetailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8
  },
  detailChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 6
  },
  detailText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginLeft: 4
  },
  cardActions: {
    alignItems: 'flex-end'
  },
  safetyBadge: { 
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12, 
    paddingHorizontal: 10, 
    paddingVertical: 6, 
    marginBottom: 8
  },
  safetyText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
    marginLeft: 4
  },
  quickActionBtn: { 
    backgroundColor: '#EEF2FF', 
    borderRadius: 12, 
    padding: 10,
    borderWidth: 1,
    borderColor: '#C7D2FE'
  },
  
  // Modal Styles
  modalBackdrop: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  warningModal: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 24, 
    padding: 32, 
    alignItems: 'center', 
    width: screenWidth - 60, 
    maxWidth: 340,
    shadowColor: '#000', 
    shadowOpacity: 0.15, 
    shadowRadius: 20, 
    elevation: 10 
  },
  modalBtn: { 
    flex: 1, 
    marginHorizontal: 8, 
    paddingVertical: 14, 
    borderRadius: 16, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
});
