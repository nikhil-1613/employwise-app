import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    theme: themeReducer,
  },
});
export default store;