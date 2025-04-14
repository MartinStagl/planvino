import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type AppDescriptionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AppDescription'>;

export default function AppDescriptionScreen() {
  const navigation = useNavigation<AppDescriptionScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PlanVino</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Die smarte Wochenplanung für Weinbaubetriebe</Text>
        
        <Text style={styles.paragraph}>
          PlanVino ist die erste digitale Lösung, die speziell für die Bedürfnisse moderner Weinbaubetriebe entwickelt wurde. Die App unterstützt Winzer:innen bei der effizienten Organisation ihrer Arbeitsabläufe im Weingarten, in der Kellerwirtschaft sowie im Bereich Marketing & Verkauf – individuell abgestimmt auf Rebsorte, Wetter, BBCH-Stadium und regionale Ereignisse.
        </Text>
        
        <Text style={styles.sectionTitle}>🔧 Funktionen im Überblick</Text>
        
        <View style={styles.featureSection}>
          <Text style={styles.featureTitle}>📅 Intelligenter Wochenplan</Text>
          <Text style={styles.featureText}>Automatisch generierte Wochenpläne für alle Arbeitsbereiche</Text>
          <Text style={styles.featureText}>Basierend auf Wetterdaten, Pflanzenschutzfenstern, Feiertagen und individuellen Parametern (Sorten, Betriebsgröße, Verkaufsfokus)</Text>
          <Text style={styles.featureText}>Vorschläge für optimale Arbeitstage (z. B. Spritzfenster, Laubarbeit, Filtration)</Text>
        </View>
        
        <View style={styles.featureSection}>
          <Text style={styles.featureTitle}>🌱 Weingartenmodul</Text>
          <Text style={styles.featureText}>Empfehlungen für Pflegemaßnahmen abgestimmt auf das aktuelle BBCH-Stadium</Text>
          <Text style={styles.featureText}>Hinweise zu Krankheitsdruck, Trockenheit, Wachstumsphasen</Text>
          <Text style={styles.featureText}>Dokumentation von durchgeführten Arbeiten möglich</Text>
        </View>
        
        <View style={styles.featureSection}>
          <Text style={styles.featureTitle}>🍷 Kellermodul</Text>
          <Text style={styles.featureText}>Aufgabenübersicht für Filtration, Füllung, Etikettierung, Stabilisierung</Text>
          <Text style={styles.featureText}>Zeitfenster basierend auf Reifegrad, Lagerkapazität und Absatzplanung</Text>
          <Text style={styles.featureText}>Erinnerungen an saisonale Kellerprozesse (z. B. Eiweiß-/Weinstabilisierung)</Text>
        </View>
        
        <View style={styles.featureSection}>
          <Text style={styles.featureTitle}>📣 Marketing- & Verkaufsmodul</Text>
          <Text style={styles.featureText}>Planungshilfe für Veranstaltungen, Ab-Hof-Verkauf und Direktvermarktung</Text>
          <Text style={styles.featureText}>Automatische Erinnerungen an lokale Feste oder Feiertage mit Potenzial für mehr Absatz</Text>
          <Text style={styles.featureText}>Unterstützung für Social-Media-Planung (optional, z. B. "Poste am Freitag eine Story zum Feuerwehrfest")</Text>
        </View>
        
        <View style={styles.featureSection}>
          <Text style={styles.featureTitle}>📍 Mobile-first Kalenderansicht</Text>
          <Text style={styles.featureText}>Wochendarstellung mit klaren Icons für alle Module</Text>
          <Text style={styles.featureText}>Aufgaben lassen sich manuell hinzufügen, verschieben oder löschen</Text>
          <Text style={styles.featureText}>Ideal für den schnellen Überblick im Feld oder im Keller</Text>
        </View>
        
        <View style={styles.featureSection}>
          <Text style={styles.featureTitle}>🔐 Datenschutz & Individualität</Text>
          <Text style={styles.featureText}>Alle Daten bleiben betrieblich – keine unnötige Freigabe an Dritte</Text>
          <Text style={styles.featureText}>Kalender individuell anpassbar nach Bedarf</Text>
          <Text style={styles.featureText}>Push-Benachrichtigungen & Wochenpläne optional per WhatsApp oder E-Mail</Text>
        </View>
        
        <Text style={styles.sectionTitle}>💡 Für wen ist PlanVino gedacht?</Text>
        <Text style={styles.paragraph}>
          PlanVino richtet sich an kleinere bis mittlere Weinbaubetriebe, die eine einfache, digitale Lösung für die wöchentliche Planung und Dokumentation suchen – ohne komplexe Betriebssoftware, aber mit echter Praxisnähe.
        </Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('MainApp')}
        >
          <Text style={styles.buttonText}>Zum Hauptmenü</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(251, 249, 244)',
  },
  header: {
    backgroundColor: '#3E6947',
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3E6947',
    marginBottom: 16,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E6947',
    marginBottom: 16,
  },
  featureSection: {
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#3E6947',
  },
  featureText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
    color: '#333',
  },
  button: {
    backgroundColor: '#3E6947',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 