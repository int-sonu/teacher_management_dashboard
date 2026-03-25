import React, { useEffect } from 'react';
import { Users, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTeachers } from '../features/teachers/teacherSlice';
import { Box, Typography, Paper } from '@mui/material';

const DashboardHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const { teachers } = useAppSelector((state) => state.teachers);

  useEffect(() => {
    if (teachers.length === 0) {
      dispatch(fetchTeachers());
    }
  }, [dispatch, teachers.length]);

  return (
    <Box sx={{ animation: 'fadeIn 0.7s ease-in-out' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
        <Typography variant="h4" fontWeight="900" color="text.primary">
          Welcome, Administrator
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Here's a summary of the academic ecosystem today.
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
        <StatCard
          icon={<Users color="#60a5fa" size={24} />}
          label="Total Teachers"
          value={teachers.length.toString()}
        />

       
      
       
      </Box>
    </Box>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
}) => (
  <Paper 
    elevation={0}
    sx={{ 
      p: 3, 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2, 
      borderRadius: 4, 
      border: '1px solid', 
      borderColor: 'divider',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        borderColor: 'primary.main',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)'
      }
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ p: 1.5, bgcolor: 'background.default', borderRadius: 3, display: 'flex' }}>
        {icon}
      </Box>
      <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
        {trend}
      </Typography>
    </Box>
    <Box>
      <Typography variant="h3" fontWeight="900" color="text.primary">
        {value}
      </Typography>
      <Typography variant="body2" fontWeight="500" color="text.secondary" sx={{ mt: 0.5 }}>
        {label}
      </Typography>
    </Box>
  </Paper>
);

export default DashboardHome;