
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
    Animated,
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get('window');

// Northeast India Places Data
const NORTHEAST_PLACES = [
  {
    id: 1,
    type: "attraction",
    name: "Kaziranga National Park",
    distance: "2.5 km",
    rating: 4.8,
    entryFee: "₹250",
    hours: "6am-5pm",
    safe: true,
    restricted: false,
    permits: "Forest Department Permit",
    tribalArea: false,
    coordinates: { latitude: 26.5745, longitude: 93.1717 },
    description: "Famous for one-horned rhinoceros and diverse wildlife",
    bestTime: "Nov-Apr"
  },
  {
    id: 2,
    type: "cultural",
    name: "Majuli Island Satras",
    distance: "15.2 km",
    rating: 4.6,
    entryFee: "Free",
    hours: "5am-8pm",
    safe: true,
    restricted: false,
    permits: "District Administration",
    tribalArea: true,
    coordinates: { latitude: 27.0173, longitude: 94.2152 },
    description: "Vaishnavite monasteries on world's largest river island",
    culturalNote: "Respect Mishing & Deori tribal customs"
  },
  {
    id: 3,
    type: "hotel",
    name: "Tawang Heritage Lodge",
    distance: "3.8 km",
    rating: 4.4,
    dtidCheckin: true,
    safe: true,
    restricted: true,
    permits: "ILP + RAP Required",
    tribalArea: true,
    coordinates: { latitude: 27.5856, longitude: 91.8589 },
    description: "Traditional Monpa architecture with mountain views",
    altitude: "3,048m"
  },
  {
    id: 4,
    type: "food",
    name: "Khasi Traditional Kitchen",
    distance: "0.6 km",
    cuisine: "Khasi, Tribal",
    safe: true,
    restricted: false,
    permits: "None",
    tribalArea: true,
    coordinates: { latitude: 25.5788, longitude: 91.8933 },
    description: "Authentic Khasi tribal cuisine with organic ingredients",
    speciality: "Jadoh, Dohneiiong, Tungrymbai"
  },
  {
    id: 5,
    type: "adventure",
    name: "Living Root Bridges Trek",
    distance: "8.7 km",
    rating: 4.9,
    difficulty: "Moderate",
    duration: "4-6 hours",
    safe: true,
    restricted: false,
    permits: "Local Guide Mandatory",
    tribalArea: true,
    coordinates: { latitude: 25.2644, longitude: 91.7898 },
    description: "UNESCO heritage bio-engineering by Khasi tribe",
    culturalNote: "Sacred groves - photography restricted"
  },
  {
    id: 6,
    type: "attraction",
    name: "Hornbill Festival Grounds",
    distance: "12.3 km",
    rating: 4.7,
    entryFee: "₹500",
    hours: "9am-6pm",
    safe: true,
    restricted: false,
    permits: "Photography Permit",
    tribalArea: true,
    coordinates: { latitude: 25.6751, longitude: 94.1086 },
    description: "Celebration of Naga tribal culture and traditions",
    seasonalNote: "Main festival: Dec 1-10"
  },
  {
    id: 7,
    type: "cultural",
    name: "Konyak Village (Mon)",
    distance: "45.2 km",
    rating: 4.3,
    entryFee: "₹200",
    hours: "Daylight only",
    safe: true,
    restricted: true,
    permits: "Tribal Elder Permission",
    tribalArea: true,
    coordinates: { latitude: 26.7271, longitude: 95.2432 },
    description: "Last headhunter tribe with traditional tattoos",
    culturalNote: "Extreme respect required - no photography of elders without permission"
  },
  {
    id: 8,
    type: "hotel",
    name: "Ziro Bamboo Cottage",
    distance: "5.1 km",
    rating: 4.2,
    dtidCheckin: true,
    safe: true,
    restricted: true,
    permits: "ILP Required",
    tribalArea: true,
    coordinates: { latitude: 27.5460, longitude: 93.8354 },
    description: "Sustainable bamboo architecture in Apatani valley",
    speciality: "UNESCO World Heritage site stay"
  },
  {
    id: 9,
    type: "food",
    name: "Manipuri Thali House",
    distance: "1.8 km",
    cuisine: "Manipuri, Meitei",
    safe: true,
    restricted: false,
    permits: "None",
    tribalArea: true,
    coordinates: { latitude: 24.8170, longitude: 93.9368 },
    description: "Traditional Meitei cuisine in cultural setting",
    speciality: "Eromba, Chamthong, Nganu"
  },
  {
    id: 10,
    type: "adventure",
    name: "Dzukou Valley Trek",
    distance: "25.4 km",
    rating: 4.8,
    difficulty: "Challenging",
    duration: "2-3 days",
    safe: true,
    restricted: false,
    permits: "Forest Permission",
    tribalArea: false,
    coordinates: { latitude: 25.5598, longitude: 94.1219 },
    description: "Valley of flowers between Nagaland-Manipur border",
    bestTime: "Jun-Sep for flowers"
  },
  {
    id: 11,
    type: "cultural",
    name: "Unakoti Archaeological Site",
    distance: "78.5 km",
    rating: 4.1,
    entryFee: "₹25",
    hours: "8am-5pm",
    safe: true,
    restricted: true,
    permits: "ASI Permission",
    tribalArea: true,
    coordinates: { latitude: 23.9408, longitude: 91.9800 },
    description: "Ancient rock carvings and Tripuri sacred sites",
    historicalNote: "8th-9th century Shaivite sculptures"
  },
  {
    id: 12,
    type: "hotel",
    name: "Shillong Heritage Homestay",
    distance: "2.7 km",
    rating: 4.0,
    dtidCheckin: false,
    safe: false,
    restricted: false,
    permits: "Local Registration",
    tribalArea: true,
    coordinates: { latitude: 25.5788, longitude: 91.8933 },
    description: "Traditional Khasi family homestay experience",
    warningNote: "Limited safety measures - travel in groups"
  }
];

const CATEGORIES = ["All", "Attractions", "Cultural Sites", "Hotels", "Food", "Adventure"];

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
  const filtered = NORTHEAST_PLACES.filter((p) => {
    if (safeOnly && !p.safe) return false;
    if (category !== "All") {
      if (category === "Attractions" && p.type !== "attraction") return false;
      if (category === "Cultural Sites" && p.type !== "cultural") return false;
      if (category === "Hotels" && p.type !== "hotel") return false;
      if (category === "Food" && p.type !== "food") return false;
      if (category === "Adventure" && p.type !== "adventure") return false;
    }
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && 
        !p.description.toLowerCase().includes(search.toLowerCase())) return false;
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
              placeholder="Explore Northeast India's treasures..."
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
                          item.type === 'cultural' ? 'library' :
                          item.type === 'hotel' ? 'bed' :
                          item.type === 'food' ? 'restaurant' :
                          item.type === 'adventure' ? 'mountain' : 'help-circle'
                        }
                        size={24}
                        color={item.safe ? '#10B981' : item.restricted ? '#EF4444' : '#F59E0B'}
                      />
                    </View>
                    
                    <View style={styles.cardContent}>
                      <View style={styles.cardTitleRow}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        {item.tribalArea && (
                          <View style={styles.tribalBadge}>
                            <Ionicons name="people" size={10} color="#F59E0B" />
                            <Text style={styles.tribalBadgeText}>Tribal</Text>
                          </View>
                        )}
                      </View>
                      
                      <Text style={styles.cardDistance}>
                        <Ionicons name="location" size={14} color="#9CA3AF" /> {item.distance} away
                      </Text>
                      
                      <Text style={styles.cardDescription} numberOfLines={2}>
                        {item.description}
                      </Text>
                      
                      {item.permits && item.permits !== "None" && (
                        <View style={styles.permitInfo}>
                          <Ionicons name="document-text" size={12} color="#DC2626" />
                          <Text style={styles.permitText}>Permits: {item.permits}</Text>
                        </View>
                      )}
                      
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
                            {item.bestTime && (
                              <View style={styles.detailChip}>
                                <Ionicons name="calendar" size={12} color="#6366F1" />
                                <Text style={styles.detailText}>{item.bestTime}</Text>
                              </View>
                            )}
                          </>
                        )}
                        {item.type === 'cultural' && (
                          <>
                            <View style={styles.detailChip}>
                              <Ionicons name="star" size={12} color="#F59E0B" />
                              <Text style={styles.detailText}>{item.rating}</Text>
                            </View>
                            <View style={styles.detailChip}>
                              <Ionicons name="time" size={12} color="#6366F1" />
                              <Text style={styles.detailText}>{item.hours}</Text>
                            </View>
                            {item.culturalNote && (
                              <View style={[styles.detailChip, { backgroundColor: '#FEF3C7' }]}>
                                <Ionicons name="information-circle" size={12} color="#F59E0B" />
                                <Text style={[styles.detailText, { color: '#F59E0B' }]}>Cultural</Text>
                              </View>
                            )}
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
                            {item.altitude && (
                              <View style={styles.detailChip}>
                                <Ionicons name="triangle" size={12} color="#6366F1" />
                                <Text style={styles.detailText}>{item.altitude}</Text>
                              </View>
                            )}
                          </>
                        )}
                        {item.type === 'food' && (
                          <>
                            <View style={styles.detailChip}>
                              <Ionicons name="restaurant" size={12} color="#10B981" />
                              <Text style={styles.detailText}>{item.cuisine}</Text>
                            </View>
                            {item.speciality && (
                              <View style={[styles.detailChip, { backgroundColor: '#F3E8FF' }]}>
                                <Ionicons name="star" size={12} color="#9333EA" />
                                <Text style={[styles.detailText, { color: '#9333EA' }]}>Special</Text>
                              </View>
                            )}
                          </>
                        )}
                        {item.type === 'adventure' && (
                          <>
                            <View style={styles.detailChip}>
                              <Ionicons name="star" size={12} color="#F59E0B" />
                              <Text style={styles.detailText}>{item.rating}</Text>
                            </View>
                            <View style={[styles.detailChip, { backgroundColor: item.difficulty === 'Challenging' ? '#FEE2E2' : '#FEF3C7' }]}>
                              <Ionicons name="fitness" size={12} color={item.difficulty === 'Challenging' ? '#DC2626' : '#F59E0B'} />
                              <Text style={[styles.detailText, { color: item.difficulty === 'Challenging' ? '#DC2626' : '#F59E0B' }]}>{item.difficulty}</Text>
                            </View>
                            {item.duration && (
                              <View style={styles.detailChip}>
                                <Ionicons name="time" size={12} color="#6366F1" />
                                <Text style={styles.detailText}>{item.duration}</Text>
                              </View>
                            )}
                          </>
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

        {/* Enhanced Warning Modal */}
        <Modal visible={!!warning} transparent animationType="slide" onRequestClose={() => setWarning(null)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.warningModal}>
              <Ionicons 
                name={warning?.restricted ? "shield-outline" : "alert-circle-outline"} 
                size={40} 
                color={warning?.restricted ? "#DC2626" : "#F59E0B"} 
                style={{ marginBottom: 12 }} 
              />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: warning?.restricted ? "#DC2626" : "#F59E0B", marginBottom: 8, textAlign: 'center' }}>
                {warning?.restricted ? "Restricted Area Alert" : "Safety Advisory"}
              </Text>
              <Text style={{ color: '#4B5563', marginBottom: 12, textAlign: 'center', lineHeight: 20 }}>
                {warning?.description || "This location requires special attention."}
              </Text>
              {warning?.permits && warning.permits !== "None" && (
                <View style={{ backgroundColor: '#FEE2E2', padding: 12, borderRadius: 8, marginBottom: 16, width: '100%' }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#DC2626', textAlign: 'center' }}>
                    Required: {warning.permits}
                  </Text>
                </View>
              )}
              {warning?.culturalNote && (
                <View style={{ backgroundColor: '#FEF3C7', padding: 12, borderRadius: 8, marginBottom: 16, width: '100%' }}>
                  <Text style={{ fontSize: 12, color: '#92400E', textAlign: 'center' }}>
                    Cultural Note: {warning.culturalNote}
                  </Text>
                </View>
              )}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: 12 }}>
                <TouchableOpacity 
                  style={[styles.modalBtn, { backgroundColor: '#F3F4F6' }]} 
                  onPress={() => setWarning(null)}
                >
                  <Text style={{ color: '#374151', fontWeight: 'bold' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalBtn, { backgroundColor: warning?.restricted ? '#DC2626' : '#4F46E5' }]} 
                  onPress={() => { 
                    setWarning(null); 
                    alert(`Proceeding to ${warning?.name}. Please ensure you have proper permits and follow cultural guidelines.`); 
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    {warning?.restricted ? "I Have Permits" : "Proceed Safely"}
                  </Text>
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
  
  // Northeast India specific styles
  tribalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 3,
  },
  tribalBadgeText: {
    fontSize: 10,
    color: '#F59E0B',
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 8,
  },
  permitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
    gap: 4,
  },
  permitText: {
    fontSize: 11,
    color: '#DC2626',
    fontWeight: '600',
    flex: 1,
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
