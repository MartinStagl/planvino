import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Activity } from '../data/mockData';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function TaskDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { task, date } = route.params as { task: Activity; date: Date };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#3E6947" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aufgabendetails</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aufgabe</Text>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>
              {task.vineyard || 'ALLE'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modul</Text>
          <Text style={styles.detailText}>{task.module}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datum</Text>
          <Text style={styles.detailText}>
            {date.toLocaleDateString('de-DE', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Beschreibung</Text>
          <Text style={styles.description}>
            Detaillierte Informationen und Anweisungen für diese Aufgabe werden hier angezeigt.
            Hier können Sie alle wichtigen Details, Checklisten und Notizen finden.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF2EE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E6947',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E6947',
    marginBottom: 8,
  },
  tagContainer: {
    backgroundColor: '#E8E8E8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  detailText: {
    fontSize: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
}); 