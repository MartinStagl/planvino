import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Switch, IconButton, Divider } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserProfile } from '../types/user';
import { apiService } from '../services/api';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userProfile = await apiService.getUserProfile();
      setProfile(userProfile);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleModuleToggle = async (module: string, value: boolean) => {
    if (!profile) return;
    try {
      await apiService.updateUserProfile({
        ...profile,
        enabledModules: {
          ...profile.enabledModules,
          [module]: value,
        },
      });
      loadProfile();
    } catch (error) {
      console.error('Error updating module:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Einstellungen</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Module</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="tree" size={24} color="#3E6947" />
              <Text style={styles.settingText}>Weingarten</Text>
            </View>
            <Switch
              value={profile?.enabledModules.vineyard ?? true}
              onValueChange={(value) => handleModuleToggle('vineyard', value)}
              color="#3E6947"
            />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="bottle-wine" size={24} color="#3E6947" />
              <Text style={styles.settingText}>Kellerwirtschaft</Text>
            </View>
            <Switch
              value={profile?.enabledModules.cellar ?? true}
              onValueChange={(value) => handleModuleToggle('cellar', value)}
              color="#3E6947"
            />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="bullhorn" size={24} color="#3E6947" />
              <Text style={styles.settingText}>Marketing & Social Media</Text>
            </View>
            <Switch
              value={profile?.enabledModules.marketing ?? true}
              onValueChange={(value) => handleModuleToggle('marketing', value)}
              color="#3E6947"
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Benachrichtigungen</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="email-outline" size={24} color="#3E6947" />
              <Text style={styles.settingText}>E-Mail</Text>
            </View>
            <Switch
              value={profile?.notificationPreferences.email ?? true}
              onValueChange={(value) => {}}
              color="#3E6947"
            />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="whatsapp" size={24} color="#3E6947" />
              <Text style={styles.settingText}>WhatsApp</Text>
            </View>
            <Switch
              value={profile?.notificationPreferences.whatsapp ?? false}
              onValueChange={(value) => {}}
              color="#3E6947"
            />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="bell-outline" size={24} color="#3E6947" />
              <Text style={styles.settingText}>Push-Benachrichtigungen</Text>
            </View>
            <Switch
              value={profile?.notificationPreferences.push ?? true}
              onValueChange={(value) => {}}
              color="#3E6947"
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datenschutz</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="eye-outline" size={24} color="#3E6947" />
              <Text style={styles.settingText}>Aufgaben sichtbar für</Text>
            </View>
            <Text style={styles.valueText}>Freunde</Text>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  placeholder: {
    width: 48,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
  },
  card: {
    borderWidth: 1,
    borderColor: '#3E6947',
    borderRadius: 12,
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#000000',
  },
  valueText: {
    fontSize: 16,
    color: '#3E6947',
  },
  divider: {
    backgroundColor: '#E0E0E0',
  },
}); 