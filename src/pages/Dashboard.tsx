import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  // Sample data for charts
  const bookingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bookings',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: '#2E7D32',
        backgroundColor: 'rgba(46, 125, 50, 0.5)',
      },
    ],
  };

  const revenueData = {
    labels: ['Football', 'Cricket', 'Other Sports'],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ['#2E7D32', '#1B5E20', '#81C784'],
      },
    ],
  };

  const stats = [
    { title: 'Total Bookings', value: '156', color: '#2E7D32' },
    { title: 'Revenue', value: '₹45,000', color: '#1B5E20' },
    { title: 'Active Turfs', value: '4', color: '#81C784' },
    { title: 'Pending Requests', value: '12', color: '#4CAF50' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
                bgcolor: stat.color,
                color: 'white',
              }}
            >
              <Typography component="h2" variant="h6" gutterBottom>
                {stat.title}
              </Typography>
              <Typography component="p" variant="h4">
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Booking Trends
            </Typography>
            <Line data={bookingData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Distribution
            </Typography>
            <Doughnut data={revenueData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 