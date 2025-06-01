import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  Alert,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    bookingReminders: true,
    marketingEmails: false,
    darkMode: true,
    language: 'en',
    timezone: 'UTC+5:30',
    currency: 'INR',
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleSelect = (setting: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to save settings
      // For now, we'll just simulate a successful save
      localStorage.setItem('userSettings', JSON.stringify(settings));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError('Error saving settings');
      console.error('Settings save error:', err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        sx={{
          p: 4,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 230, 118, 0.2)',
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>
            Settings
          </Typography>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            color="success"
          >
            Save Changes
          </Button>
        </Box>

        {saved && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Settings saved successfully!
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Notifications Section */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              Notifications
            </Typography>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(0, 230, 118, 0.1)',
                borderRadius: 2,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={() => handleToggle('emailNotifications')}
                        color="success"
                      />
                    }
                    label="Email Notifications"
                    sx={{ color: '#fff' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.smsNotifications}
                        onChange={() => handleToggle('smsNotifications')}
                        color="success"
                      />
                    }
                    label="SMS Notifications"
                    sx={{ color: '#fff' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.bookingReminders}
                        onChange={() => handleToggle('bookingReminders')}
                        color="success"
                      />
                    }
                    label="Booking Reminders"
                    sx={{ color: '#fff' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.marketingEmails}
                        onChange={() => handleToggle('marketingEmails')}
                        color="success"
                      />
                    }
                    label="Marketing Emails"
                    sx={{ color: '#fff' }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ borderColor: 'rgba(0, 230, 118, 0.2)', my: 2 }} />
          </Grid>

          {/* Preferences Section */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              Preferences
            </Typography>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(0, 230, 118, 0.1)',
                borderRadius: 2,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.darkMode}
                        onChange={() => handleToggle('darkMode')}
                        color="success"
                      />
                    }
                    label="Dark Mode"
                    sx={{ color: '#fff' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Language</InputLabel>
                    <Select
                      value={settings.language}
                      label="Language"
                      onChange={(e) => handleSelect('language', e.target.value)}
                      sx={{ color: '#fff' }}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="hi">Hindi</MenuItem>
                      <MenuItem value="ta">Tamil</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Timezone</InputLabel>
                    <Select
                      value={settings.timezone}
                      label="Timezone"
                      onChange={(e) => handleSelect('timezone', e.target.value)}
                      sx={{ color: '#fff' }}
                    >
                      <MenuItem value="UTC+5:30">IST (UTC+5:30)</MenuItem>
                      <MenuItem value="UTC+0">UTC</MenuItem>
                      <MenuItem value="UTC-5">EST (UTC-5)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Currency</InputLabel>
                    <Select
                      value={settings.currency}
                      label="Currency"
                      onChange={(e) => handleSelect('currency', e.target.value)}
                      sx={{ color: '#fff' }}
                    >
                      <MenuItem value="INR">Indian Rupee (₹)</MenuItem>
                      <MenuItem value="USD">US Dollar ($)</MenuItem>
                      <MenuItem value="EUR">Euro (€)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Settings; 