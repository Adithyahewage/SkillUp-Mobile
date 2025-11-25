import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Course } from '@/store/slices/coursesSlice';
import { removeFavorite } from '@/store/slices/favoritesSlice';

export default function FavoritesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items: favorites } = useAppSelector((state) => state.favorites);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const renderFavoriteCard = ({ item }: { item: Course }) => {
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
            <TouchableOpacity
              onPress={() => dispatch(removeFavorite(item.key))}
              style={styles.removeButton}
            >
              <Feather name="trash-2" size={18} color="#ff4444" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDarkMode && styles.textDark]}>My Favorites</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="heart" size={64} color={isDarkMode ? '#64748b' : '#94a3b8'} />
          <Text style={[styles.emptyText, isDarkMode && styles.textSecondaryDark]}>
            No favorites yet
          </Text>
          <Text style={[styles.emptySubtext, isDarkMode && styles.textSecondaryDark]}>
            Start adding courses to your favorites!
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteCard}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.list}
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: isDark ? '#1e293b' : '#ffffff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  textDark: {
    color: '#f1f5f9',
  },
  textSecondaryDark: {
    color: '#94a3b8',
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
  removeButton: {
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#94a3b8',
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#94a3b8',
  },
});