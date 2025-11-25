import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCourses, setSearchQuery } from '@/store/slices/coursesSlice';
import { Course } from '@/store/slices/coursesSlice';

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { courses, loading, searchQuery } = useAppSelector((state) => state.courses);
  const user = useAppSelector((state) => state.auth.user);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchCourses('programming'));
  }, []);

  const handleSearch = () => {
    if (localSearchQuery.trim()) {
      dispatch(setSearchQuery(localSearchQuery));
      dispatch(fetchCourses(localSearchQuery));
    }
  };

  const handleRefresh = () => {
    dispatch(fetchCourses(searchQuery || 'programming'));
  };

  const renderCourseCard = ({ item }: { item: Course }) => {
    const coverUrl = item.cover_i
      ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
      : 'https://via.placeholder.com/150';

    return (
      <TouchableOpacity
        style={[styles.card, isDarkMode && styles.cardDark]}
        onPress={() => router.push(`/(tabs)/course-details?id=${item.key}`)}
      >
        <Image source={{ uri: coverUrl }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, isDarkMode && styles.textDark]} numberOfLines={2}>
            {item.title}
          </Text>
          {item.author_name && item.author_name.length > 0 && (
            <Text style={[styles.cardAuthor, isDarkMode && styles.textSecondaryDark]}>
              {item.author_name[0]}
            </Text>
          )}
          <View style={styles.cardFooter}>
            <View style={[styles.statusBadge, item.status === 'Popular' && styles.popularBadge]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
            {item.first_publish_year && (
              <Text style={[styles.yearText, isDarkMode && styles.textSecondaryDark]}>
                {item.first_publish_year}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, isDarkMode && styles.textDark]}>Hello,</Text>
          <Text style={[styles.username, isDarkMode && styles.textDark]}>
            {user?.firstName || user?.username || 'User'}
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
          <Feather name="user" size={24} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, isDarkMode && styles.searchInputDark]}
          placeholder="Search courses..."
          placeholderTextColor={isDarkMode ? '#666' : '#999'}
          value={localSearchQuery}
          onChangeText={setLocalSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Feather name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading && courses.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6366f1" />
        </View>
      ) : (
        <FlatList
          data={courses}
          renderItem={renderCourseCard}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Feather name="book-open" size={64} color={isDarkMode ? '#64748b' : '#94a3b8'} />
              <Text style={[styles.emptyText, isDarkMode && styles.textSecondaryDark]}>
                No courses found
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  containerDark: {
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: isDark ? '#1e293b' : '#ffffff',
  },
  greeting: {
    fontSize: 16,
    color: '#64748b',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 4,
  },
  textDark: {
    color: '#f1f5f9',
  },
  textSecondaryDark: {
    color: '#94a3b8',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: isDark ? '#1e293b' : '#ffffff',
  },
  searchInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f1f5f9',
    color: '#0f172a',
  },
  searchInputDark: {
    borderColor: '#334155',
    backgroundColor: '#1e293b',
    color: '#f1f5f9',
  },
  searchButton: {
    width: 45,
    height: 45,
    backgroundColor: '#6366f1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  list: {
    padding: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1e293b',
  },
  cardImage: {
    width: 100,
    height: 120,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 5,
  },
  cardAuthor: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#e0e7ff',
  },
  popularBadge: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
  },
  yearText: {
    fontSize: 12,
    color: '#64748b',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: '#94a3b8',
  },
});