"use client";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
    ImageBackground,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

type Deal = {
  id: number;
  hotelName: string;
  price: number;
  location: string;
  availableRooms: number;
  rating: number;
  image: string;
  amenities: string[];
};

const mockDeals: Deal[] = [
  {
    id: 1,
    hotelName: "Grand Palace",
    price: 120,
    location: "New York",
    availableRooms: 5,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant"]
  },
  {
    id: 2,
    hotelName: "Sea View Resort",
    price: 90,
    location: "Miami",
    availableRooms: 3,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    amenities: ["Beach Access", "WiFi", "Pool", "Bar"]
  },
  {
    id: 3,
    hotelName: "Mountain Inn",
    price: 110,
    location: "Denver",
    availableRooms: 4,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    amenities: ["Mountain View", "WiFi", "Fireplace", "Hiking"]
  },
];

const POPULAR_DESTINATIONS = [
  { name: "New York", country: "USA" },
  { name: "Miami", country: "USA" },
  { name: "Denver", country: "USA" },
  { name: "Paris", country: "France" },
  { name: "Tokyo", country: "Japan" },
  { name: "London", country: "UK" }
];

export default function Hotels() {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date(2024, 5, 15));
  const [endDate, setEndDate] = useState<Date | null>(new Date(2024, 5, 22));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [searched, setSearched] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<typeof POPULAR_DESTINATIONS>([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  const roomOptions = [1, 2, 3, 4, 5];

  const filterDestinations = (text: string) => {
    if (!text.trim()) {
      setSearchSuggestions([]);
      setShowSearchSuggestions(false);
      return;
    }
    
    const filtered = POPULAR_DESTINATIONS.filter(dest => 
      dest.name.toLowerCase().includes(text.toLowerCase()) ||
      dest.country.toLowerCase().includes(text.toLowerCase())
    );
    setSearchSuggestions(filtered);
    setShowSearchSuggestions(true);
  };

  const handleSearch = () => {
    const filtered = mockDeals.filter(
      (deal) =>
        deal.location.toLowerCase().includes(location.toLowerCase()) &&
        deal.availableRooms >= rooms
    );
    setDeals(filtered);
    setSearched(true);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select Date';
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    return `${day} ${month}`;
  };

  const calculateNights = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <SafeAreaView style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <Text style={styles.mainTitle}>Find Your Perfect{'\n'}Stay</Text>

          {/* Search Section */}
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <MaterialCommunityIcons name="map-marker" size={20} color="#94a3b8" style={styles.searchIcon} />
              <TextInput
                value={location}
                onChangeText={(text) => {
                  setLocation(text);
                  filterDestinations(text);
                }}
                placeholder="Where are you going?"
                placeholderTextColor="#94a3b8"
                style={styles.searchInput}
                onFocus={() => {
                  if (location.trim()) {
                    filterDestinations(location);
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
                      setLocation(`${destination.name}, ${destination.country}`);
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

          {/* Filter Section */}
          <View style={styles.filterContainer}>
            {/* Check-in Date */}
            <TouchableOpacity 
              style={[styles.filterTag, styles.activeTag]}
              onPress={() => setShowStartPicker(true)}
            >
              <MaterialCommunityIcons name="calendar-check" size={18} color="#1f2937" />
              <Text style={styles.activeTagText}>{formatDate(startDate)}</Text>
            </TouchableOpacity>

            {/* Check-out Date */}
            <TouchableOpacity 
              style={styles.filterTag}
              onPress={() => setShowEndPicker(true)}
            >
              <MaterialCommunityIcons name="calendar-remove" size={18} color="#fff" />
              <Text style={styles.filterTagText}>{formatDate(endDate)}</Text>
            </TouchableOpacity>

            {/* Guests Dropdown */}
            <View style={styles.dropdownContainer}>
              <TouchableOpacity 
                style={styles.filterTag}
                onPress={() => setShowGuestsDropdown(!showGuestsDropdown)}
              >
                <MaterialCommunityIcons name="account-multiple" size={18} color="#fff" />
                <Text style={styles.filterTagText}>{guests} Guest{guests > 1 ? 's' : ''}</Text>
                <MaterialCommunityIcons name="chevron-down" size={16} color="#fff" />
              </TouchableOpacity>
              
              {showGuestsDropdown && (
                <View style={styles.dropdown}>
                  {guestOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setGuests(option);
                        setShowGuestsDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{option} Guest{option > 1 ? 's' : ''}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Rooms Dropdown */}
            <View style={styles.dropdownContainer}>
              <TouchableOpacity 
                style={styles.filterTag}
                onPress={() => setShowRoomsDropdown(!showRoomsDropdown)}
              >
                <MaterialCommunityIcons name="bed" size={18} color="#fff" />
                <Text style={styles.filterTagText}>{rooms} Room{rooms > 1 ? 's' : ''}</Text>
                <MaterialCommunityIcons name="chevron-down" size={16} color="#fff" />
              </TouchableOpacity>
              
              {showRoomsDropdown && (
                <View style={styles.dropdown}>
                  {roomOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setRooms(option);
                        setShowRoomsDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{option} Room{option > 1 ? 's' : ''}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Search Button */}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <MaterialCommunityIcons name="magnify" size={20} color="#1f2937" />
            <Text style={styles.searchButtonText}>Search Hotels</Text>
          </TouchableOpacity>

          {/* Trip Summary */}
          {startDate && endDate && (
            <View style={styles.tripSummary}>
              <MaterialCommunityIcons name="information" size={16} color="#fbbf24" />
              <Text style={styles.tripSummaryText}>
                {calculateNights()} night{calculateNights() > 1 ? 's' : ''} • {guests} guest{guests > 1 ? 's' : ''} • {rooms} room{rooms > 1 ? 's' : ''}
              </Text>
            </View>
          )}

          {/* Results Section */}
          {searched && (
            <View style={styles.resultsSection}>
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsTitle}>
                  {deals.length > 0 ? `${deals.length} Hotels Found` : 'No Hotels Found'}
                </Text>
                {deals.length > 0 && (
                  <TouchableOpacity style={styles.filterButton}>
                    <MaterialCommunityIcons name="tune" size={16} color="#fbbf24" />
                    <Text style={styles.filterButtonText}>Filter</Text>
                  </TouchableOpacity>
                )}
              </View>

              {deals.length === 0 ? (
                <View style={styles.noResultsContainer}>
                  <MaterialCommunityIcons name="home-search" size={48} color="#64748b" />
                  <Text style={styles.noResultsTitle}>No hotels found</Text>
                  <Text style={styles.noResultsText}>Try adjusting your search criteria or explore different destinations</Text>
                </View>
              ) : (
                deals.map((deal) => (
                  <View key={deal.id} style={styles.hotelCard}>
                    <ImageBackground
                      source={{ uri: deal.image }}
                      style={styles.hotelImage}
                      imageStyle={styles.hotelImageStyle}
                    >
                      <View style={styles.hotelImageOverlay}>
                        <TouchableOpacity style={styles.heartButton}>
                          <MaterialCommunityIcons name="heart-outline" size={20} color="#fff" />
                        </TouchableOpacity>
                        <View style={styles.ratingBadge}>
                          <MaterialCommunityIcons name="star" size={12} color="#fbbf24" />
                          <Text style={styles.ratingText}>{deal.rating}</Text>
                        </View>
                      </View>
                    </ImageBackground>
                    
                    <View style={styles.hotelInfo}>
                      <View style={styles.hotelHeader}>
                        <Text style={styles.hotelName}>{deal.hotelName}</Text>
                        <View style={styles.priceContainer}>
                          <Text style={styles.priceAmount}>${deal.price}</Text>
                          <Text style={styles.priceLabel}>per night</Text>
                        </View>
                      </View>
                      
                      <View style={styles.locationRow}>
                        <MaterialCommunityIcons name="map-marker" size={14} color="#94a3b8" />
                        <Text style={styles.locationText}>{deal.location}</Text>
                      </View>
                      
                      <View style={styles.amenitiesRow}>
                        {deal.amenities.slice(0, 3).map((amenity, index) => (
                          <View key={index} style={styles.amenityBadge}>
                            <Text style={styles.amenityText}>{amenity}</Text>
                          </View>
                        ))}
                        {deal.amenities.length > 3 && (
                          <Text style={styles.moreAmenities}>+{deal.amenities.length - 3} more</Text>
                        )}
                      </View>
                      
                      <View style={styles.hotelFooter}>
                        <View style={styles.availabilityRow}>
                          <MaterialCommunityIcons name="bed" size={14} color="#10b981" />
                          <Text style={styles.availabilityText}>{deal.availableRooms} rooms available</Text>
                        </View>
                        
                        <TouchableOpacity style={styles.bookButton}>
                          <Text style={styles.bookButtonText}>Book Now</Text>
                          <MaterialCommunityIcons name="arrow-right" size={14} color="#1f2937" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))
              )}
            </View>
          )}

          {/* Date Pickers */}
          {showStartPicker && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(_, date) => {
                setShowStartPicker(false);
                if (date) setStartDate(date);
              }}
            />
          )}
          {showEndPicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(_, date) => {
                setShowEndPicker(false);
                if (date) setEndDate(date);
              }}
            />
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
    marginBottom: 30
  },
  searchSection: {
    position: 'relative',
    marginBottom: 25
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a5568',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15
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
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 25,
    alignItems: 'center',
    flexWrap: 'wrap'
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
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fbbf24',
    paddingVertical: 16,
    borderRadius: 25,
    gap: 8,
    marginBottom: 20
  },
  searchButtonText: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: '700'
  },
  tripSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    marginBottom: 25
  },
  tripSummaryText: {
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: '500'
  },
  resultsSection: {
    marginTop: 10
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  filterButtonText: {
    color: '#fbbf24',
    fontSize: 14,
    fontWeight: '600'
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8
  },
  noResultsText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20
  },
  hotelCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20
  },
  hotelImage: {
    height: 180,
    justifyContent: 'space-between',
    padding: 16
  },
  hotelImageStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  hotelImageOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  heartButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 20
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  hotelInfo: {
    padding: 20
  },
  hotelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1
  },
  priceContainer: {
    alignItems: 'flex-end'
  },
  priceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fbbf24'
  },
  priceLabel: {
    fontSize: 12,
    color: '#94a3b8'
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12
  },
  locationText: {
    color: '#94a3b8',
    fontSize: 14
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16
  },
  amenityBadge: {
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  amenityText: {
    color: '#e5e7eb',
    fontSize: 12,
    fontWeight: '500'
  },
  moreAmenities: {
    color: '#94a3b8',
    fontSize: 12,
    alignSelf: 'center'
  },
  hotelFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  availabilityText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '600'
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fbbf24',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 4
  },
  bookButtonText: {
    color: '#1f2937',
    fontSize: 14,
    fontWeight: '600'
  }
});