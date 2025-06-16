import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import axios from 'axios';

interface Booking {
  userid: string;
  turfId: string;
  name: string;
  turfLocation: string;
  sports: string[];
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          'https://turf-backend-7yqk.onrender.com/user/GetAllbooking'
        );
        setBookings(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bookings
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
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
                      <TableCell>{booking.userid}</TableCell>
                      <TableCell>{booking.turfId}</TableCell>
                      <TableCell>{booking.name}</TableCell>
                      <TableCell>{booking.turfLocation}</TableCell>
                      <TableCell>
                        {booking.sports.map((sport, i) => (
                          <Chip key={i} label={sport} size="small" sx={{ mr: 0.5 }} />
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
