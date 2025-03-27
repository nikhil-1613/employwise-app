import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email" }));
      return;
    }
    if (!validatePassword(password)) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters" }));
      return;
    }

    try {
      const response = await axios.post("https://reqres.in/api/login", { email, password });

      localStorage.setItem("token", response.data.token);
      toast.success("Login Successful!");
      navigate("/users");
    } catch (err) {
      toast.error("Invalid credentials. Try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 10,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" align="center">
          Login
        </Typography>

        {/* Email Field */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) ? "" : "Enter a valid email" }));
          }}
          error={!!errors.email}
          helperText={errors.email}
        />

        {/* Password Field */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) ? "" : "Password must be at least 6 characters" }));
          }}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Login Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          disabled={!validateEmail(email) || !validatePassword(password)}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
