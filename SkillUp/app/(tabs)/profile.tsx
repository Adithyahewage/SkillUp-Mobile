import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { toggleTheme } from '@/store/slices/themeSlice';

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const favoritesCount = useAppSelector((state) => state.favorites.items.length);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDarkMode && styles.textDark]}>Profile</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.profileCard, isDarkMode && styles.cardDark]}>
          <View style={styles.avatarContainer}>
            <Feather name="user" size={48} color={isDarkMode ? '#818cf8' : '#6366f1'} />
          </View>
          <Text style={[styles.name, isDarkMode && styles.textDark]}>
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : user?.username || 'User'}
          </Text>
          <Text style={[styles.email, isDarkMode && styles.textSecondaryDark]}>
            {user?.email || ''}
          </Text>
        </View>

        <View style={[styles.statsCard, isDarkMode && styles.cardDark]}>
          <View style={styles.statItem}>
            <Feather name="heart" size={24} color="#ff4444" />
            <View style={styles.statContent}>
              <Text style={[styles.statValue, isDarkMode && styles.textDark]}>
                {favoritesCount}
              </Text>
              <Text style={[styles.statLabel, isDarkMode && styles.textSecondaryDark]}>
                Favorites
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.settingsCard, isDarkMode && styles.cardDark]}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Feather name="moon" size={20} color={isDarkMode ? '#f1f5f9' : '#0f172a'} />
              <Text style={[styles.settingLabel, isDarkMode && styles.textDark]}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={() => {
                dispatch(toggleTheme());
              }}
              trackColor={{ false: '#767577', true: '#6366f1' }}
              thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Feather name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1e293b',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: isDark ? '#334155' : '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#64748b',
  },
  statsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statContent: {
    marginLeft: 15,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  settingsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#0f172a',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});