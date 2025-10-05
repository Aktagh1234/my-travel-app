// API Configuration - Mobile app communicates only with backend
const getBaseURL = () => {
  // Use environment variable if set
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  
  // For web development, try localhost first
  if (typeof window !== 'undefined') {
    return 'http://localhost:3000';
  }
  
  // For mobile, use network IP
  return 'http://192.168.1.3:3000';
};

const API_CONFIG = {
  BASE_URL: getBaseURL(),
  ENDPOINTS: {
    // Authentication
    REGISTER: '/api/auth/register',
    VERIFY_OTP: '/api/auth/verify-otp',
    RESEND_OTP: '/api/auth/resend-otp',
    
    // KYC & Tourist Management
    KYC_VERIFY: '/api/kyc/verify',
    TOURIST_PROFILE: '/api/kyc', // GET /api/kyc/:dtid
    
    // Emergency & Safety
    EMERGENCY_ALERT: '/api/emergency/alert',
    SAFETY_STATUS: '/api/safety/status',
  }
};

export default API_CONFIG;