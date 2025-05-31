import React, { useState } from 'react';
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
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface Turf {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'maintenance' | 'inactive';
  capacity: number;
  price: number;
}

const TurfManagement: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTurf, setSelectedTurf] = useState<Turf | null>(null);

  // Sample turf data
  const turfs: Turf[] = [
    {
      id: '1',
      name: 'Football Turf 1',
      type: 'Football',
      status: 'active',
      capacity: 10,
      price: 1500,
    },
    {
      id: '2',
      name: 'Cricket Turf 1',
      type: 'Cricket',
      status: 'maintenance',
      capacity: 22,
      price: 2000,
    },
    {
      id: '3',
      name: 'Football Turf 2',
      type: 'Football',
      status: 'active',
      capacity: 10,
      price: 1500,
    },
  ];

  const handleOpenDialog = (turf?: Turf) => {
    setSelectedTurf(turf || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTurf(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'maintenance':
        return 'warning';
      case 'inactive':
        return 'error';
      default:
        return 'default';
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

      <Grid container spacing={3}>
        {turfs.map((turf) => (
          <Grid item xs={12} sm={6} md={4} key={turf.id}>
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
                  Type: {turf.type}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Capacity: {turf.capacity} players
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Price: ₹{turf.price}/hour
                </Typography>
                <Chip
                  label={turf.status}
                  color={getStatusColor(turf.status)}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedTurf ? 'Edit Turf' : 'Add New Turf'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Turf Name"
            fullWidth
            variant="outlined"
            defaultValue={selectedTurf?.name}
          />
          <TextField
            margin="dense"
            label="Type"
            fullWidth
            variant="outlined"
            defaultValue={selectedTurf?.type}
          />
          <TextField
            margin="dense"
            label="Capacity"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={selectedTurf?.capacity}
          />
          <TextField
            margin="dense"
            label="Price per Hour"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={selectedTurf?.price}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {selectedTurf ? 'Save Changes' : 'Add Turf'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TurfManagement; 