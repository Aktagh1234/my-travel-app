import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Supported languages for Northeast India
const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'kha', name: 'Khasi', nativeName: 'Ka Ktien Khasi' },
  { code: 'grt', name: 'Garo', nativeName: 'A·chik' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্' },
  { code: 'lus', name: 'Mizo', nativeName: 'Mizo ṭawng' },
  { code: 'nag', name: 'Nagamese', nativeName: 'Nagamese' },
  { code: 'kok', name: 'Kokborok', nativeName: 'Kokborok' },
];

// Predefined responses for common queries
const CHATBOT_RESPONSES = {
  en: {
    greeting: "Hello! I'm your Northeast India travel assistant. How can I help you today?",
    permits: "For Northeast India travel, you'll need:\n• Inner Line Permit (ILP) for Arunachal Pradesh, Nagaland, Mizoram\n• Restricted Area Permit (RAP) for some border areas\n• Special permits for tribal areas\n\nWould you like specific information about any state?",
    weather: "Northeast India has varied weather:\n• Monsoon: June-September (heavy rainfall)\n• Winter: October-February (best time to visit)\n• Summer: March-May (hot and humid)\n\nWhich season are you planning to visit?",
    culture: "Northeast India is incredibly diverse with:\n• 200+ tribes and ethnic groups\n• Unique festivals like Hornbill, Bihu, Cheiraoba\n• Traditional crafts, music, and dance\n• Sacred groves and monasteries\n\nWhat cultural aspect interests you most?",
    food: "Northeast cuisine features:\n• Rice as staple food\n• Fermented foods and bamboo shoots\n• Smoked meats and fish\n• Minimal use of oil and spices\n• Unique tribal delicacies\n\nTry: Jadoh (Khasi), Eromba (Manipuri), Bamboo shoot curry, Fish with black sesame\n\nWould you like restaurant recommendations?",
    safety: "Safety guidelines for Northeast India:\n• Always carry valid permits and ID\n• Respect tribal customs and photography rules\n• Travel in groups in remote areas\n• Monitor weather and road conditions\n• Keep emergency contacts handy\n• Inform local authorities of travel plans\n• Carry cash as ATMs are limited\n• Respect sacred groves and monasteries",
    transport: "Transportation options:\n• Flights: Guwahati (hub), Imphal, Agartala, Dibrugarh\n• Trains: Limited to Assam, Tripura, some parts of Arunachal\n• Roads: NH-37, NH-15 major routes (check conditions)\n• Local: Shared taxis, buses, helicopter services\n• Ferries: Essential for Majuli Island\n• Border crossings: Dawki (Bangladesh), Moreh (Myanmar)",
    festivals: "Major Northeast festivals:\n• Hornbill Festival (Nagaland) - Dec 1-10\n• Bihu (Assam) - April, October, January\n• Cheiraoba (Manipur) - April\n• Chapchar Kut (Mizoram) - March\n• Nongkrem (Meghalaya) - November\n• Siang River Festival (Arunachal) - December\n• Kharchi Puja (Tripura) - July",
    accommodation: "Accommodation options:\n• Government guest houses (book in advance)\n• Homestays with tribal families\n• Budget hotels in major towns\n• Eco-lodges and bamboo cottages\n• Monastery stays (with permission)\n• Camping (in designated areas only)\n\nNote: Advance booking essential during festival seasons",
    emergency: "Emergency contacts for Northeast India:\n• Police: 100\n• Medical: 108\n• Tourist helpline: 1363\n• Forest Department: Contact local range office\n• District Collector offices for permit issues\n• Embassy contacts for foreign nationals\n• Keep local guide contact numbers handy",
    default: "I can help you with information about:\n• Travel permits and documentation\n• Weather and best travel times\n• Cultural guidelines and festivals\n• Local cuisine and restaurants\n• Safety tips and emergency contacts\n• Transportation and accommodation\n• Festival dates and celebrations\n• Tribal customs and etiquette\n\nWhat would you like to know?"
  },
  as: {
    greeting: "নমস্কাৰ! মই আপোনাৰ উত্তৰ-পূৰ্বাঞ্চলৰ ভ্ৰমণ সহায়ক। আজি মই আপোনাক কেনেকৈ সহায় কৰিব পাৰোঁ?",
    permits: "উত্তৰ-পূৰ্বাঞ্চলৰ ভ্ৰমণৰ বাবে প্ৰয়োজন:\n• অন্তৰ্ৱৰ্তী ৰেখা অনুমতি (ILP)\n• সীমাবদ্ধ এলেকা অনুমতি (RAP)\n• জনজাতীয় এলেকাৰ বিশেষ অনুমতি",
    weather: "উত্তৰ-পূৰ্বাঞ্চলৰ বতৰ:\n• বৰ্ষাকাল: জুন-ছেপ্টেম্বৰ\n• শীতকাল: অক্টোবৰ-ফেব্ৰুয়াৰী (ভ্ৰমণৰ উত্তম সময়)\n• গ্ৰীষ্মকাল: মাৰ্চ-মে'",
    default: "মই আপোনাক সহায় কৰিব পাৰোঁ বিভিন্ন বিষয়ত। কি জানিব বিচাৰে?"
  },
  hi: {
    greeting: "नमस्ते! मैं आपका पूर्वोत्तर भारत यात्रा सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    permits: "पूर्वोत्तर भारत यात्रा के लिए आवश्यक:\n• इनर लाइन परमिट (ILP)\n• प्रतिबंधित क्षेत्र परमिट (RAP)\n• जनजातीय क्षेत्रों की विशेष अनुमति",
    weather: "पूर्वोत्तर भारत का मौसम:\n• मानसून: जून-सितंबर\n• सर्दी: अक्टूबर-फरवरी (यात्रा का सबसे अच्छा समय)\n• गर्मी: मार्च-मई",
    default: "मैं आपकी मदद कर सकता हूं विभिन्न विषयों में। आप क्या जानना चाहते हैं?"
  }
};

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    // Initialize with greeting message
    const greeting = CHATBOT_RESPONSES[selectedLanguage]?.greeting || CHATBOT_RESPONSES.en.greeting;
    setMessages([{
      id: '1',
      text: greeting,
      isBot: true,
      timestamp: new Date().toLocaleTimeString(),
      language: selectedLanguage
    }]);
  }, [selectedLanguage]);

  const getResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    const responses = CHATBOT_RESPONSES[selectedLanguage] || CHATBOT_RESPONSES.en;
    
    if (lowerQuery.includes('permit') || lowerQuery.includes('ilp') || lowerQuery.includes('rap') || lowerQuery.includes('document')) {
      return responses.permits || responses.default;
    }
    if (lowerQuery.includes('weather') || lowerQuery.includes('climate') || lowerQuery.includes('season') || lowerQuery.includes('rain')) {
      return responses.weather || responses.default;
    }
    if (lowerQuery.includes('culture') || lowerQuery.includes('tribe') || lowerQuery.includes('custom')) {
      return responses.culture || responses.default;
    }
    if (lowerQuery.includes('festival') || lowerQuery.includes('hornbill') || lowerQuery.includes('bihu') || lowerQuery.includes('celebration')) {
      return responses.festivals || responses.default;
    }
    if (lowerQuery.includes('food') || lowerQuery.includes('cuisine') || lowerQuery.includes('restaurant') || lowerQuery.includes('eat')) {
      return responses.food || responses.default;
    }
    if (lowerQuery.includes('safety') || lowerQuery.includes('security') || lowerQuery.includes('safe')) {
      return responses.safety || responses.default;
    }
    if (lowerQuery.includes('emergency') || lowerQuery.includes('help') || lowerQuery.includes('contact') || lowerQuery.includes('police')) {
      return responses.emergency || responses.default;
    }
    if (lowerQuery.includes('transport') || lowerQuery.includes('travel') || lowerQuery.includes('flight') || lowerQuery.includes('bus') || lowerQuery.includes('train')) {
      return responses.transport || responses.default;
    }
    if (lowerQuery.includes('hotel') || lowerQuery.includes('stay') || lowerQuery.includes('accommodation') || lowerQuery.includes('homestay')) {
      return responses.accommodation || responses.default;
    }
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('namaste') || lowerQuery.includes('নমস্কাৰ')) {
      return responses.greeting;
    }
    
    return responses.default;
  };

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date().toLocaleTimeString(),
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputText),
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
        language: selectedLanguage
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const clearChat = () => {
    Alert.alert(
      'Clear Chat',
      'Are you sure you want to clear all messages?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            const greeting = CHATBOT_RESPONSES[selectedLanguage]?.greeting || CHATBOT_RESPONSES.en.greeting;
            setMessages([{
              id: '1',
              text: greeting,
              isBot: true,
              timestamp: new Date().toLocaleTimeString(),
              language: selectedLanguage
            }]);
          }
        }
      ]
    );
  };

  const changeLanguage = (langCode) => {
    setSelectedLanguage(langCode);
    setShowLanguageModal(false);
    
    // Add system message about language change
    const selectedLang = SUPPORTED_LANGUAGES.find(lang => lang.code === langCode);
    const systemMessage = {
      id: Date.now().toString(),
      text: `Language changed to ${selectedLang.nativeName} (${selectedLang.name})`,
      isBot: true,
      timestamp: new Date().toLocaleTimeString(),
      language: langCode,
      isSystem: true
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };

  const renderMessage = (message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isBot ? styles.botMessage : styles.userMessage,
        message.isSystem && styles.systemMessage
      ]}
    >
      {message.isBot && !message.isSystem && (
        <View style={styles.botAvatar}>
          <Ionicons name="chatbubble-ellipses" size={16} color="#4F46E5" />
        </View>
      )}
      
      <View style={[
        styles.messageBubble,
        message.isBot ? styles.botBubble : styles.userBubble,
        message.isSystem && styles.systemBubble
      ]}>
        <Text style={[
          styles.messageText,
          message.isBot ? styles.botText : styles.userText,
          message.isSystem && styles.systemText
        ]}>
          {message.text}
        </Text>
        <Text style={[
          styles.timestamp,
          message.isBot ? styles.botTimestamp : styles.userTimestamp
        ]}>
          {message.timestamp}
        </Text>
      </View>
    </View>
  );

  const quickActions = [
    { text: 'Travel Permits', icon: 'document-text-outline' },
    { text: 'Festival Dates', icon: 'calendar-outline' },
    { text: 'Tribal Customs', icon: 'people-outline' },
    { text: 'Emergency Help', icon: 'medical-outline' },
    { text: 'Local Food', icon: 'restaurant-outline' },
    { text: 'Transportation', icon: 'car-outline' },
    { text: 'Weather Info', icon: 'rainy-outline' },
    { text: 'Accommodation', icon: 'bed-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.botStatusIndicator}>
            <Ionicons name="radio-button-on" size={8} color="#10B981" />
          </View>
          <Text style={styles.headerTitle}>NE India Assistant</Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setShowLanguageModal(true)}
          >
            <Ionicons name="language" size={20} color="#4F46E5" />
            <Text style={styles.langCode}>
              {SUPPORTED_LANGUAGES.find(lang => lang.code === selectedLanguage)?.code.toUpperCase()}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={clearChat}
          >
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map(renderMessage)}
        
        {isTyping && (
          <View style={[styles.messageContainer, styles.botMessage]}>
            <View style={styles.botAvatar}>
              <Ionicons name="chatbubble-ellipses" size={16} color="#4F46E5" />
            </View>
            <View style={[styles.messageBubble, styles.botBubble, styles.typingBubble]}>
              <View style={styles.typingIndicator}>
                <View style={[styles.typingDot, styles.typingDot1]} />
                <View style={[styles.typingDot, styles.typingDot2]} />
                <View style={[styles.typingDot, styles.typingDot3]} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Quick Actions */}
      <ScrollView 
        horizontal 
        style={styles.quickActions}
        contentContainerStyle={styles.quickActionsContent}
        showsHorizontalScrollIndicator={false}
      >
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickActionButton}
            onPress={() => setInputText(action.text)}
          >
            <Ionicons name={action.icon} size={16} color="#4F46E5" />
            <Text style={styles.quickActionText}>{action.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder={`Ask me anything about Northeast India...`}
            placeholderTextColor="#9CA3AF"
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendButton, inputText.trim() === '' && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={inputText.trim() === ''}
          >
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.languageModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <Ionicons name="close-outline" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.languageList}>
              {SUPPORTED_LANGUAGES.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageOption,
                    selectedLanguage === language.code && styles.selectedLanguage
                  ]}
                  onPress={() => changeLanguage(language.code)}
                >
                  <View style={styles.languageInfo}>
                    <Text style={styles.languageName}>{language.name}</Text>
                    <Text style={styles.languageNative}>{language.nativeName}</Text>
                  </View>
                  {selectedLanguage === language.code && (
                    <Ionicons name="checkmark-circle" size={20} color="#4F46E5" />
                  )}
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
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botStatusIndicator: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
  },
  langCode: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F46E5',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  systemMessage: {
    justifyContent: 'center',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  botBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#4F46E5',
    borderBottomRightRadius: 4,
    marginLeft: 'auto',
  },
  systemBubble: {
    backgroundColor: '#F3F4F6',
    alignSelf: 'center',
    maxWidth: '60%',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  botText: {
    color: '#374151',
  },
  userText: {
    color: '#fff',
  },
  systemText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
  },
  botTimestamp: {
    color: '#9CA3AF',
  },
  userTimestamp: {
    color: '#C7D2FE',
    textAlign: 'right',
  },
  typingBubble: {
    paddingVertical: 16,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  typingDot1: {
    animationDelay: '0ms',
  },
  typingDot2: {
    animationDelay: '200ms',
  },
  typingDot3: {
    animationDelay: '400ms',
  },
  quickActions: {
    maxHeight: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  quickActionsContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  quickActionText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: '#F9FAFB',
  },
  sendButton: {
    backgroundColor: '#4F46E5',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  languageModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  languageList: {
    paddingHorizontal: 20,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  selectedLanguage: {
    backgroundColor: '#EEF2FF',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  languageNative: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});