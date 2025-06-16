import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import axios from 'axios';

interface Turf {
  turfId: string;
  userid: string;
  name: string;
  turfLocation: string;
  sports: string[];
}

const TurfManagement: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTurf, setSelectedTurf] = useState<Turf | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    turfLocation: '',
    sports: ['Football'],
  });
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchTurfs = async () => {
    try {
      const response = await axios.get(
        'https://turf-backend-7yqk.onrender.com/turf-owner/getallturfs'
      );
      setTurfs(response.data);
    } catch (error) {
      console.error('Failed to fetch turfs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  const handleOpenDialog = (turf?: Turf) => {
    if (turf) {
      setSelectedTurf(turf);
      setFormData({
        name: turf.name,
        turfLocation: turf.turfLocation,
        sports: turf.sports,
      });
    } else {
      setSelectedTurf(null);
      setFormData({
        name: '',
        turfLocation: '',
        sports: ['Football'],
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTurf(null);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'sports' ? [value] : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://turf-backend-7yqk.onrender.com/turf-owner/addturf',
        formData
      );
      setSuccessMessage('Turf added successfully!');
      console.log(response.data);
      handleCloseDialog();
      fetchTurfs(); // refresh the turf list
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || 'Failed to add turf. Please try again.'
      );
      console.error(error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Turf Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New Turf
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {turfs.map((turf) => (
            <Grid item xs={12} sm={6} md={4} key={turf.turfId}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">{turf.name}</Typography>
                    <Box>
                      <IconButton size="small" onClick={() => handleOpenDialog(turf)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography color="textSecondary" gutterBottom>
                    Location: {turf.turfLocation}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Sports:
                  </Typography>
                  {turf.sports.map((sport, idx) => (
                    <Chip
                      key={idx}
                      label={sport}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedTurf ? 'Edit Turf' : 'Add New Turf'}</DialogTitle>
        <DialogContent>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <TextField
            margin="dense"
            label="Turf Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Location"
            name="turfLocation"
            value={formData.turfLocation}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Sport Type"
            name="sports"
            value={formData.sports[0]}
            onChange={handleChange}
            select
            fullWidth
          >
            <MenuItem value="Football">Football</MenuItem>
            <MenuItem value="Cricket">Cricket</MenuItem>
            <MenuItem value="Badminton">Badminton</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {selectedTurf ? 'Save Changes' : 'Add Turf'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TurfManagement;
