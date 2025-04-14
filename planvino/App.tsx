import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { persistNavigationState, loadNavigationState } from './src/utils/navigationPersistence';
import { Activity } from './src/data/mockData';

// Import screens (we'll create these next)
import CalendarScreen from './src/screens/CalendarScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AuthScreen from './src/screens/AuthScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import TaskDetailsScreen from './src/screens/TaskDetailsScreen';
import AppDescriptionScreen from './src/screens/AppDescriptionScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';

// Define navigation types
export type RootStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  MainApp: undefined;
  AppDescription: undefined;
};

type DrawerParamList = {
  Calendar: undefined;
  Settings: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  Calendar: undefined;
  Settings: undefined;
  Profile: undefined;
  TaskDetails: {
    task: Activity;
    date: Date;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();
const MainStackNavigator = createNativeStackNavigator<MainStackParamList>();

// Main stack navigator for authenticated screens
const MainStack = () => {
  return (
    <MainStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <MainStackNavigator.Screen 
        name="Calendar" 
        component={CalendarScreen}
      />
      <MainStackNavigator.Screen 
        name="Settings" 
        component={SettingsScreen}
      />
      <MainStackNavigator.Screen 
        name="Profile" 
        component={ProfileScreen}
      />
      <MainStackNavigator.Screen 
        name="TaskDetails" 
        component={TaskDetailsScreen}
      />
    </MainStackNavigator.Navigator>
  );
};

// Drawer navigator for the main app
const MainDrawer = () => {
  const theme = useTheme();
  
  return (
    <Drawer.Navigator
      initialRouteName="Calendar"
      screenOptions={({ navigation }) => ({
        headerShown: true,
        drawerPosition: 'left',
        drawerType: 'front',
        drawerStyle: {
          width: '70%',
          backgroundColor: '#fff',
        },
        drawerActiveBackgroundColor: '#3E6947',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#3E6947',
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 16,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: '#3E6947',
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        },
        headerTitle: 'PlanVino',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#fff',
          fontSize: 20,
        },
        headerLeft: () => (
          <IconButton
            icon="menu"
            size={24}
            iconColor="#fff"
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 8 }}
          />
        ),
        sceneContainerStyle: {
          backgroundColor: '#EBF2EE'  // Light green background
        }
      })}
    >
      <Drawer.Screen 
        name="Calendar" 
        component={MainStack}
        options={{
          title: 'Weekly Plan',
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <IconButton icon="calendar" size={size} iconColor={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: 'Settings',
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <IconButton icon="cog" size={size} iconColor={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <IconButton icon="account" size={size} iconColor={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState<NavigationState | undefined>();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedState = await loadNavigationState();
        if (savedState) {
          setInitialState(savedState);
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3E6947" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#EBF2EE' }}>
      <SafeAreaProvider>
        <PaperProvider theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: '#6B46C1',
            background: '#1A1A1A',
            surface: '#2A2A2A',
            onSurface: '#FFFFFF',
            error: '#FF6B6B',
          },
        }}>
          <NavigationContainer
            initialState={initialState}
            onStateChange={(state) => {
              if (state) persistNavigationState(state);
            }}
            theme={{
              dark: false,
              colors: {
                primary: '#3E6947',
                background: '#EBF2EE',
                card: '#3E6947',
                text: '#000000',
                border: '#3E6947',
                notification: '#3E6947',
              },
            }}
          >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="AppDescription" component={AppDescriptionScreen} />
              <Stack.Screen name="MainApp" component={MainDrawer} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#3E6947',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBF2EE',
  },
}); 