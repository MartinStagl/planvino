import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationState } from '@react-navigation/native';

const NAVIGATION_STATE_KEY = '@planvino_nav_state';

export const persistNavigationState = async (navState: NavigationState) => {
  try {
    await AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(navState));
  } catch (err) {
    console.warn('Error persisting navigation state:', err);
  }
};

export const loadNavigationState = async (): Promise<NavigationState | undefined> => {
  try {
    const jsonString = await AsyncStorage.getItem(NAVIGATION_STATE_KEY);
    return jsonString ? JSON.parse(jsonString) : undefined;
  } catch (err) {
    console.warn('Error loading navigation state:', err);
    return undefined;
  }
}; 