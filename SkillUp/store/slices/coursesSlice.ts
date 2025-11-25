import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Course {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  cover_edition_key?: string;
  description?: string;
  status?: 'Active' | 'Upcoming' | 'Popular';
}

interface CoursesState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: CoursesState = {
  courses: [],
  loading: false,
  error: null,
  searchQuery: '',
};

// Async thunk for fetching courses
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (query: string = 'programming') => {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
    );
    const data = await response.json();
    
    // Transform Open Library data to Course format
    return data.docs.map((doc: any, index: number) => ({
      key: doc.key || `course-${index}`,
      title: doc.title || 'Untitled Course',
      author_name: doc.author_name || [],
      first_publish_year: doc.first_publish_year,
      cover_i: doc.cover_i,
      cover_edition_key: doc.cover_edition_key,
      description: doc.first_sentence?.[0] || 'No description available',
      status: index < 5 ? 'Popular' : index < 10 ? 'Active' : 'Upcoming',
    }));
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearCourses: (state) => {
      state.courses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch courses';
      });
  },
});

export const { setSearchQuery, clearCourses } = coursesSlice.actions;
export default coursesSlice.reducer;