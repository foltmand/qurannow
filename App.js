import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import SurahListScreen from './src/screens/SurahListScreen';
import ReadingScreen from './src/screens/ReadingScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import BookmarksScreen from './src/screens/BookmarksScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0a0e12" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SurahList"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0a0e12',
            },
            headerTintColor: '#d4af37',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="SurahList" 
            component={SurahListScreen}
            options={{ title: 'Quran Now' }}
          />
          <Stack.Screen 
            name="Reading" 
            component={ReadingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
          <Stack.Screen 
            name="Bookmarks" 
            component={BookmarksScreen}
            options={{ title: 'Bookmarks' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
