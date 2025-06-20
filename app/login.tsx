"use client";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    if (phone.length === 10) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setStep('otp');
        setIsLoading(false);
      }, 1500);
    } else {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number');
    }
  };

  const handleLogin = async () => {
    if (otp === '1234') {
      setIsLoading(true);
      // Simulate login
      setTimeout(() => {
        setIsLoading(false);
        router.push('/dashboard');
      }, 1000);
    } else {
      Alert.alert('Invalid OTP', 'Please enter the correct OTP');
    }
  };

  const handleResendOTP = () => {
    Alert.alert('OTP Sent', 'A new OTP has been sent to your phone');
  };

  const formatPhoneNumber = (text: string) => {
    // Remove all non-digit characters
    const digits = text.replace(/\D/g, '');
    // Limit to 10 digits
    const limited = digits.slice(0, 10);
    // Format as XXX XXX XXXX
    if (limited.length >= 6) {
      return `${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6)}`;
    } else if (limited.length >= 3) {
      return `${limited.slice(0, 3)} ${limited.slice(3)}`;
    }
    return limited;
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhone(formatted.replace(/\s/g, '')); // Store without spaces
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <SafeAreaView style={styles.wrapper}>
        <KeyboardAvoidingView
          style={styles.wrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            
            {/* Header Section */}
            <View style={styles.headerSection}>
              <View style={styles.logoContainer}>
                <MaterialCommunityIcons name="shield-check" size={48} color="#fbbf24" />
              </View>
              <Text style={styles.title}>Hi Groovo !!</Text>
              <Text style={styles.subtitle}>
                {step === 'phone' 
                  ? 'Enter your phone number to get started' 
                  : `We've sent a verification code to ${formatPhoneNumber(phone)}`
                }
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              
              {step === 'phone' ? (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Phone Number</Text>
                  <View style={styles.phoneInputWrapper}>
                    <View style={styles.countryCode}>
                      <MaterialCommunityIcons name="flag" size={20} color="#fbbf24" />
                      <Text style={styles.countryCodeText}>+91</Text>
                    </View>
                    <TextInput
                      style={styles.phoneInput}
                      placeholder="Enter phone number"
                      placeholderTextColor="#64748b"
                      keyboardType="number-pad"
                      value={formatPhoneNumber(phone)}
                      onChangeText={handlePhoneChange}
                      maxLength={13} // Formatted length
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Verification Code</Text>
                  <View style={styles.otpInputWrapper}>
                    <MaterialCommunityIcons name="message-text" size={20} color="#fbbf24" style={styles.inputIcon} />
                    <TextInput
                      style={styles.otpInput}
                      placeholder="Enter 4-digit OTP"
                      placeholderTextColor="#64748b"
                      keyboardType="number-pad"
                      value={otp}
                      onChangeText={setOtp}
                      maxLength={4}
                      textAlign="center"
                    />
                  </View>
                  
                  {/* Resend OTP */}
                  <TouchableOpacity style={styles.resendButton} onPress={handleResendOTP}>
                    <Text style={styles.resendText}>Didn't receive code? </Text>
                    <Text style={styles.resendLink}>Resend OTP</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Action Button */}
              <TouchableOpacity 
                style={[styles.button, (isLoading || (step === 'phone' && phone.length !== 10) || (step === 'otp' && otp.length !== 4)) && styles.buttonDisabled]} 
                onPress={step === 'phone' ? handleContinue : handleLogin}
                disabled={isLoading || (step === 'phone' && phone.length !== 10) || (step === 'otp' && otp.length !== 4)}
              >
                {isLoading && <MaterialCommunityIcons name="loading" size={20} color="#1f2937" style={styles.loadingIcon} />}
                <Text style={styles.buttonText}>
                  {isLoading 
                    ? (step === 'phone' ? 'Sending OTP...' : 'Verifying...') 
                    : (step === 'phone' ? 'Send OTP' : 'Verify & Login')
                  }
                </Text>
                {!isLoading && <MaterialCommunityIcons name="arrow-right" size={20} color="#1f2937" />}
              </TouchableOpacity>

              {/* Back Button for OTP step */}
              {step === 'otp' && (
                <TouchableOpacity 
                  style={styles.backButton} 
                  onPress={() => setStep('phone')}
                >
                  <MaterialCommunityIcons name="arrow-left" size={20} color="#94a3b8" />
                  <Text style={styles.backButtonText}>Change Phone Number</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Security Note */}
            <View style={styles.securityNote}>
              <MaterialCommunityIcons name="information-outline" size={16} color="#64748b" />
              <Text style={styles.securityText}>
                Your phone number is protected with end-to-end encryption
              </Text>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 12,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  formSection: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  countryCodeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  otpInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  otpInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
    paddingVertical: 16,
    letterSpacing: 8,
  },
  resendButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  resendLink: {
    color: '#fbbf24',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#fbbf24',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#374151',
    opacity: 0.6,
  },
  buttonText: {
    color: '#1f2937',
    fontWeight: '700',
    fontSize: 16,
  },
  loadingIcon: {
    // Add rotation animation if needed
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  backButtonText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  securityText: {
    color: '#64748b',
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
  },
});