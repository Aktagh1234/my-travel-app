import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { 
  Image, 
  ImageBackground, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  Animated,
  Dimensions,
  LinearGradient
} from "react-native";
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/startpage.png")}
      style={styles.background}
      blurRadius={3}
    >
      <ExpoLinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(255,255,255,0.1)', 'rgba(0,0,0,0.4)']}
        style={styles.gradientOverlay}
      >
        <Animated.View 
          style={[
            styles.overlay,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
        <Image
          source={require("../assets/images/logo.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Explore Northeast India</Text>
        <Text style={styles.subtitle}>
          Your trusted companion for discovering the seven sisters and their cultural treasures
        </Text>
        
        <View style={styles.featuresContainer}>
          <Animated.View style={[styles.featureItem, { transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureEmoji}>🏔️</Text>
            </View>
            <Text style={styles.featureText}>Sacred Mountains</Text>
            <Text style={styles.featureSubtext}>Tawang • Dzukou</Text>
          </Animated.View>
          <Animated.View style={[styles.featureItem, { transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureEmoji}>🎭</Text>
            </View>
            <Text style={styles.featureText}>Tribal Culture</Text>
            <Text style={styles.featureSubtext}>200+ Tribes</Text>
          </Animated.View>
          <Animated.View style={[styles.featureItem, { transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureEmoji}>🌿</Text>
            </View>
            <Text style={styles.featureText}>Living Bridges</Text>
            <Text style={styles.featureSubtext}>Root Bridges</Text>
          </Animated.View>
        </View>

        {/* Statistics Section */}
        <Animated.View 
          style={[
            styles.statsContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>States</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>200+</Text>
            <Text style={styles.statLabel}>Tribes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>220</Text>
            <Text style={styles.statLabel}>Languages</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>70%</Text>
            <Text style={styles.statLabel}>Forest Cover</Text>
          </View>
        </Animated.View>

        <Animated.View 
          style={[
            styles.buttonContainer,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
          ]}
        >
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/registration")}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Begin Your Journey</Text>
            <Text style={styles.buttonSubtext}>✨ Start exploring now</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/(tabs)/explore")}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryButtonText}>Quick Preview</Text>
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.disclaimerContainer,
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.disclaimer}>
            🛡️ Complete with ILP guidance • Cultural sensitivity • Multilingual support
          </Text>
          <Text style={styles.versionText}>Trusted by 10,000+ travelers</Text>
        </Animated.View>
        </Animated.View>
      </ExpoLinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  gradientOverlay: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 220,
    height: 70,
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 12,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 20,
    fontWeight: '500',
    textShadowColor: 'rgba(255, 255, 255, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  featureItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    minWidth: 85,
  },
  featureIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureEmoji: {
    fontSize: 20,
  },
  featureText: {
    fontSize: 13,
    color: '#1F2937',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 2,
  },
  featureSubtext: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  // Statistics Section
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    marginBottom: 25,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
    textAlign: 'center',
  },
  // Button Styles
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: "#059669",
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 12,
    minWidth: 280,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  buttonSubtext: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 12,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#059669',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  secondaryButtonText: {
    color: "#059669",
    fontSize: 14,
    fontWeight: "600",
  },
  // Disclaimer Styles
  disclaimerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  disclaimer: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.95)",
    textAlign: "center",
    paddingHorizontal: 30,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 4,
  },
  versionText: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    fontWeight: '500',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
