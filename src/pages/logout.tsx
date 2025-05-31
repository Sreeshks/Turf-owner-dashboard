import React, { useState } from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  ExitToApp as ExitIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LogoutComponent: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmLogout = () => {
    // Clear authentication token
    localStorage.removeItem('authToken');
    
    // Clear any other user data if needed
    localStorage.removeItem('userData');
    localStorage.removeItem('userPreferences');
    
    // Close dialog
    setOpenDialog(false);
    
    // Redirect to login page
    navigate('/login');
  };

  const handleCancelLogout = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {/* Logout Menu Item */}
      <ListItem 
        button 
        onClick={handleLogoutClick}
        sx={{
          mt: 2,
          borderRadius: 2,
          mx: 1,
          background: 'rgba(244, 67, 54, 0.1)',
          border: '1px solid rgba(244, 67, 54, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(244, 67, 54, 0.2)',
            border: '1px solid rgba(244, 67, 54, 0.5)',
            transform: 'translateX(8px)',
            boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)',
          },
        }}
      >
        <ListItemIcon>
          <LogoutIcon sx={{ color: '#F44336' }} />
        </ListItemIcon>
        <ListItemText 
          primary="Logout" 
          sx={{ 
            '& .MuiListItemText-primary': { 
              color: '#F44336',
              fontWeight: 600,
            } 
          }} 
        />
      </ListItem>

      {/* Logout Confirmation Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCancelLogout}
        PaperProps={{
          sx: {
            background: 'rgba(13, 17, 23, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 230, 118, 0.3)',
            borderRadius: 3,
            minWidth: 400,
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <ExitIcon sx={{ color: '#F44336', mr: 2, fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
              Confirm Logout
            </Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
            Are you sure you want to logout? You will need to login again to access your dashboard.
          </Typography>
          <Box 
            sx={{ 
              p: 2, 
              background: 'rgba(244, 67, 54, 0.1)',
              border: '1px solid rgba(244, 67, 54, 0.3)',
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: '#F44336' }}>
              ⚠️ All unsaved changes will be lost.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={handleCancelLogout}
            variant="outlined"
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: '#fff',
              '&:hover': {
                borderColor: '#00E676',
                backgroundColor: 'rgba(0, 230, 118, 0.1)',
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmLogout}
            variant="contained"
            sx={{
              backgroundColor: '#F44336',
              color: '#fff',
              ml: 2,
              '&:hover': {
                backgroundColor: '#D32F2F',
                boxShadow: '0 4px 12px rgba(244, 67, 54, 0.4)',
              },
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogoutComponent;