import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: localStorage.getItem("darkMode") === "true", // Persist theme
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const themeSlice = createSlice({
//   name: "theme",
//   initialState: { darkMode: false },
//   reducers: {
//     toggleTheme: (state) => {
//       state.darkMode = !state.darkMode;
//     },
//   },
// });

// export const { toggleTheme } = themeSlice.actions;
// export default themeSlice.reducer;
