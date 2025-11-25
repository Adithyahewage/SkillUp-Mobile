import React from 'react';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAppSelector } from '@/store/hooks';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const colorScheme = isDarkMode ? 'dark' : 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          borderTopColor: isDarkMode ? '#334155' : '#e2e8f0',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Feather name="heart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="course-details"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}