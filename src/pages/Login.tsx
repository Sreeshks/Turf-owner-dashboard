import React, { useState } from 'react';
import { SparklesCore } from '../components/ui/sparkles/SparklesCore';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/api';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  Link,
  Alert,
} from '@mui/material';


const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError('');
  //   setLoading(true);

  //   try {
  //     const response = await fetch('https://turf-backend-7yqk.onrender.com/turf-owner/user/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData), 
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       localStorage.setItem('authToken', data.token);
  //       localStorage.setItem('userData', JSON.stringify({
  //         name: data.name,
  //         email: data.email,
  //         turfLocation: data.turfLocation,
  //         sports: data.sports
  //       }));
  //       navigate('/dashboard');
  //     } else {
  //       setError(data.message || 'Invalid email or password');
  //     }
  //   } catch (err) {
  //     setError('An error occurred. Please try again.');
  //     console.error('Login error:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        console.log("Login successful");
        // Store relevant user data in localStorage
        localStorage.setItem('userData', JSON.stringify({
          _id: data._id,
          name: data.name,
          email: data.email,
          usertype: data.usertype,
        }));

        console.log("Stored user data:", localStorage.getItem('userData'));
        // Redirect after successful login
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 100);
      } else {
        console.log("Login failed:", data.message);
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* 🔥 Sparkles matching login box width */}
      <Box
        sx={{
          height: 200,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'black',
          borderRadius: 2,
          mb: 4,
        }}
      >
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
        <div
          className="absolute inset-0 w-full h-full bg-black"
          style={{
            maskImage: 'radial-gradient(400px 200px at top, transparent 10%, black)',
            WebkitMaskImage: 'radial-gradient(400px 200px at top, transparent 10%, black)',
          }}
        />
      </Box>

      {/* Login Form */}
      <Box>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Turf Owner Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/register')}
                disabled={loading}
              >
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
