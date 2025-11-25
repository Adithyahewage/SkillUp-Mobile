import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Course } from '@/store/slices/coursesSlice';
import { toggleFavorite } from '@/store/slices/favoritesSlice';

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.courses);
  const { items: favorites } = useAppSelector((state) => state.favorites);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const foundCourse = courses.find((c) => c.key === id);
    setCourse(foundCourse || null);
  }, [id, courses]);

  if (!course) {
    return (
      <View style={[styles.container, styles.center, isDarkMode && styles.containerDark]}>
        <ActivityIndicator size="large" color="#2f95dc" />
      </View>
    );
  }

  const isFavorite = favorites.some((item) => item.key === course.key);
  const coverUrl = course.cover_i
    ? `https://covers.openlibrary.org/b/id/${course.cover_i}-L.jpg`
    : 'https://via.placeholder.com/300';

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(course));
  };

  const styles = getStyles(isDarkMode);

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
          <Feather
            name={isFavorite ? 'heart' : 'heart'}
            size={24}
            color={isFavorite ? '#ff4444' : (isDarkMode ? '#fff' : '#000')}
            fill={isFavorite ? '#ff4444' : 'none'}
          />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: coverUrl }} style={styles.coverImage} />

      <View style={styles.content}>
        <View style={styles.titleSection}>
          <Text style={[styles.title, isDarkMode && styles.textDark]}>{course.title}</Text>
          {course.author_name && course.author_name.length > 0 && (
            <Text style={[styles.author, isDarkMode && styles.textSecondaryDark]}>
              by {course.author_name.join(', ')}
            </Text>
          )}
        </View>

        <View style={styles.metaSection}>
          <View style={styles.metaItem}>
            <Feather name="calendar" size={16} color={isDarkMode ? '#999' : '#666'} />
            <Text style={[styles.metaText, isDarkMode && styles.textSecondaryDark]}>
              {course.first_publish_year || 'N/A'}
            </Text>
          </View>
          <View style={[styles.statusBadge, course.status === 'Popular' && styles.popularBadge]}>
            <Text style={styles.statusText}>{course.status}</Text>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>Description</Text>
          <Text style={[styles.description, isDarkMode && styles.textSecondaryDark]}>
            {course.description || 'No description available for this course.'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 60,
    backgroundColor: isDark ? '#1a1a1a' : '#fff',
  },
  backButton: {
    padding: 5,
  },
  favoriteButton: {
    padding: 5,
  },
  coverImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  textDark: {
    color: '#fff',
  },
  textSecondaryDark: {
    color: '#999',
  },
  author: {
    fontSize: 18,
    color: '#666',
  },
  metaSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#333' : '#ddd',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#e3f2fd',
  },
  popularBadge: {
    backgroundColor: '#fff3e0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1976d2',
  },
  descriptionSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
});