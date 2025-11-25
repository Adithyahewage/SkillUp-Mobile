import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useAppDispatch } from '@/store/hooks';
import { login } from '@/store/slices/authSlice';
import { authAPI } from '@/services/api';
import { useAppSelector } from '@/store/hooks';

const registerSchema = yup.object().shape({
  username: yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  firstName: yup.string(),
  lastName: yup.string(),
});

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const { confirmPassword, ...registerData } = data;
      const response = await authAPI.register(registerData);
      
      dispatch(login({
        user: {
          id: response.id.toString(),
          username: response.username,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
        },
        token: response.token,
      }));

      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const styles = getStyles(isDarkMode);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Feather name="user-plus" size={64} color={isDarkMode ? '#fff' : '#2f95dc'} />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join SkillUp today</Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Feather name="user" size={20} color={isDarkMode ? '#999' : '#666'} style={styles.icon} />
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor={isDarkMode ? '#666' : '#999'}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                  />
                )}
              />
            </View>
            {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

            <View style={styles.inputContainer}>
              <Feather name="mail" size={20} color={isDarkMode ? '#999' : '#666'} style={styles.icon} />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={isDarkMode ? '#666' : '#999'}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
            </View>
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color={isDarkMode ? '#999' : '#666'} style={styles.icon} />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={isDarkMode ? '#666' : '#999'}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                  />
                )}
              />
            </View>
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color={isDarkMode ? '#999' : '#666'} style={styles.icon} />
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor={isDarkMode ? '#666' : '#999'}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                  />
                )}
              />
            </View>
            {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}

            <View style={styles.inputContainer}>
              <Feather name="user" size={20} color={isDarkMode ? '#999' : '#666'} style={styles.icon} />
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="First Name (Optional)"
                    placeholderTextColor={isDarkMode ? '#666' : '#999'}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>

            <View style={styles.inputContainer}>
              <Feather name="user" size={20} color={isDarkMode ? '#999' : '#666'} style={styles.icon} />
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name (Optional)"
                    placeholderTextColor={isDarkMode ? '#666' : '#999'}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <Link href="/(auth)/login" asChild>
                <Text style={styles.link}>Sign In</Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#000' : '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: isDark ? '#fff' : '#000',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: isDark ? '#999' : '#666',
    marginBottom: 40,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: isDark ? '#333' : '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: isDark ? '#1a1a1a' : '#f9f9f9',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: isDark ? '#fff' : '#000',
  },
  error: {
    color: '#ff4444',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#2f95dc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: isDark ? '#999' : '#666',
  },
  link: {
    color: '#2f95dc',
    fontWeight: '600',
  },
});