import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Reports: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value);
  };

  // Sample data for revenue chart
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [45000, 52000, 48000, 55000, 60000, 65000],
        borderColor: '#2E7D32',
        backgroundColor: 'rgba(46, 125, 50, 0.5)',
      },
    ],
  };

  // Sample data for booking distribution
  const bookingData = {
    labels: ['Football', 'Cricket', 'Other Sports'],
    datasets: [
      {
        label: 'Bookings',
        data: [65, 30, 15],
        backgroundColor: [
          'rgba(46, 125, 50, 0.8)',
          'rgba(25, 118, 210, 0.8)',
          'rgba(156, 39, 176, 0.8)',
        ],
      },
    ],
  };

  // Sample data for peak hours
  const peakHoursData = {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
    datasets: [
      {
        label: 'Bookings',
        data: [5, 8, 12, 15, 20, 10],
        backgroundColor: 'rgba(46, 125, 50, 0.8)',
      },
    ],
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Reports</Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={handleTimeRangeChange}
          >
            <MenuItem value="week">Last Week</MenuItem>
            <MenuItem value="month">Last Month</MenuItem>
            <MenuItem value="year">Last Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Overview
            </Typography>
            <Line data={revenueData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Booking Distribution by Sport
            </Typography>
            <Bar data={bookingData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Peak Hours Analysis
            </Typography>
            <Bar data={peakHoursData} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Total Revenue</Typography>
                <Typography variant="h4">₹3,25,000</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Total Bookings</Typography>
                <Typography variant="h4">1,250</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Average Booking Value</Typography>
                <Typography variant="h4">₹2,600</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports; 