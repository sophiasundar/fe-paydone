// redux/Slice/ThemeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light', // Default theme is light
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'; // Toggle between light and dark
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
