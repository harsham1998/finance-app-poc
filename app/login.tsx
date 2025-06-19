"use client";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const router = useRouter();

  const handleContinue = () => {
    if (phone.length === 10) {
      setStep('otp');
    } else {
      Alert.alert('Error', 'Enter valid 10-digit phone number');
    }
  };

  const handleLogin = () => {
    if (otp === '1234') {
      router.push('/dashboard');
    } else {
      Alert.alert('Error', 'Invalid OTP');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#fff', minHeight: '100%' }}>
      <View style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>
      <Text style={styles.subtitle}>Sign in with your phone number</Text>
      {step === 'phone' ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            placeholderTextColor="#555"
            keyboardType="number-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP (1234)"
            placeholderTextColor="#555"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
    </ScrollView>);
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 30, color: '#666' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#1d4ed8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
