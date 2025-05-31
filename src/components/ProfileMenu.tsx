import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  AccountCircle,
  Settings,
  Notifications,
  Help,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ProfileMenuProps {
  onLogout?: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  // Sample user data - in real app, this would come from context/state
  const userData = {
    name: 'John Smith',
    email: 'john.smith@turfmanager.com',
    role: 'Admin',
    avatar: null, // Will show initials if no avatar
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleClose();
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    handleClose();
  };

  const handleLogout = () => {
    handleClose();
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      navigate('/login');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          ml: 2,
          border: '2px solid rgba(0, 230, 118, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '2px solid rgba(0, 230, 118, 0.6)',
            boxShadow: '0 0 20px rgba(0, 230, 118, 0.3)',
          },
        }}
        aria-controls={open ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            background: 'linear-gradient(45deg, #00E676, #4CAF50)',
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
          src={userData.avatar || undefined}
        >
          {!userData.avatar && getInitials(userData.name)}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1.5,
            minWidth: 280,
            background: 'rgba(13, 17, 23, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 230, 118, 0.3)',
            borderRadius: 3,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'rgba(13, 17, 23, 0.95)',
              border: '1px solid rgba(0, 230, 118, 0.3)',
              borderRight: 'none',
              borderBottom: 'none',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* User Info Header */}
        <Box sx={{ px: 3, py: 2, borderBottom: '1px solid rgba(0, 230, 118, 0.2)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar
              sx={{
                width: 50,
                height: 50,
                background: 'linear-gradient(45deg, #00E676, #4CAF50)',
                mr: 2,
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
              src={userData.avatar || undefined}
            >
              {!userData.avatar && getInitials(userData.name)}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                {userData.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {userData.email}
              </Typography>
              <Box
                sx={{
                  display: 'inline-block',
                  px: 1,
                  py: 0.5,
                  background: 'rgba(0, 230, 118, 0.2)',
                  borderRadius: 1,
                  mt: 0.5,
                }}
              >
                <Typography variant="caption" sx={{ color: '#00E676', fontWeight: 'bold' }}>
                  {userData.role}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Menu Items */}
        <MenuItem
          onClick={handleProfileClick}
          sx={{
            py: 1.5,
            px: 3,
            '&:hover': {
              backgroundColor: 'rgba(0, 230, 118, 0.1)',
            },
          }}
        >
          <ListItemIcon>
            <AccountCircle sx={{ color: '#00E676' }} />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ color: '#fff' }}>My Profile</Typography>
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={handleSettingsClick}
          sx={{
            py: 1.5,
            px: 3,
            '&:hover': {
              backgroundColor: 'rgba(0, 230, 118, 0.1)',
            },
          }}
        >
          <ListItemIcon>
            <Settings sx={{ color: '#4CAF50' }} />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ color: '#fff' }}>Settings</Typography>
          </ListItemText>
        </MenuItem>

        <MenuItem
          sx={{
            py: 1.5,
            px: 3,
            '&:hover': {
              backgroundColor: 'rgba(0, 230, 118, 0.1)',
            },
          }}
        >
          <ListItemIcon>
            <Notifications sx={{ color: '#81C784' }} />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ color: '#fff' }}>Notifications</Typography>
          </ListItemText>
        </MenuItem>

        <MenuItem
          sx={{
            py: 1.5,
            px: 3,
            '&:hover': {
              backgroundColor: 'rgba(0, 230, 118, 0.1)',
            },
          }}
        >
          <ListItemIcon>
            <Help sx={{ color: '#66BB6A' }} />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ color: '#fff' }}>Help & Support</Typography>
          </ListItemText>
        </MenuItem>

        <Divider sx={{ borderColor: 'rgba(0, 230, 118, 0.2)', my: 1 }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 1.5,
            px: 3,
            '&:hover': {
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon sx={{ color: '#F44336' }} />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ color: '#F44336' }}>Logout</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;