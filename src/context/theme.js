import { createTheme } from "@mui/material/styles";

export const getTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#ff79c6" : "#6200ea",
      },
      background: {
        default: darkMode ? "#121212" : "#f4f4f4",
        paper: darkMode ? "#1e1e1e" : "#fff",
      },
      text: {
        primary: darkMode ? "#fff" : "#000",
      },
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });
