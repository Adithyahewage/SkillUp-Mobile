const API_BASE_URL = 'https://dummyjson.com';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

// Authentication API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Parse error message from API response
      const errorMessage = data.message || 'Invalid credentials';
      throw new Error(errorMessage);
    }
    
    return data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/users/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    const result = await response.json();
    // DummyJSON returns user without token, so we'll generate one
    return {
      ...result,
      token: `token_${result.id}_${Date.now()}`,
    };
  },
};

// Courses API (Open Library)
export const coursesAPI = {
  search: async (query: string = 'programming'): Promise<any> => {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    
    return response.json();
  },
};