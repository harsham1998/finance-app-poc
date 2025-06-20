"use client";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const categories = [
    {
      label: 'Flights',
      route: '/flights',
      icon: 'airplane',
      gradient: ['#3b82f6', '#1d4ed8'],
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
    },
    {
      label: 'Hotels',
      route: '/hotels',
      icon: 'bed',
      gradient: ['#ef4444', '#dc2626'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    },
    {
      label: 'Groceries',
      icon: 'cart',
      gradient: ['#10b981', '#059669'],
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
    },
    {
      label: 'Credit Cards',
      icon: 'credit-card',
      gradient: ['#8b5cf6', '#7c3aed'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    },
    {
      label: 'Electronics',
      icon: 'laptop',
      gradient: ['#f59e0b', '#d97706'],
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    },
    {
      label: 'Financial Planning',
      route: '/finance',
      icon: 'chart-line',
      gradient: ['#06b6d4', '#0891b2'],
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    },
  ];

  const filteredCategories = categories.filter(category =>
    category.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <SafeAreaView style={styles.wrapper}>
        <ScrollView 
          contentContainerStyle={styles.container} 
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Good Morning 👋</Text>
            <Text style={styles.title}>What are you{'\n'}looking for today?</Text>
          </View>

          {/* Search Section */}
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <MaterialCommunityIcons name="magnify" size={20} color="#94a3b8" style={styles.searchIcon} />
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search anything..."
                placeholderTextColor="#94a3b8"
                style={styles.searchInput}
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText('')}>
                  <MaterialCommunityIcons name="close" size={20} color="#94a3b8" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="trending-up" size={24} color="#fbbf24" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Active Searches</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="heart" size={24} color="#ef4444" />
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Saved Items</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="star" size={24} color="#8b5cf6" />
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>

          {/* Categories Grid */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.grid}>
            {filteredCategories.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => item.route && router.push(item.route as any)}
                style={[
                  styles.card,
                  index % 2 === 0 ? styles.cardLeft : styles.cardRight,
                  index < 2 ? styles.cardLarge : styles.cardSmall
                ]}
                activeOpacity={0.8}
              >
                <ImageBackground
                  source={{ uri: item.image }}
                  style={styles.cardImage}
                  imageStyle={styles.cardImageStyle}
                >
                  <View style={styles.cardOverlay}>
                    <View style={styles.cardHeader}>
                      <View style={[styles.iconContainer, { backgroundColor: item.gradient[0] }]}>
                        <MaterialCommunityIcons 
                          name={item.icon as any} 
                          size={20} 
                          color="#fff" 
                        />
                      </View>
                      {item.route && (
                        <TouchableOpacity style={styles.cardArrow}>
                          <MaterialCommunityIcons 
                            name="arrow-top-right" 
                            size={16} 
                            color="#1f2937" 
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                    
                    <View style={styles.cardContent}>
                      <Text style={styles.cardText}>{item.label}</Text>
                      <View style={styles.cardBadge}>
                        <Text style={styles.cardBadgeText}>Explore</Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>

          {/* Featured Section */}
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured Deals</Text>
            <View style={styles.featuredCard}>
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80' }}
                style={styles.featuredImage}
                imageStyle={styles.featuredImageStyle}
              >
                <View style={styles.featuredOverlay}>
                  <View style={styles.featuredBadge}>
                    <MaterialCommunityIcons name="fire" size={16} color="#fff" />
                    <Text style={styles.featuredBadgeText}>Hot Deal</Text>
                  </View>
                  <Text style={styles.featuredTitle}>Summer Vacation</Text>
                  <Text style={styles.featuredSubtitle}>Up to 50% off on flights & hotels</Text>
                  <TouchableOpacity style={styles.featuredButton}>
                    <Text style={styles.featuredButtonText}>Explore Now</Text>
                    <MaterialCommunityIcons name="arrow-right" size={16} color="#1f2937" />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </View>
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
    paddingTop: 10,
  },
  header: {
    marginBottom: 25,
  },
  greeting: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '500',
    marginBottom: 5,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 40,
  },
  searchSection: {
    marginBottom: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a5568',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  seeAllText: {
    fontSize: 14,
    color: '#fbbf24',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardLeft: {
    marginRight: 8,
  },
  cardRight: {
    marginLeft: 8,
  },
  cardLarge: {
    width: (width - 56) / 2,
    height: 200,
  },
  cardSmall: {
    width: (width - 56) / 2,
    height: 160,
  },
  cardImage: {
    flex: 1,
  },
  cardImageStyle: {
    borderRadius: 20,
  },
  cardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 16,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardArrow: {
    backgroundColor: '#fbbf24',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardBadge: {
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  cardBadgeText: {
    color: '#fbbf24',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredSection: {
    marginBottom: 20,
  },
  featuredCard: {
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 15,
  },
  featuredImage: {
    flex: 1,
  },
  featuredImageStyle: {
    borderRadius: 20,
  },
  featuredOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    justifyContent: 'space-between',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
    gap: 4,
  },
  featuredBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#e2e8f0',
    marginBottom: 15,
  },
  featuredButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fbbf24',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 6,
  },
  featuredButtonText: {
    color: '#1f2937',
    fontSize: 14,
    fontWeight: '600',
  },
});