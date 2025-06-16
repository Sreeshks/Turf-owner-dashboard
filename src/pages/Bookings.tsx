import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/api';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import axios from 'axios';

interface Booking {
  _id: string;
  user: string;
  turf: string;
  date: string;
  startTime: string;
  endTime: string;
  sport: string;
  status: string;
  paymentStatus: string;
  amount: number;
}

// Optional: Define a type for the display-friendly booking data
interface DisplayBooking {
  user: string;
  turf: string;
  name: string; // You may need to fetch or derive this
  turfLocation: string; // You may need to fetch or derive this
  sports: string[];
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<DisplayBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${BASE_URL}/user/GetAllbooking`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.data && Array.isArray(response.data)) {
        // Map API response to the expected DisplayBooking format
        const formattedBookings: DisplayBooking[] = response.data.map((booking: Booking) => ({
          user: booking.user,
          turf: booking.turf,
          name: 'Unknown Turf', // Replace with actual turf name if available
          turfLocation: 'Unknown Location', // Replace with actual location if available
          sports: [booking.sport], // Convert single sport string to array
        }));
        setBookings(formattedBookings);
      } else {
        setError('Invalid response format from server');
      }
    } catch (err: any) {
      console.error('Error fetching bookings:', err);
      setError(err.response?.data?.message || 'Failed to fetch bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRefresh = () => {
    fetchBookings();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Bookings</Typography>
        <Tooltip title="Refresh bookings">
          <IconButton onClick={handleRefresh} color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : bookings.length === 0 ? (
        <Alert severity="info">No bookings found.</Alert>
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>Turf ID</TableCell>
                  <TableCell>Turf Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Sports</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((booking, index) => (
                    <TableRow key={index}>
                      <TableCell>{booking.user}</TableCell>
                      <TableCell>{booking.turf}</TableCell>
                      <TableCell>{booking.name}</TableCell>
                      <TableCell>{booking.turfLocation}</TableCell>
                      <TableCell>
                        {booking.sports.map((sport, i) => (
                          <Chip
                            key={i}
                            label={sport}
                            size="small"
                            sx={{
                              mr: 0.5,
                              backgroundColor: 'rgba(0, 230, 118, 0.1)',
                              color: '#00E676',
                              border: '1px solid rgba(0, 230, 118, 0.2)',
                            }}
                          />
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={bookings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
};

export default Bookings;