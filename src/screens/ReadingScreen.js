import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QURAN_DATA, QuranService } from '../services/QuranService';

const ReadingScreen = ({ route, navigation }) => {
  const { surahNumber } = route.params;
  const [surah, setSurah] = useState(null);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [fontSize, setFontSize] = useState(28);
  const [showTranslation, setShowTranslation] = useState(true);

  const surahInfo = QURAN_DATA.find(s => s.number === surahNumber);

  useEffect(() => {
    loadSurah();
    loadSettings();
    loadBookmarks();
  }, [surahNumber]);

  const loadSurah = async () => {
    try {
      setLoading(true);
      const data = await QuranService.getSurahWithTranslation(surahNumber);
      setSurah(data);
      setVerses(data.verses);
    } catch (error) {
      console.error('Error loading surah:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      const savedFontSize = await AsyncStorage.getItem('fontSize');
      const savedShowTranslation = await AsyncStorage.getItem('showTranslation');
      
      if (savedFontSize) setFontSize(parseInt(savedFontSize));
      if (savedShowTranslation) setShowTranslation(savedShowTranslation === 'true');
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const loadBookmarks = async () => {
    try {
      const savedBookmarks = await AsyncStorage.getItem('bookmarks');
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const toggleBookmark = async (verseNumber) => {
    const bookmarkId = `${surahNumber}:${verseNumber}`;
    let newBookmarks;

    if (bookmarks.includes(bookmarkId)) {
      newBookmarks = bookmarks.filter(b => b !== bookmarkId);
    } else {
      newBookmarks = [...bookmarks, bookmarkId];
    }

    setBookmarks(newBookmarks);
    try {
      await AsyncStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  const isBookmarked = (verseNumber) => {
    return bookmarks.includes(`${surahNumber}:${verseNumber}`);
  };

  const navigateSurah = (direction) => {
    const newNumber = surahNumber + direction;
    if (newNumber >= 1 && newNumber <= 114) {
      navigation.replace('Reading', { surahNumber: newNumber });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={styles.loadingText}>Loading Surah...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0e12" />
      
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="arrow-left" size={24} color="#d4af37" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{surahInfo?.name}</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Surah Title */}
        <View style={styles.surahTitle}>
          <Text style={styles.surahTitleArabic}>{surahInfo?.arabic}</Text>
          <Text style={styles.surahTitleEnglish}>{surahInfo?.name}</Text>
          <Text style={styles.surahTitleMeta}>
            {surahInfo?.meaning} • {surahInfo?.revelation} • {surahInfo?.verses} Verses
          </Text>
        </View>

        {/* Bismillah */}
        {surahNumber !== 1 && surahNumber !== 9 && (
          <View style={styles.bismillah}>
            <Text style={styles.bismillahText}>
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </Text>
          </View>
        )}

        {/* Verses */}
        {verses.map((verse) => (
          <View key={verse.verse} style={styles.verseCard}>
            <View style={styles.verseHeader}>
              <View style={styles.verseNumber}>
                <Text style={styles.verseNumberText}>{verse.verse}</Text>
              </View>
              <View style={styles.verseActions}>
                <TouchableOpacity
                  style={styles.verseButton}
                  onPress={() => toggleBookmark(verse.verse)}
                >
                  <Icon
                    name={isBookmarked(verse.verse) ? "bookmark" : "bookmark-outline"}
                    size={20}
                    color={isBookmarked(verse.verse) ? "#d4af37" : "#64748b"}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.verseButton}>
                  <Icon name="volume-high" size={20} color="#64748b" />
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={[styles.verseArabic, { fontSize }]}>
              {verse.arabic}
            </Text>
            
            {showTranslation && (
              <Text style={styles.verseTranslation}>{verse.translation}</Text>
            )}
          </View>
        ))}

        {/* Navigation */}
        <View style={styles.navigation}>
          <TouchableOpacity
            style={[styles.navButton, surahNumber === 1 && styles.navButtonDisabled]}
            onPress={() => navigateSurah(-1)}
            disabled={surahNumber === 1}
          >
            <Icon name="chevron-left" size={20} color="#f8f9fa" />
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, surahNumber === 114 && styles.navButtonDisabled]}
            onPress={() => navigateSurah(1)}
            disabled={surahNumber === 114}
          >
            <Text style={styles.navButtonText}>Next</Text>
            <Icon name="chevron-right" size={20} color="#f8f9fa" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e12',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0e12',
  },
  loadingText: {
    color: '#94a3b8',
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0a0e12',
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d4af37',
  },
  scrollView: {
    flex: 1,
  },
  surahTitle: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  surahTitleArabic: {
    fontSize: 40,
    color: '#d4af37',
    marginBottom: 12,
    fontFamily: 'noto-sans-arabic',
  },
  surahTitleEnglish: {
    fontSize: 24,
    fontWeight: '600',
    color: '#f8f9fa',
    marginBottom: 8,
  },
  surahTitleMeta: {
    fontSize: 14,
    color: '#94a3b8',
  },
  bismillah: {
    backgroundColor: '#141920',
    borderRadius: 15,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2d3748',
    alignItems: 'center',
  },
  bismillahText: {
    fontSize: 28,
    color: '#10b981',
    fontFamily: 'noto-sans-arabic',
  },
  verseCard: {
    backgroundColor: '#141920',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2d3748',
  },
  verseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  verseNumber: {
    width: 40,
    height: 40,
    backgroundColor: '#10b981',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  verseNumberText: {
    color: '#0a0e12',
    fontSize: 16,
    fontWeight: 'bold',
  },
  verseActions: {
    flexDirection: 'row',
    marginLeft: 'auto',
    gap: 8,
  },
  verseButton: {
    width: 32,
    height: 32,
    backgroundColor: '#1c242e',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verseArabic: {
    color: '#f8f9fa',
    textAlign: 'right',
    lineHeight: 50,
    marginBottom: 16,
    fontFamily: 'noto-sans-arabic',
  },
  verseTranslation: {
    fontSize: 16,
    lineHeight: 28,
    color: '#94a3b8',
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141920',
    borderWidth: 1,
    borderColor: '#2d3748',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 8,
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    color: '#f8f9fa',
    fontSize: 16,
  },
});

export default ReadingScreen;
