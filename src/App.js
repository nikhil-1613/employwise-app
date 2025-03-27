
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getTheme } from "./context/theme"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./pages/Login";
import { toggleTheme } from "./redux/themeSlice"; // Import toggle action
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode); // Get theme from Redux
  const theme = getTheme(darkMode);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <Toaster position="top-right" reverseOrder={false} />
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route 
              path="/users" 
              element={<Users toggleTheme={() => dispatch(toggleTheme())} darkMode={darkMode} />} 
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
