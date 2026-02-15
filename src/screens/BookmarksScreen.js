import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QURAN_DATA } from '../services/QuranService';

const BookmarksScreen = ({ navigation }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const savedBookmarks = await AsyncStorage.getItem('bookmarks');
      if (savedBookmarks) {
        const bookmarkList = JSON.parse(savedBookmarks);
        const bookmarkData = bookmarkList.map(bookmark => {
          const [surahNumber, verseNumber] = bookmark.split(':').map(Number);
          const surah = QURAN_DATA.find(s => s.number === surahNumber);
          return {
            id: bookmark,
            surahNumber,
            verseNumber,
            surahName: surah?.name,
            surahArabic: surah?.arabic,
          };
        });
        setBookmarks(bookmarkData);
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const removeBookmark = async (bookmarkId) => {
    try {
      const newBookmarks = bookmarks.filter(b => b.id !== bookmarkId);
      setBookmarks(newBookmarks);
      
      const bookmarkIds = newBookmarks.map(b => b.id);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarkIds));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  const navigateToVerse = (surahNumber, verseNumber) => {
    navigation.navigate('Reading', { surahNumber, scrollToVerse: verseNumber });
  };

  const renderBookmark = ({ item }) => (
    <TouchableOpacity
      style={styles.bookmarkCard}
      onPress={() => navigateToVerse(item.surahNumber, item.verseNumber)}
      activeOpacity={0.7}
    >
      <View style={styles.bookmarkContent}>
        <View style={styles.bookmarkIcon}>
          <Icon name="bookmark" size={24} color="#d4af37" />
        </View>
        <View style={styles.bookmarkInfo}>
          <Text style={styles.bookmarkTitle}>
            {item.surahName} - Verse {item.verseNumber}
          </Text>
          <Text style={styles.bookmarkArabic}>{item.surahArabic}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeBookmark(item.id)}
      >
        <Icon name="delete" size={20} color="#ef4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (bookmarks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="bookmark-outline" size={80} color="#2d3748" />
        <Text style={styles.emptyTitle}>No Bookmarks Yet</Text>
        <Text style={styles.emptyDescription}>
          Start bookmarking verses while reading to save them here
        </Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('SurahList')}
        >
          <Text style={styles.startButtonText}>Start Reading</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        renderItem={renderBookmark}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e12',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0e12',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8f9fa',
    marginTop: 24,
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  startButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a0e12',
  },
  listContainer: {
    padding: 16,
  },
  bookmarkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141920',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
  },
  bookmarkContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#1c242e',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bookmarkInfo: {
    flex: 1,
  },
  bookmarkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f8f9fa',
    marginBottom: 4,
  },
  bookmarkArabic: {
    fontSize: 18,
    color: '#d4af37',
    fontFamily: 'noto-sans-arabic',
  },
  deleteButton: {
    width: 40,
    height: 40,
    backgroundColor: '#1c242e',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default BookmarksScreen;
