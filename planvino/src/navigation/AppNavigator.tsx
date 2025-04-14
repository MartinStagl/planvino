import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CalendarScreen from '../screens/CalendarScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';
// ... other imports ...

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CalendarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CalendarMain"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TaskDetails"
        component={TaskDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// ... rest of the existing code ... 