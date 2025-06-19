"use client";
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Dashboard() {
  const router = useRouter();
const categories = [
  { label: 'Flights', route: '/flights' },
  { label: 'Hotels' },
  { label: 'Groceries' },
  { label: 'Credit Cards' },
  { label: 'Electronics' },
  { label: 'Financial Planning', route: '/finance' }, // updated here
];


  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "#ffffff", minHeight: "100%" }}>
      <Text style={styles.heading}>What are you looking for today?</Text>
      <TextInput placeholder="Search anything..." style={styles.search} />
      <View style={styles.grid}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.label}
            onPress={() => item.route && router.push(item.route)}
            style={styles.card}
          >
            <Text style={styles.cardText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 22, fontWeight: '600', marginBottom: 10 },
  search: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: {
    width: '47%',
    backgroundColor: '#e0f2fe',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: { fontSize: 16, fontWeight: '600' },
});
