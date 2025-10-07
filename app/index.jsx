import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width, height } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  


  useEffect(() => {
    // Main entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
      }),
    ]).start();




  }, []);





  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={require("../assets/images/startpage.png")}
        style={styles.background}
        blurRadius={4}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(255,255,255,0.05)', 'rgba(0,0,0,0.5)']}
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
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/images/logo.jpg")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Hero Section */}
            <View style={styles.heroSection}>
              <Text style={styles.title}>Discover Northeast India</Text>
              <Text style={styles.subtitle}>
                Your complete cultural & safety companion for exploring the mystical seven sisters
              </Text>
              <Text style={styles.tagline}>
                🏔️ Sacred peaks • 🎭 Rich traditions • 🌿 Living heritage
              </Text>
            </View>

            {/* Call-to-Action Buttons */}
            <Animated.View 
              style={[
                styles.ctaContainer,
                { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
              ]}
            >
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.push("/registration")}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#059669', '#10B981']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.primaryButtonText}>Begin Your Journey</Text>
                  <Text style={styles.buttonSubtext}>✨ Start exploring Northeast India</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </>
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
    paddingTop: 60,
  },
  
  // Logo & Hero Section Styles
  logoContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  logo: {
    width: 300,
    height: 100,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 38,
    fontWeight: "900",
    color: "#000000",
    textAlign: "center",
    marginBottom: 12,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 24,
    paddingHorizontal: 20,
    fontWeight: '500',
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tagline: {
    fontSize: 14,
    color: "#000000",
    textAlign: "center",
    fontWeight: '600',
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },



  // Call-to-Action Buttons
  ctaContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  primaryButton: {
    borderRadius: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    marginBottom: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    alignItems: 'center',
    minWidth: width * 0.8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  buttonSubtext: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 13,
    fontWeight: '500',
  },

});
