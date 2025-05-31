import React from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent, useTheme } from '@mui/material';
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
  BarElement,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  TrendingUp,
  SportsSoccer,
  AttachMoney,
  Schedule,
  People,
  Assessment,
} from '@mui/icons-material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const theme = useTheme();

  // Enhanced chart data with gradient effects
  const bookingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bookings',
        data: [65, 59, 80, 81, 56, 85],
        borderColor: '#00E676',
        backgroundColor: 'rgba(0, 230, 118, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#00E676',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const revenueData = {
    labels: ['Football', 'Cricket', 'Other Sports'],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: [
          'rgba(0, 230, 118, 0.8)',
          'rgba(76, 175, 80, 0.8)',
          'rgba(129, 199, 132, 0.8)',
        ],
        borderColor: [
          '#00E676',
          '#4CAF50',
          '#81C784',
        ],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  // New hourly bookings data
  const hourlyBookingsData = {
    labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM'],
    datasets: [
      {
        label: 'Bookings',
        data: [12, 19, 25, 30, 28, 35, 40, 25],
        backgroundColor: 'rgba(0, 230, 118, 0.6)',
        borderColor: '#00E676',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const stats = [
    { 
      title: 'Total Bookings', 
      value: '1,256', 
      change: '+12%',
      icon: <Schedule sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(135deg, #00E676 0%, #4CAF50 100%)'
    },
    { 
      title: 'Monthly Revenue', 
      value: '₹1,45,000', 
      change: '+18%',
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)'
    },
    { 
      title: 'Active Turfs', 
      value: '8', 
      change: '+2',
      icon: <SportsSoccer sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(135deg, #81C784 0%, #66BB6A 100%)'
    },
    { 
      title: 'Total Customers', 
      value: '892', 
      change: '+24%',
      icon: <People sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%)'
    },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#00E676',
        bodyColor: '#fff',
        borderColor: '#00E676',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#fff',
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#00E676',
        bodyColor: '#fff',
        borderColor: '#00E676',
        borderWidth: 1,
      },
    },
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0D1117 0%, #161B22 50%, #21262D 100%)',
      p: 3,
    }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            color: '#fff',
            fontWeight: 'bold',
            mb: 1,
            background: 'linear-gradient(45deg, #00E676, #4CAF50)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Dashboard Overview
        </Typography>
        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Welcome back! Here's what's happening with your turf business today.
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.title}>
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 230, 118, 0.2)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0, 230, 118, 0.3)',
                  border: '1px solid rgba(0, 230, 118, 0.5)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      background: stat.gradient,
                      borderRadius: '50%',
                      p: 1,
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 0.5 }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: '#fff', 
                        fontWeight: 'bold',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ color: '#00E676', mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#00E676' }}>
                    {stat.change} from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Booking Trends Chart */}
        <Grid item xs={12} lg={8}>
          <Paper
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 230, 118, 0.2)',
              borderRadius: 3,
              height: 400,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Assessment sx={{ color: '#00E676', mr: 2, fontSize: 28 }} />
              <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>
                Booking Trends
              </Typography>
            </Box>
            <Box sx={{ height: 300 }}>
              <Line data={bookingData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Revenue Distribution */}
        <Grid item xs={12} lg={4}>
          <Paper
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 230, 118, 0.2)',
              borderRadius: 3,
              height: 400,
            }}
          >
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold', mb: 3 }}>
              Revenue Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <Doughnut data={revenueData} options={doughnutOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Peak Hours Analysis */}
        <Grid item xs={12} lg={6}>
          <Paper
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 230, 118, 0.2)',
              borderRadius: 3,
              height: 350,
            }}
          >
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold', mb: 3 }}>
              Peak Hours Analysis
            </Typography>
            <Box sx={{ height: 250 }}>
              <Bar data={hourlyBookingsData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} lg={6}>
          <Paper
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 230, 118, 0.2)',
              borderRadius: 3,
              height: 350,
            }}
          >
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold', mb: 3 }}>
              Quick Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h3" sx={{ color: '#00E676', fontWeight: 'bold' }}>
                    94%
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Occupancy Rate
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h3" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                    4.8
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Average Rating
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h3" sx={{ color: '#81C784', fontWeight: 'bold' }}>
                    2.3h
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Avg Session Time
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h3" sx={{ color: '#66BB6A', fontWeight: 'bold' }}>
                    156
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    New Customers
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;