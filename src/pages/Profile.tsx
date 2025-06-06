import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Chip,
  Alert,
  CircularProgress,
  CardMedia,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Add as AddIcon } from '@mui/icons-material';

interface Turf {
  name: string;
  image?: string;
  details?: string;
  size?: string;
  sportsType?: string;
}

interface UserProfile {
  name: string;
  email: string;
  sports: string[];
  turfs?: Turf[];
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [selectedTurf, setSelectedTurf] = useState<Turf | null>(null);

  // Add Turf Modal State
  const [addTurfOpen, setAddTurfOpen] = useState(false);
  const [newTurf, setNewTurf] = useState<Turf>({
    name: '',
    image: '',
    details: '',
    size: '',
    sportsType: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await new Promise((r) => setTimeout(r, 1000));
        const data: UserProfile = {
          name: 'Krishnendhu K',
          email: 'krish@example.com',
          sports: ['Football', 'Cricket'],
          turfs: [
            {
              name: 'Green Field',
              image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=60',
              details: 'Well maintained turf with night lighting',
              size: '100x50 meters',
              sportsType: 'Football',
            },
            {
              name: 'Sunrise Turf',
              image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=500&q=60',
              details: 'Spacious turf with great facilities',
              size: '120x60 meters',
              sportsType: 'Cricket',
            },
          ],
        };
        setProfile(data);
        setEditedProfile(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      setLoading(true);
      localStorage.setItem('userData', JSON.stringify(editedProfile));
      setProfile(editedProfile);
      setIsEditing(false);
      setLoading(false);
    } catch {
      setError('Error saving profile');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedProfile) {
      setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
    }
  };

  // Add Turf modal handlers
  const openAddTurf = () => setAddTurfOpen(true);
  const closeAddTurf = () => {
    setAddTurfOpen(false);
    setNewTurf({ name: '', image: '', details: '', size: '', sportsType: '' });
  };

  const handleNewTurfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTurf({ ...newTurf, [e.target.name]: e.target.value });
  };

  const handleAddTurf = () => {
    if (!newTurf.name.trim()) {
      alert('Please enter Turf Name.');
      return;
    }

    if (editedProfile) {
      const updatedTurfs = editedProfile.turfs ? [...editedProfile.turfs, newTurf] : [newTurf];
      const updatedProfile = { ...editedProfile, turfs: updatedTurfs };
      setEditedProfile(updatedProfile);
      setProfile(updatedProfile);
      setSelectedTurf(newTurf); // Select newly added turf
      closeAddTurf();
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

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
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>
            My Profile
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {!isEditing ? (
              <Button variant="contained" startIcon={<EditIcon />} onClick={handleEdit}>
                Edit Profile
              </Button>
            ) : (
              <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} color="success">
                Save Changes
              </Button>
            )}
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Left side: Avatar and basic info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  mb: 2,
                  background: 'linear-gradient(45deg, #00E676, #4CAF50)',
                  fontSize: '3rem',
                }}
              >
                {profile?.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h6" sx={{ color: '#fff', textAlign: 'center' }}>
                {profile?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
                {profile?.email}
              </Typography>
            </Box>
          </Grid>

          {/* Right side: Editable fields and turf list + details */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {/* Profile editable fields */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={editedProfile?.name || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email" name="email" value={editedProfile?.email || ''} disabled sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ color: '#fff', mb: 1 }}>
                  Sports Offered
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profile?.sports.map((sport) => (
                    <Chip
                      key={sport}
                      label={sport}
                      sx={{
                        background: 'rgba(0, 230, 118, 0.1)',
                        border: '1px solid rgba(0, 230, 118, 0.3)',
                        color: '#00E676',
                      }}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Turf list and details */}
              <Grid item xs={12}>
                <Box sx={{ mt: 5 }}>
                  <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
                    My Turfs
                  </Typography>

                  {profile?.turfs && profile.turfs.length > 0 ? (
                    <List sx={{ bgcolor: 'rgba(255, 255, 255, 0.03)', borderRadius: 2 }}>
                      {profile.turfs.map((turf) => (
                        <ListItemButton key={turf.name} onClick={() => setSelectedTurf(turf)}>
                          <ListItemText primary={turf.name} primaryTypographyProps={{ sx: { color: '#00E676' } }} />
                        </ListItemButton>
                      ))}
                    </List>
                  ) : (
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
                      No turfs available. Please add a turf.
                    </Typography>
                  )}

                  {selectedTurf && (
                    <Box sx={{ mt: 4 }}>
                      <Divider sx={{ mb: 3, bgcolor: '#00E676' }} />
                      <Typography variant="h6" sx={{ color: '#fff' }}>
                        {selectedTurf.name}
                      </Typography>
                      {selectedTurf.image && (
                        <CardMedia
                          component="img"
                          image={selectedTurf.image}
                          alt={selectedTurf.name}
                          sx={{
                            width: '100%',
                            maxWidth: 500,
                            height: 'auto',
                            borderRadius: 2,
                            border: '1px solid rgba(0, 230, 118, 0.3)',
                          }}
                        />
                      )}
                      <Typography sx={{ mt: 2, color: 'rgba(255,255,255,0.9)' }}>{selectedTurf.details}</Typography>
                      {selectedTurf.size && (
                        <Typography sx={{ mt: 1, fontStyle: 'italic', color: 'rgba(0,230,118,0.8)' }}>
                          Size: {selectedTurf.size}
                        </Typography>
                      )}
                      {selectedTurf.sportsType && (
                        <Typography sx={{ mt: 1, fontStyle: 'italic', color: 'rgba(0,230,118,0.8)' }}>
                          Sports Type: {selectedTurf.sportsType}
                        </Typography>
                      )}
                    </Box>
                  )}

                  {/* Add Turf Button */}
                  <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={openAddTurf}
                      sx={{ color: '#00E676', borderColor: '#00E676' }}
                    >
                      Add Turf
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Add Turf Modal */}
        <Dialog open={addTurfOpen} onClose={closeAddTurf}>
          <DialogTitle>Add New Turf</DialogTitle>
          <DialogContent dividers>
            <TextField
              margin="dense"
              label="Turf Name"
              name="name"
              fullWidth
              required
              value={newTurf.name}
              onChange={handleNewTurfChange}
            />
            <TextField
              margin="dense"
              label="Image URL"
              name="image"
              fullWidth
              value={newTurf.image}
              onChange={handleNewTurfChange}
            />
            <TextField
              margin="dense"
              label="Size"
              name="size"
              fullWidth
              value={newTurf.size}
              onChange={handleNewTurfChange}
            />
            <TextField
              margin="dense"
              label="Sports Type"
              name="sportsType"
              fullWidth
              value={newTurf.sportsType}
              onChange={handleNewTurfChange}
            />
            <TextField
              margin="dense"
              label="Other Details"
              name="details"
              fullWidth
              multiline
              rows={3}
              value={newTurf.details}
              onChange={handleNewTurfChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAddTurf}>Cancel</Button>
            <Button onClick={handleAddTurf} variant="contained" color="success">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default Profile;
