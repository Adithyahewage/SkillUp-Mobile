SkillUp - Campus & Education Mobile App

A modern React Native mobile application for browsing and saving online courses. Built with Expo and TypeScript, featuring a clean UI, dark mode support, and seamless course management.

📱 Features

Authentication
- **User Registration** - Create new accounts with email validation
- **User Login** - Secure authentication with form validation
- **Session Persistence** - Stay logged in across app restarts

Course Management
- **Course Discovery** - Browse courses from Open Library API
- **Search Functionality** - Search courses by keywords
- **Course Details** - View comprehensive course information
- **Favorites System** - Save and manage favorite courses
- **Persistent Storage** - Favorites persist across sessions

User Experience
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Optimized for various screen sizes
- **Modern UI** - Clean, intuitive interface with modern color palette
- **Smooth Navigation** - Seamless navigation between screens

🛠️ Tech Stack

Core Technologies
- **React Native** (0.81.5) - Cross-platform mobile framework
- **Expo** (~54.0.25) - Development platform and tooling
- **TypeScript** (5.9.2) - Type-safe JavaScript

State Management
- **Redux Toolkit** (2.11.0) - State management
- **Redux Persist** (6.0.0) - Persistent state storage
- **React Redux** (9.2.0) - React bindings for Redux

Navigation
- **Expo Router** (~6.0.15) - File-based routing
- **React Navigation** (7.x) - Navigation library

Form Handling & Validation
- **React Hook Form** (7.66.1) - Form state management
- **Yup** (1.7.1) - Schema validation
- **@hookform/resolvers** (5.2.2) - Form validation resolvers

UI Components
- **@expo/vector-icons** (15.0.3) - Icon library (Feather icons)
- **React Native Reanimated** (~4.1.1) - Animation library

Storage
- **@react-native-async-storage/async-storage** (2.2.0) - Local storage

📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Expo CLI** (install globally: `npm install -g expo-cli`)
- **iOS Simulator** (for macOS) or **Android Studio** (for Android development)

🚀 Installation

1. **Clone the repository**
   git clone <your-repository-url>
   cd SkillUp
   2. **Install dependencies**h
   npm install
   3. **Start the development server**
   npm start
   4. **Run on your preferred platform**
   
   iOS Simulator (macOS only)
   npm run ios
   
   Android Emulator
   npm run android
   
   Web Browser
   npm run web
   📱 Usage

Getting Started

1. **Launch the app** - The app will open to the login screen
2. **Create an account** - Tap "Sign Up" to register a new account
   - Username: minimum 3 characters
   - Email: valid email format
   - Password: minimum 6 characters
3. **Login** - Use your credentials to access the app

Test Credentials

You can use DummyJSON test credentials:
- **Username:** `emilys`
- **Password:** `emilyspass`

Or register a new account through the app.

Using the App

1. **Home Screen**
   - Browse courses displayed as cards
   - Use the search bar to find specific courses
   - Pull down to refresh the course list
   - Tap any course card to view details

2. **Course Details**
   - View full course information
   - Tap the heart icon to add/remove from favorites
   - See course cover image, description, and metadata

3. **Favorites**
   - Access your saved courses from the Favorites tab
   - Remove favorites by tapping the trash icon
   - Favorites persist across app sessions

4. **Profile**
   - View your account information
   - Toggle dark mode on/off
   - See your favorites count
   - Logout from your account

This project was developed as part of the Mobile Applications Development module at the University of Moratuwa.
