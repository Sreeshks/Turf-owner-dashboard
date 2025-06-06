import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  Link,
  Alert,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    turfLocation: '',
    sports: [] as string[],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const availableSports = ['Football', 'Cricket', 'Basketball', 'Tennis', 'Volleyball'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    
    if (name === 'turfLocation') {
      setFormData(prev => ({
        ...prev,
        [name]: value as string,
        name: `${prev.name} - ${value}`
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name as string]: value
      }));
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Using reverse geocoding to get address from coordinates
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
              const location = data.display_name;
              setFormData(prev => ({
                ...prev,
                turfLocation: location
              }));
            })
            .catch(err => {
              setError('Failed to get location details. Please try again.');
              console.error('Geocoding error:', err);
            });
        },
        (error) => {
          setError('Failed to get your location. Please enable location services.');
          console.error('Geolocation error:', error);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://turf-backend-7yqk.onrender.com/turf-owner/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Create Turf Owner Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    required
                    fullWidth
                    id="turfLocation"
                    label="Turf Location"
                    name="turfLocation"
                    value={formData.turfLocation}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <IconButton 
                    onClick={getCurrentLocation}
                    disabled={loading}
                    sx={{ 
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                  >
                    <LocationOnIcon />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="sports-label">Sports</InputLabel>
                  <Select
                    labelId="sports-label"
                    id="sports"
                    name="sports"
                    multiple
                    value={formData.sports}
                    onChange={(e) => handleChange(e as any)}
                    label="Sports"
                    disabled={loading}
                  >
                    {availableSports.map((sport) => (
                      <MenuItem key={sport} value={sport}>
                        {sport}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/login')}
                disabled={loading}
              >
                Already have an account? Sign In
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 