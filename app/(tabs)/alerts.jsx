import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Alerts() {
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [alerts] = useState([
    { 
      id: '1', 
      type: 'critical', 
      title: 'Arunachal Pradesh ILP Verification Required', 
      time: '2 hours ago',
      description: 'You are approaching a restricted area near Tawang. Inner Line Permit (ILP) verification mandatory at next checkpoint. Carry original documents.',
      location: 'Tawang District, Arunachal Pradesh',
      action: 'Prepare ILP documents for inspection'
    },
    { 
      id: '2', 
      type: 'weather', 
      title: 'Heavy Monsoon Alert - Cherrapunji Region', 
      time: '3 hours ago',
      description: 'Extremely heavy rainfall expected in Meghalaya. Landslide risk high on NH-6 towards Cherrapunji. Consider postponing visit to living root bridges.',
      location: 'East Khasi Hills, Meghalaya',
      action: 'Avoid non-essential travel, monitor weather updates'
    },
    { 
      id: '3', 
      type: 'tribal', 
      title: 'Konyak Tribal Area - Photography Restrictions', 
      time: '5 hours ago',
      description: 'Entering traditional Konyak Naga territory near Mon. Photography of elders with traditional tattoos requires explicit permission. Respect local customs.',
      location: 'Mon District, Nagaland',
      action: 'Seek elder permission before photography'
    },
    { 
      id: '4', 
      type: 'security', 
      title: 'Enhanced Border Security - Dawki Area', 
      time: 'Yesterday 4:30 PM',
      description: 'Increased BSF patrolling near Bangladesh border at Dawki. Additional document verification. Allow extra time for crossing.',
      location: 'Dawki, Meghalaya-Bangladesh Border',
      action: 'Carry all identity documents, allow extra time'
    },
    { 
      id: '5', 
      type: 'cultural', 
      title: 'Hornbill Festival Crowd Management', 
      time: 'Yesterday 6:15 PM',
      description: 'Large crowds expected at Kisama Heritage Village for Hornbill Festival. Limited parking available. Traditional Naga ceremonies ongoing - maintain respectful distance.',
      location: 'Kisama, Nagaland',
      action: 'Use public transport, respect ceremony protocols'
    },
    { 
      id: '6', 
      type: 'info', 
      title: 'Majuli Ferry Service Update', 
      time: 'Yesterday 8:20 PM',
      description: 'Regular ferry service to Majuli Island restored after maintenance. Last ferry at 4:30 PM. Book accommodation in advance - limited options during peak season.',
      location: 'Jorhat-Majuli Ferry Route, Assam',
      action: 'Plan departure before 4 PM, confirm bookings'
    },
    { 
      id: '7', 
      type: 'environmental', 
      title: 'Kaziranga Rhino Protection Zone', 
      time: '2 days ago',
      description: 'Special anti-poaching operation active in Kaziranga Central Range. Some safari routes temporarily closed. Night movement restricted.',
      location: 'Kaziranga National Park, Assam',
      action: 'Check with forest office for open routes'
    },
    { 
      id: '8', 
      type: 'health', 
      title: 'Japanese Encephalitis Vaccination Advisory', 
      time: '2 days ago',
      description: 'Health advisory for Ziro Valley and surrounding areas during paddy season. Japanese Encephalitis vaccination recommended. Carry mosquito repellent.',
      location: 'Ziro Valley, Arunachal Pradesh',
      action: 'Consult healthcare provider, use protection'
    },
    { 
      id: '9', 
      type: 'permit', 
      title: 'Mizoram RAP Deadline Approaching', 
      time: '3 days ago',
      description: 'Your Restricted Area Permit (RAP) for Mizoram expires in 5 days. Renewal required for extended stay. Visit Deputy Commissioner office.',
      location: 'Aizawl, Mizoram',
      action: 'Renew RAP before expiry date'
    },
    { 
      id: '10', 
      type: 'transport', 
      title: 'NH-15 Landslide Clearance Complete', 
      time: '3 days ago',
      description: 'Road connectivity restored on National Highway 15 between Haflong and Silchar after landslide clearance. Traffic moving normally.',
      location: 'Haflong-Silchar Route, Assam',
      action: 'Resume travel plans, check road conditions'
    }
  ]);

  const getAlertConfig = (type) => {
    const configs = {
      critical: { color: '#DC2626', bgColor: '#FEE2E2', icon: 'warning' },
      weather: { color: '#2563EB', bgColor: '#DBEAFE', icon: 'rainy' },
      tribal: { color: '#F59E0B', bgColor: '#FEF3C7', icon: 'people' },
      security: { color: '#7C2D12', bgColor: '#FED7AA', icon: 'shield-checkmark' },
      cultural: { color: '#9333EA', bgColor: '#F3E8FF', icon: 'library' },
      info: { color: '#059669', bgColor: '#D1FAE5', icon: 'information-circle' },
      environmental: { color: '#166534', bgColor: '#DCFCE7', icon: 'leaf' },
      health: { color: '#BE185D', bgColor: '#FCE7F3', icon: 'medical' },
      permit: { color: '#B91C1C', bgColor: '#FEE2E2', icon: 'document-text' },
      transport: { color: '#1F2937', bgColor: '#F3F4F6', icon: 'car' }
    };
    return configs[type] || configs.info;
  };

  const toggleAlert = (alertId) => {
    setExpandedAlert(expandedAlert === alertId ? null : alertId);
  };

  const renderItem = ({ item }) => {
    const config = getAlertConfig(item.type);
    const isExpanded = expandedAlert === item.id;
    
    return (
      <TouchableOpacity 
        style={[styles.card, { borderLeftColor: config.color }]}
        onPress={() => toggleAlert(item.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: config.bgColor }]}>
          <Ionicons name={config.icon} size={20} color={config.color} />
        </View>
        
        <View style={styles.alertContent}>
          <View style={styles.alertHeader}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.headerRight}>
              <Text style={styles.time}>{item.time}</Text>
              <Ionicons 
                name={isExpanded ? "chevron-up" : "chevron-down"} 
                size={16} 
                color="#6B7280" 
                style={styles.expandIcon}
              />
            </View>
          </View>
          
          <Text 
            style={styles.description} 
            numberOfLines={isExpanded ? undefined : 2}
          >
            {item.description}
          </Text>
          
          {isExpanded && (
            <View style={styles.expandedContent}>
              <View style={styles.detailSection}>
                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={14} color="#6B7280" />
                  <Text style={styles.locationExpanded}>{item.location}</Text>
                </View>
                
                <View style={styles.actionContainer}>
                  <Ionicons name="checkmark-circle" size={14} color="#059669" />
                  <Text style={styles.actionExpanded}>Action Required: {item.action}</Text>
                </View>
              </View>
              
              <View style={styles.expandedActions}>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: config.bgColor }]}
                  onPress={() => {
                    // Handle mark as read
                    console.log('Mark as read:', item.id);
                  }}
                >
                  <Ionicons name="checkmark" size={16} color={config.color} />
                  <Text style={[styles.actionButtonText, { color: config.color }]}>Mark as Read</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: '#F3F4F6' }]}
                  onPress={() => {
                    // Handle dismiss
                    console.log('Dismiss:', item.id);
                  }}
                >
                  <Ionicons name="close" size={16} color="#6B7280" />
                  <Text style={[styles.actionButtonText, { color: '#6B7280' }]}>Dismiss</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
          {!isExpanded && (
            <View style={styles.alertFooter}>
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={12} color="#6B7280" />
                <Text style={styles.location} numberOfLines={1}>{item.location}</Text>
              </View>
              
              <Text style={styles.tapToExpand}>Tap to expand</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <Text style={styles.header}>Northeast India Safety Alerts</Text>
      <FlatList
        data={alerts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#F9FAFB' 
  },
  container: { 
    flex: 1, 
    backgroundColor: '#F9FAFB' 
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1E293B', 
    padding: 20, 
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 16, 
    borderLeftWidth: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.08, 
    shadowRadius: 12, 
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 2
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expandIcon: {
    marginLeft: 4,
  },
  title: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#1E293B',
    flex: 1,
    marginRight: 8,
  },
  time: { 
    fontSize: 12, 
    color: '#9CA3AF',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 8,
  },
  alertFooter: {
    gap: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  action: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  tapToExpand: {
    fontSize: 11,
    color: '#9CA3AF',
    fontStyle: 'italic',
    textAlign: 'right',
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  detailSection: {
    marginBottom: 16,
  },
  locationExpanded: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
    flex: 1,
  },
  actionExpanded: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
    flex: 1,
  },
  expandedActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
});



