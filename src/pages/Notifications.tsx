import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Notifications as NotificationIcon,
  Event as EventIcon,
  Payment as PaymentIcon,
  Info as InfoIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

interface Notification {
  id: string;
  type: 'booking' | 'payment' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'New Booking',
      message: 'John Doe has booked Football Turf 1 for tomorrow at 2:00 PM',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of ₹1,500 received for booking #1234',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'system',
      title: 'System Update',
      message: 'New features have been added to your dashboard',
      time: '2 hours ago',
      read: true,
    },
  ]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, notificationId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedNotification(notificationId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNotification(null);
  };

  const handleMarkAsRead = () => {
    if (selectedNotification) {
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === selectedNotification
            ? { ...notification, read: true }
            : notification
        )
      );
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedNotification) {
      setNotifications(prev =>
        prev.filter(notification => notification.id !== selectedNotification)
      );
    }
    handleMenuClose();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <EventIcon sx={{ color: '#00E676' }} />;
      case 'payment':
        return <PaymentIcon sx={{ color: '#4CAF50' }} />;
      case 'system':
        return <InfoIcon sx={{ color: '#81C784' }} />;
      default:
        return <NotificationIcon />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking':
        return 'success';
      case 'payment':
        return 'primary';
      case 'system':
        return 'info';
      default:
        return 'default';
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
            Notifications
          </Typography>
          <Chip
            label={`${notifications.filter(n => !n.read).length} unread`}
            color="success"
            sx={{ ml: 2 }}
          />
        </Box>

        <List>
          {notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <ListItem
                sx={{
                  background: notification.read
                    ? 'transparent'
                    : 'rgba(0, 230, 118, 0.05)',
                  borderRadius: 2,
                  mb: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(0, 230, 118, 0.1)',
                  },
                }}
              >
                <ListItemIcon>
                  {getNotificationIcon(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: '#fff',
                          fontWeight: notification.read ? 400 : 600,
                        }}
                      >
                        {notification.title}
                      </Typography>
                      <Chip
                        label={notification.type}
                        size="small"
                        color={getNotificationColor(notification.type)}
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 0.5 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        {notification.message}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                      >
                        {notification.time}
                      </Typography>
                    </Box>
                  }
                />
                <IconButton
                  onClick={(e) => handleMenuClick(e, notification.id)}
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  <MoreVertIcon />
                </IconButton>
              </ListItem>
              {index < notifications.length - 1 && (
                <Divider sx={{ borderColor: 'rgba(0, 230, 118, 0.1)', my: 1 }} />
              )}
            </React.Fragment>
          ))}
        </List>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              background: 'rgba(13, 17, 23, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 230, 118, 0.3)',
              borderRadius: 2,
            },
          }}
        >
          <MenuItem onClick={handleMarkAsRead}>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: '#00E676' }} />
            </ListItemIcon>
            <ListItemText primary="Mark as read" />
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon sx={{ color: '#F44336' }} />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        </Menu>
      </Paper>
    </Box>
  );
};

export default Notifications; 