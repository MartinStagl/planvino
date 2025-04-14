import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { UserProfile, Vineyard } from '../types/user';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

// Mock data
const mockUserProfile: UserProfile = {
  id: '1',
  email: 'john@example.com',
  name: 'John Doe',
  farmName: 'Sunny Valley Vineyards',
  region: 'Napa Valley',
  vineyards: [
    {
      id: '1',
      name: 'North Block',
      size: 5.2,
      grapeVarieties: ['Cabernet Sauvignon', 'Merlot'],
      location: {
        lat: 38.2975,
        lon: -122.2869,
        address: '1234 Vineyard Lane, Napa, CA 94558',
      },
    },
    {
      id: '2',
      name: 'South Block',
      size: 3.8,
      grapeVarieties: ['Chardonnay', 'Pinot Noir'],
      location: {
        lat: 38.2985,
        lon: -122.2879,
        address: '5678 Wine Road, Napa, CA 94558',
      },
    },
  ],
  salesChannels: ['Direct to Consumer', 'Wine Club'],
  friends: ['2', '3'],
  enabledModules: {
    vineyard: true,
    cellar: true,
    marketing: true,
  },
  notificationPreferences: {
    email: true,
    whatsapp: false,
    push: true,
  },
  privacySettings: {
    taskVisibility: 'friends',
    inventoryVisibility: 'private',
  },
};

interface LocationSearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

export default function ProfileScreen() {
  const { updateProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [newVineyard, setNewVineyard] = useState<Partial<Vineyard>>({
    name: '',
    size: 0,
    grapeVarieties: [],
    location: {
      lat: 0,
      lon: 0,
      address: '',
    },
  });
  const [locationSearch, setLocationSearch] = useState('');
  const [locationResults, setLocationResults] = useState<LocationSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [newGrapeVariety, setNewGrapeVariety] = useState('');

  // Mock location search results
  const mockLocationResults: LocationSearchResult[] = [
    {
      display_name: '123 Vineyard Way, Napa, CA 94558',
      lat: '38.2975',
      lon: '-122.2869',
    },
    {
      display_name: '456 Wine Road, Sonoma, CA 95476',
      lat: '38.2985',
      lon: '-122.2879',
    },
  ];

  const searchLocation = async (query: string) => {
    if (!query.trim()) {
      setLocationResults([]);
      return;
    }

    setIsSearching(true);
    // Simulate API delay
    setTimeout(() => {
      setLocationResults(mockLocationResults);
      setIsSearching(false);
    }, 500);
  };

  const handleLocationSelect = (result: LocationSearchResult) => {
    setNewVineyard(prev => ({
      ...prev,
      location: {
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        address: result.display_name,
      },
    }));
    setLocationResults([]);
    setLocationSearch('');
  };

  const addGrapeVariety = () => {
    if (newGrapeVariety.trim()) {
      setNewVineyard(prev => ({
        ...prev,
        grapeVarieties: [...(prev.grapeVarieties || []), newGrapeVariety.trim()],
      }));
      setNewGrapeVariety('');
    }
  };

  const removeGrapeVariety = (variety: string) => {
    setNewVineyard(prev => ({
      ...prev,
      grapeVarieties: prev.grapeVarieties?.filter(v => v !== variety) || [],
    }));
  };

  const addVineyard = () => {
    if (!profile || !newVineyard.name || !newVineyard.location?.address) return;

    const vineyard: Vineyard = {
      id: Date.now().toString(),
      name: newVineyard.name,
      size: newVineyard.size || 0,
      grapeVarieties: newVineyard.grapeVarieties || [],
      location: newVineyard.location,
    };

    const updatedProfile = {
      ...profile,
      vineyards: [...profile.vineyards, vineyard],
    };

    setProfile(updatedProfile);
    updateProfile(updatedProfile);
    setNewVineyard({
      name: '',
      size: 0,
      grapeVarieties: [],
      location: {
        lat: 0,
        lon: 0,
        address: '',
      },
    });
  };

  const removeVineyard = (vineyardId: string) => {
    const updatedProfile = {
      ...profile,
      vineyards: profile.vineyards.filter(v => v.id !== vineyardId),
    };

    setProfile(updatedProfile);
    updateProfile(updatedProfile);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{profile.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Farm Name:</Text>
          <Text style={styles.value}>{profile.farmName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Region:</Text>
          <Text style={styles.value}>{profile.region}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vineyards</Text>
        {profile.vineyards.map((vineyard) => (
          <View key={vineyard.id} style={styles.vineyardCard}>
            <View style={styles.vineyardHeader}>
              <Text style={styles.vineyardName}>{vineyard.name}</Text>
              <TouchableOpacity onPress={() => removeVineyard(vineyard.id)}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
            <Text style={styles.vineyardDetails}>Size: {vineyard.size} hectares</Text>
            <Text style={styles.vineyardDetails}>
              Varieties: {vineyard.grapeVarieties.join(', ')}
            </Text>
            <Text style={styles.vineyardDetails}>Location: {vineyard.location.address}</Text>
          </View>
        ))}

        <View style={styles.addVineyardSection}>
          <Text style={styles.subsectionTitle}>Add New Vineyard</Text>
          <TextInput
            style={styles.input}
            placeholder="Vineyard Name"
            value={newVineyard.name}
            onChangeText={(text) => setNewVineyard(prev => ({ ...prev, name: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Size (hectares)"
            keyboardType="numeric"
            value={newVineyard.size?.toString()}
            onChangeText={(text) => setNewVineyard(prev => ({ ...prev, size: parseFloat(text) || 0 }))}
          />
          
          <View style={styles.grapeVarietiesSection}>
            <Text style={styles.subsectionTitle}>Grape Varieties</Text>
            <View style={styles.grapeVarietyInput}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Add grape variety"
                value={newGrapeVariety}
                onChangeText={setNewGrapeVariety}
              />
              <TouchableOpacity
                style={styles.addGrapeButton}
                onPress={addGrapeVariety}
                disabled={!newGrapeVariety.trim()}
              >
                <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.grapeVarietiesList}>
              {newVineyard.grapeVarieties?.map((variety, index) => (
                <View key={index} style={styles.grapeVarietyTag}>
                  <Text style={styles.grapeVarietyText}>{variety}</Text>
                  <TouchableOpacity onPress={() => removeGrapeVariety(variety)}>
                    <Ionicons name="close-circle-outline" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Search location..."
            value={locationSearch}
            onChangeText={(text) => {
              setLocationSearch(text);
              searchLocation(text);
            }}
          />
          {locationResults.length > 0 && (
            <View style={styles.locationResults}>
              {locationResults.map((result, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.locationResult}
                  onPress={() => handleLocationSelect(result)}
                >
                  <Text>{result.display_name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity
            style={styles.addButton}
            onPress={addVineyard}
            disabled={!newVineyard.name || !newVineyard.location?.address}
          >
            <Text style={styles.addButtonText}>Add Vineyard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(251, 249, 244)',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    width: 100,
  },
  value: {
    flex: 1,
  },
  vineyardCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  vineyardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vineyardName: {
    fontSize: 18,
    fontWeight: '600',
  },
  vineyardDetails: {
    marginBottom: 4,
    color: '#666',
  },
  addVineyardSection: {
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  locationResults: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  locationResult: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addButton: {
    backgroundColor: '#3E6947',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  grapeVarietiesSection: {
    marginBottom: 12,
  },
  grapeVarietyInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addGrapeButton: {
    marginLeft: 8,
    padding: 8,
  },
  grapeVarietiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  grapeVarietyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    padding: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  grapeVarietyText: {
    marginRight: 4,
  },
}); 