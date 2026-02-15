import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';

const SettingsScreen = ({ navigation }) => {
  const [fontSize, setFontSize] = useState(28);
  const [showTranslation, setShowTranslation] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedFontSize = await AsyncStorage.getItem('fontSize');
      const savedShowTranslation = await AsyncStorage.getItem('showTranslation');
      const savedAutoplay = await AsyncStorage.getItem('autoplay');
      const savedDarkMode = await AsyncStorage.getItem('darkMode');

      if (savedFontSize) setFontSize(parseInt(savedFontSize));
      if (savedShowTranslation) setShowTranslation(savedShowTranslation === 'true');
      if (savedAutoplay) setAutoplay(savedAutoplay === 'true');
      if (savedDarkMode) setDarkMode(savedDarkMode === 'true');
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSetting = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.error('Error saving setting:', error);
    }
  };

  const handleFontSizeChange = (value) => {
    setFontSize(value);
    saveSetting('fontSize', value);
  };

  const handleTranslationToggle = (value) => {
    setShowTranslation(value);
    saveSetting('showTranslation', value);
  };

  const handleAutoplayToggle = (value) => {
    setAutoplay(value);
    saveSetting('autoplay', value);
  };

  const handleDarkModeToggle = (value) => {
    setDarkMode(value);
    saveSetting('darkMode', value);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reading Settings</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingHeader}>
            <Text style={styles.settingLabel}>Arabic Font Size</Text>
            <Text style={styles.settingValue}>{Math.round(fontSize)}px</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={20}
            maximumValue={48}
            value={fontSize}
            onValueChange={handleFontSizeChange}
            minimumTrackTintColor="#10b981"
            maximumTrackTintColor="#2d3748"
            thumbTintColor="#10b981"
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Show Translation</Text>
            <Switch
              value={showTranslation}
              onValueChange={handleTranslationToggle}
              trackColor={{ false: '#2d3748', true: '#10b981' }}
              thumbColor={showTranslation ? '#d4af37' : '#94a3b8'}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Audio Settings</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Auto-play Audio</Text>
            <Switch
              value={autoplay}
              onValueChange={handleAutoplayToggle}
              trackColor={{ false: '#2d3748', true: '#10b981' }}
              thumbColor={autoplay ? '#d4af37' : '#94a3b8'}
            />
          </View>
          <Text style={styles.settingDescription}>
            Automatically play audio when opening a verse
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={handleDarkModeToggle}
              trackColor={{ false: '#2d3748', true: '#10b981' }}
              thumbColor={darkMode ? '#d4af37' : '#94a3b8'}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <View style={styles.infoCard}>
          <Text style={styles.appName}>Quran Now</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appDescription}>
            Read and study the Holy Quran with translations, audio recitations, and bookmarks.
          </Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Rate App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Share App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e12',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 16,
  },
  settingItem: {
    marginBottom: 24,
  },
  settingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#f8f9fa',
  },
  settingValue: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: 'bold',
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  infoCard: {
    backgroundColor: '#141920',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2d3748',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 12,
  },
  appDescription: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#141920',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
  },
  buttonText: {
    fontSize: 16,
    color: '#f8f9fa',
    textAlign: 'center',
  },
});

export default SettingsScreen;
