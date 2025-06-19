import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const categories = [
  'Rent', 'Groceries', 'Utilities', 'Fuel', 'Dining', 'Shopping', 'EMI', 'UPI Transfers',
];

export default function HomeScreen() {
  const [expenses, setExpenses] = useState({});
  const [results, setResults] = useState([]);

  const handleInput = (category: string, value: string) => {
    setExpenses(prev => ({ ...prev, [category]: parseFloat(value) || 0 }));
  };

  const findDeals = () => {
    const deals = Object.entries(expenses).map(([category, amount]) => {
      let percent = 0;
      if (category === 'Groceries') percent = 0.15;
      else if (category === 'Dining') percent = 0.10;
      else if (category === 'Fuel') percent = 0.08;
      else if (category === 'Rent') percent = 0.00;
      else percent = 0.01;

      return {
        category,
        amount,
        saving: Math.round(amount * percent),
        percent: percent * 100,
      };
    });
    setResults(deals);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "#ffffff", minHeight: "100%" }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        💰 Finance & Deal Optimizer
      </Text>
      {categories.map(cat => (
        <TextInput
          key={cat}
          placeholder={`Enter ${cat} amount`}
          placeholderTextColor="#555"
          keyboardType="numeric"
          onChangeText={(val) => handleInput(cat, val)}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        />
      ))}
      <TouchableOpacity
        onPress={findDeals}
        style={{
          backgroundColor: '#2563eb',
          padding: 15,
          borderRadius: 5,
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Find Best Deals</Text>
      </TouchableOpacity>

      {results.length > 0 && (
        <View style={{ marginTop: 20 }}>
          {results.map(({ category, amount, saving, percent }) => (
            <View
              key={category}
              style={{
                borderWidth: 1,
                borderColor: '#e5e7eb',
                borderRadius: 8,
                padding: 12,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>{category}</Text>
              <Text>Spent: ₹{amount}</Text>
              <Text style={{ color: 'green', marginTop: 4 }}>
                Savings: ₹{saving} ({percent}%)
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
