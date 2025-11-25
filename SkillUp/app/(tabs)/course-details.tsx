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

  // Compute styles early so they're available for early returns
  const styles = getStyles(isDarkMode);

  useEffect(() => {
    const foundCourse = courses.find((c) => c.key === id);
    setCourse(foundCourse || null);
  }, [id, courses]);

  if (!course) {
    return (
      <View style={[styles.container, styles.center, isDarkMode && styles.containerDark]}>
        <ActivityIndicator size="large" color="#6366f1" />
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

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={isDarkMode ? '#f1f5f9' : '#0f172a'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
          <Feather
            name={isFavorite ? 'heart' : 'heart'}
            size={24}
            color={isFavorite ? '#ef4444' : (isDarkMode ? '#f1f5f9' : '#0f172a')}
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
            <Feather name="calendar" size={16} color={isDarkMode ? '#94a3b8' : '#64748b'} />
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
    backgroundColor: '#f8fafc',
  },
  containerDark: {
    backgroundColor: '#0f172a',
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
    backgroundColor: isDark ? '#1e293b' : '#ffffff',
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
    color: '#0f172a',
    marginBottom: 8,
  },
  textDark: {
    color: '#f1f5f9',
  },
  textSecondaryDark: {
    color: '#94a3b8',
  },
  author: {
    fontSize: 18,
    color: '#64748b',
  },
  metaSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#334155' : '#e2e8f0',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#64748b',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
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
  descriptionSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#64748b',
  },
});