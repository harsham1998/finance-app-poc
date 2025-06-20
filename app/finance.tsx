import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  { name: 'Rent', icon: 'home-outline' },
  { name: 'Groceries', icon: 'cart-outline' },
  { name: 'Utilities', icon: 'lightning-bolt-outline' },
  { name: 'Fuel', icon: 'gas-station-outline' },
  { name: 'Dining', icon: 'silverware-fork-knife' },
  { name: 'Shopping', icon: 'shopping-outline' },
  { name: 'EMI', icon: 'credit-card-outline' },
  { name: 'UPI Transfers', icon: 'bank-transfer' },
];

type DealResult = {
  category: string;
  amount: number;
  saving: number;
  percent: number;
  icon: string;
};

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<{ [key: string]: number }>({});
  const [results, setResults] = useState<DealResult[]>([]);

  const handleInput = (category: string, value: string) => {
    setExpenses(prev => ({ ...prev, [category]: parseFloat(value) || 0 }));
  };

  const findDeals = () => {
    const deals = Object.entries(expenses)
      .filter(([_, amount]) => amount > 0)
      .map(([category, amount]) => {
        let percent = 0;
        if (category === 'Groceries') percent = 0.15;
        else if (category === 'Dining') percent = 0.10;
        else if (category === 'Fuel') percent = 0.08;
        else if (category === 'Shopping') percent = 0.12;
        else if (category === 'Utilities') percent = 0.05;
        else if (category === 'UPI Transfers') percent = 0.02;
        else if (category === 'EMI') percent = 0.01;
        else if (category === 'Rent') percent = 0.00;
        else percent = 0.01;

        const categoryData = categories.find(cat => cat.name === category);

        return {
          category,
          amount,
          saving: Math.round(Number(amount) * percent),
          percent: percent * 100,
          icon: categoryData?.icon || 'cash-outline',
        };
      });
    setResults(deals);
  };

  const totalSavings = results.reduce((sum, result) => sum + result.saving, 0);
  const totalSpent = results.reduce((sum, result) => sum + result.amount, 0);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <SafeAreaView style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
          {/* Main Title */}
          <Text style={styles.mainTitle}>Smart Finance{'\n'}Deal Optimizer</Text>
          
          {/* Subtitle */}
          <Text style={styles.subtitle}>Track your expenses and discover the best deals</Text>

          {/* Input Section */}
          <View style={styles.inputSection}>
            <Text style={styles.sectionTitle}>Monthly Expenses</Text>
            
            {categories.map((cat, index) => (
              <View key={index} style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                  <MaterialCommunityIcons name={cat.icon as any} size={20} color="#fbbf24" />
                </View>
                <View style={styles.inputContent}>
                  <Text style={styles.inputLabel}>{cat.name}</Text>
                  <TextInput
                    placeholder="₹ 0"
                    placeholderTextColor="#64748b"
                    keyboardType="numeric"
                    onChangeText={(val) => handleInput(cat.name, val)}
                    style={styles.input}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Find Deals Button */}
          <TouchableOpacity style={styles.findDealsButton} onPress={findDeals}>
            <MaterialCommunityIcons name="magnify" size={20} color="#1f2937" />
            <Text style={styles.findDealsText}>Find Best Deals</Text>
            <MaterialCommunityIcons name="arrow-right" size={20} color="#1f2937" />
          </TouchableOpacity>

          {/* Results Section */}
          {results.length > 0 && (
            <View style={styles.resultsSection}>
              
              {/* Summary Card */}
              <View style={styles.summaryCard}>
                <View style={styles.summaryHeader}>
                  <MaterialCommunityIcons name="chart-line" size={24} color="#fbbf24" />
                  <Text style={styles.summaryTitle}>Savings Summary</Text>
                </View>
                <View style={styles.summaryContent}>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Total Spent</Text>
                    <Text style={styles.summaryAmount}>₹{totalSpent.toLocaleString()}</Text>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Potential Savings</Text>
                    <Text style={styles.savingsAmount}>₹{totalSavings.toLocaleString()}</Text>
                  </View>
                </View>
              </View>

              {/* Deal Cards */}
              <Text style={styles.sectionTitle}>Available Deals</Text>
              
              {results.map((result, index) => (
                <View key={index} style={styles.dealCard}>
                  <View style={styles.dealHeader}>
                    <View style={styles.dealIconContainer}>
                      <MaterialCommunityIcons name={result.icon as any} size={24} color="#fbbf24" />
                    </View>
                    <View style={styles.dealInfo}>
                      <Text style={styles.dealCategory}>{result.category}</Text>
                      <Text style={styles.dealSpent}>Monthly: ₹{result.amount.toLocaleString()}</Text>
                    </View>
                    <TouchableOpacity style={styles.dealActionButton}>
                      <MaterialCommunityIcons name="arrow-top-right" size={18} color="#1f2937" />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.dealSavings}>
                    <View style={styles.savingsBadge}>
                      <MaterialCommunityIcons name="tag" size={12} color="#22c55e" />
                      <Text style={styles.savingsBadgeText}>Save {result.percent}%</Text>
                    </View>
                    <Text style={styles.dealSavingAmount}>₹{result.saving.toLocaleString()} potential savings</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
          
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#0f172a'
  },
  container: {
    padding: 20,
    paddingTop: 20
  },
  mainTitle: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 40,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 30,
    lineHeight: 24
  },
  inputSection: {
    marginBottom: 30
  },
  sectionTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155'
  },
  inputIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  inputContent: {
    flex: 1
  },
  inputLabel: {
    fontSize: 14,
    color: '#e2e8f0',
    fontWeight: '500',
    marginBottom: 4
  },
  input: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    padding: 0
  },
  findDealsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fbbf24',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 30,
    gap: 8
  },
  findDealsText: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: '700'
  },
  resultsSection: {
    marginTop: 10
  },
  summaryCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155'
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8
  },
  summaryTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600'
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center'
  },
  summaryLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4
  },
  summaryAmount: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700'
  },
  savingsAmount: {
    fontSize: 20,
    color: '#22c55e',
    fontWeight: '700'
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#334155',
    marginHorizontal: 16
  },
  dealCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155'
  },
  dealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  dealIconContainer: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  dealInfo: {
    flex: 1
  },
  dealCategory: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 2
  },
  dealSpent: {
    fontSize: 14,
    color: '#94a3b8'
  },
  dealActionButton: {
    backgroundColor: '#fbbf24',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dealSavings: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  savingsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4
  },
  savingsBadgeText: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '600'
  },
  dealSavingAmount: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '600'
  }
});