"use client";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const DESTINATIONS = [
  { name: "Manarola", country: "Italy", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80" },
  { name: "Tokyo", country: "Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2088&q=80" },
  { name: "Paris", country: "France", image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" },
  { name: "Bali", country: "Indonesia", image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" },
  { name: "Santorini", country: "Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80" },
  { name: "Dubai", country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" },
  { name: "New York", country: "USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" },
  { name: "London", country: "UK", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" }
];

const AIRPORTS = [
  "DEL - Delhi",
  "BOM - Mumbai", 
  "BLR - Bangalore",
  "HYD - Hyderabad",
  "MAA - Chennai",
  "CCU - Kolkata",
];

export default function Flights() {
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(new Date(2024, 5, 15));
  const [endDate, setEndDate] = useState<Date | null>(new Date(2024, 5, 22));
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [passengers, setPassengers] = useState(2);
  const [showPersonsDropdown, setShowPersonsDropdown] = useState(false);
  type Destination = { name: string; country: string; image: string };
  const [searchSuggestions, setSearchSuggestions] = useState<Destination[]>([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const personOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  const filterDestinations = (text: string) => {
    if (!text.trim()) {
      setSearchSuggestions([]);
      setShowSearchSuggestions(false);
      return;
    }
    
    const filtered = DESTINATIONS.filter(dest => 
      dest.name.toLowerCase().includes(text.toLowerCase()) ||
      dest.country.toLowerCase().includes(text.toLowerCase())
    );
    setSearchSuggestions(filtered);
    setShowSearchSuggestions(true);
  };

  const formatDateRange = () => {
    if (startDate && endDate) {
      const startDay = startDate.getDate();
      const endDay = endDate.getDate();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[startDate.getMonth()];
      return `${startDay}-${endDay} ${month}`;
    }
    return 'Select Dates';
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <SafeAreaView style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

          {/* Main Title */}
          <Text style={styles.mainTitle}>Find Pace in{'\n'}Every Journey</Text>

          {/* Search Bar */}
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <MaterialCommunityIcons name="magnify" size={20} color="#94a3b8" style={styles.searchIcon} />
              <TextInput
                value={searchText}
                onChangeText={(text) => {
                  setSearchText(text);
                  filterDestinations(text);
                }}
                placeholder="Search Your Destination"
                placeholderTextColor="#94a3b8"
                style={styles.searchInput}
                onFocus={() => {
                  if (searchText.trim()) {
                    filterDestinations(searchText);
                  }
                }}
              />
            </View>
            
            {showSearchSuggestions && searchSuggestions.length > 0 && (
              <View style={styles.suggestionsContainer}>
                {searchSuggestions.map((destination, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionItem}
                    onPress={() => {
                      setSearchText(`${destination.name}, ${destination.country}`);
                      setShowSearchSuggestions(false);
                    }}
                  >
                    <MaterialCommunityIcons name="map-marker" size={16} color="#fbbf24" />
                    <Text style={styles.suggestionText}>{destination.name}, {destination.country}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Filter Tags */}
          <View style={styles.filterContainer}>
            {/* Start Date */}
            <TouchableOpacity 
              style={[styles.filterTag, styles.activeTag]}
              onPress={() => setStartPickerVisible(true)}
            >
              <MaterialCommunityIcons name="calendar" size={18} color="#1f2937" />
              <Text style={styles.activeTagText}>
                {startDate ? `${startDate.getDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][startDate.getMonth()]}` : 'Start'}
              </Text>
            </TouchableOpacity>

            {/* End Date */}
            <TouchableOpacity 
              style={styles.filterTag}
              onPress={() => setEndPickerVisible(true)}
            >
              <MaterialCommunityIcons name="calendar" size={18} color="#fff" />
              <Text style={styles.filterTagText}>
                {endDate ? `${endDate.getDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][endDate.getMonth()]}` : 'End'}
              </Text>
            </TouchableOpacity>

            {/* Number of Persons Dropdown */}
            <View style={styles.dropdownContainer}>
              <TouchableOpacity 
                style={styles.filterTag}
                onPress={() => setShowPersonsDropdown(!showPersonsDropdown)}
              >
                <MaterialCommunityIcons name="account-multiple" size={18} color="#fff" />
                <Text style={styles.filterTagText}>{passengers} Person{passengers > 1 ? 's' : ''}</Text>
                <MaterialCommunityIcons name="chevron-down" size={16} color="#fff" />
              </TouchableOpacity>
              
              {showPersonsDropdown && (
                <View style={styles.dropdown}>
                  {personOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setPassengers(option);
                        setShowPersonsDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{option} Person{option > 1 ? 's' : ''}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Search Icon */}
            <TouchableOpacity style={styles.searchFilterButton}>
              <MaterialCommunityIcons name="magnify" size={20} color="#1f2937" />
            </TouchableOpacity>
          </View>

          {/* Destination Cards */}
          <View style={styles.destinationCard}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80' }}
              style={styles.cardImage}
              imageStyle={styles.cardImageStyle}
            >
              <View style={styles.cardOverlay}>
                <TouchableOpacity style={styles.heartButton}>
                  <MaterialCommunityIcons name="heart-outline" size={20} color="#fff" />
                </TouchableOpacity>
                
                <View style={styles.cardContent}>
                  <View style={styles.locationBadge}>
                    <MaterialCommunityIcons name="map-marker" size={12} color="#fbbf24" />
                    <Text style={styles.locationBadgeText}>Italy</Text>
                  </View>
                  <Text style={styles.destinationName}>Manarola</Text>
                </View>

                <TouchableOpacity style={styles.directionButton}>
                  <MaterialCommunityIcons name="arrow-top-right" size={20} color="#1f2937" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          {/* Second Destination Card */}
          <View style={styles.destinationCard}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2088&q=80' }}
              style={styles.cardImage}
              imageStyle={styles.cardImageStyle}
            >
              <View style={styles.cardOverlay}>
                <TouchableOpacity style={styles.heartButton}>
                  <MaterialCommunityIcons name="heart-outline" size={20} color="#fff" />
                </TouchableOpacity>
                
                <View style={styles.cardContent}>
                  <View style={styles.locationBadge}>
                    <MaterialCommunityIcons name="map-marker" size={12} color="#fbbf24" />
                    <Text style={styles.locationBadgeText}>Japan</Text>
                  </View>
                  <Text style={styles.destinationName}>Tokyo</Text>
                </View>

                <TouchableOpacity style={styles.directionButton}>
                  <MaterialCommunityIcons name="arrow-top-right" size={20} color="#1f2937" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          {/* Third Destination Card */}
          <View style={styles.destinationCard}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' }}
              style={styles.cardImage}
              imageStyle={styles.cardImageStyle}
            >
              <View style={styles.cardOverlay}>
                <TouchableOpacity style={styles.heartButton}>
                  <MaterialCommunityIcons name="heart-outline" size={20} color="#fff" />
                </TouchableOpacity>
                
                <View style={styles.cardContent}>
                  <View style={styles.locationBadge}>
                    <MaterialCommunityIcons name="map-marker" size={12} color="#fbbf24" />
                    <Text style={styles.locationBadgeText}>France</Text>
                  </View>
                  <Text style={styles.destinationName}>Paris</Text>
                </View>

                <TouchableOpacity style={styles.directionButton}>
                  <MaterialCommunityIcons name="arrow-top-right" size={20} color="#1f2937" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          {/* Date Pickers */}
          <DateTimePickerModal
            isVisible={isStartPickerVisible}
            mode="date"
            onConfirm={(date) => {
              setStartDate(date);
              setStartPickerVisible(false);
            }}
            onCancel={() => setStartPickerVisible(false)}
          />
          <DateTimePickerModal
            isVisible={isEndPickerVisible}
            mode="date"
            onConfirm={(date) => {
              setEndDate(date);
              setEndPickerVisible(false);
            }}
            onCancel={() => setEndPickerVisible(false)}
          />
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
    marginBottom: 30
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a5568',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: '#4a5568',
    borderRadius: 15,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#64748b'
  },
  suggestionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500'
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 30,
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  filterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a5568',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    gap: 4
  },
  activeTag: {
    backgroundColor: '#fbbf24'
  },
  filterTagText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500'
  },
  activeTagText: {
    color: '#1f2937',
    fontSize: 14,
    fontWeight: '600'
  },
  dropdownContainer: {
    position: 'relative'
  },
  dropdown: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: '#4a5568',
    borderRadius: 10,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#64748b'
  },
  dropdownItemText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500'
  },
  searchFilterButton: {
    backgroundColor: '#fbbf24',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchSection: {
    position: 'relative',
    marginBottom: 25
  },
  destinationCard: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 250,
    marginBottom: 20
  },
  cardImage: {
    flex: 1,
    justifyContent: 'space-between'
  },
  cardImageStyle: {
    borderRadius: 20
  },
  cardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    justifyContent: 'space-between'
  },
  heartButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 20
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: 10
  },
  locationBadgeText: {
    color: '#fbbf24',
    fontSize: 12,
    fontWeight: '600'
  },
  destinationName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold'
  },
  directionButton: {
    backgroundColor: '#fbbf24',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  }
});