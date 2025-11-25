import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course } from './coursesSlice';

interface FavoritesState {
  items: Course[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Course>) => {
      const exists = state.items.find((item) => item.key === action.payload.key);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.key !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<Course>) => {
      const index = state.items.findIndex((item) => item.key === action.payload.key);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;