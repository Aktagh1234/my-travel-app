// API Configuration - Mobile app communicates only with backend
const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.5:3000',
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