import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { QURAN_DATA } from '../services/QuranService';

const SurahListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSurahs, setFilteredSurahs] = useState(QURAN_DATA);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredSurahs(QURAN_DATA);
    } else {
      const filtered = QURAN_DATA.filter(
        (surah) =>
          surah.name.toLowerCase().includes(text.toLowerCase()) ||
          surah.arabic.includes(text) ||
          surah.number.toString() === text ||
          surah.meaning.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSurahs(filtered);
    }
  };

  const renderSurahCard = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.surahCard, { opacity: 0 }]}
      onLayout={(e) => {
        e.target.setNativeProps({
          style: { opacity: 1 }
        });
      }}
      onPress={() => navigation.navigate('Reading', { surahNumber: item.number })}
      activeOpacity={0.7}
    >
      <View style={styles.surahHeader}>
        <View style={styles.surahNumber}>
          <Text style={styles.surahNumberText}>{item.number}</Text>
        </View>
        <View style={styles.surahInfo}>
          <Text style={styles.surahName}>{item.name}</Text>
          <Text style={styles.surahMeta}>
            {item.revelation} • {item.verses} verses
          </Text>
        </View>
      </View>
      <Text style={styles.surahArabic}>{item.arabic}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0e12" />
      
      {/* Header Icons */}
      <View style={styles.headerIcons}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Bookmarks')}
        >
          <Icon name="bookmark" size={24} color="#94a3b8" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Icon name="cog" size={24} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#64748b" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Surah by name or number..."
          placeholderTextColor="#64748b"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Icon name="close" size={20} color="#64748b" />
          </TouchableOpacity>
        )}
      </View>

      {/* Surah List */}
      <FlatList
        data={filteredSurahs}
        renderItem={renderSurahCard}
        keyExtractor={(item) => item.number.toString()}
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
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: '#1c242e',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141920',
    borderRadius: 15,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#2d3748',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    color: '#f8f9fa',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  surahCard: {
    backgroundColor: '#141920',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
  },
  surahHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  surahNumber: {
    width: 50,
    height: 50,
    backgroundColor: '#10b981',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  surahNumberText: {
    color: '#0a0e12',
    fontSize: 18,
    fontWeight: 'bold',
  },
  surahInfo: {
    flex: 1,
  },
  surahName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f8f9fa',
    marginBottom: 4,
  },
  surahMeta: {
    fontSize: 14,
    color: '#64748b',
  },
  surahArabic: {
    fontSize: 24,
    color: '#d4af37',
    textAlign: 'right',
    fontFamily: 'noto-sans-arabic',
  },
});

export default SurahListScreen;
