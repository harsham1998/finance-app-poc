"use client";
import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Flights() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [budget, setBudget] = useState('');
  const [results, setResults] = useState([
    {
      Carrier: 'Air India',
      Date: '12 Aug 2025 - 16 Aug 2025',
      From: 'Hyderabad',
      To: 'Delhi',
      Cost: '23,221',
      link: 'https://www.google.com'
    }
  ]);

  const searchFlights = async () => {
    const url = `http://localhost:2000/api/getflights?From=${from}&To=${to}&Datestart=${start}&Dateend=${end}&Budget=${budget}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#fff' }}>
      <Text style={styles.header}>Search Flights</Text>
      <TextInput placeholder="From" placeholderTextColor="#555" style={styles.input} onChangeText={setFrom} />
      <TextInput placeholder="Destination" placeholderTextColor="#555"style={styles.input} onChangeText={setTo} />
      <TextInput placeholder="Start Date"placeholderTextColor="#555" style={styles.input} onChangeText={setStart} />
      <TextInput placeholder="End Date" placeholderTextColor="#555"style={styles.input} onChangeText={setEnd} />
      <TextInput placeholder="Budget" placeholderTextColor="#555" style={styles.input} keyboardType="numeric" onChangeText={setBudget} />

      <TouchableOpacity style={styles.button} onPress={searchFlights}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Search</Text>
      </TouchableOpacity>

      {results.length > 0 && results.map((item, idx) => (
        <View key={idx} style={styles.resultCard}>
          <Text style={{ fontWeight: 'bold' }}>✈️ {item.Carrier}</Text>
          <Text>📅 {item.Date}</Text>
          <Text>🧭 {item.From} → {item.To}</Text>
          <Text>💸 ₹{item.Cost}</Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => Linking.openURL(item.link || 'https://google.com')}
          >
            <Text style={{ color: 'white' }}>Go to Booking</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#1d4ed8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  resultCard: {
    backgroundColor: '#f1f5f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  linkButton: {
    marginTop: 10,
    backgroundColor: '#1d4ed8',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  }
});