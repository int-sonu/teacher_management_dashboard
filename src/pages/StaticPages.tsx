import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Paper, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginUser, registerUser, clearError } from '../features/auth/authSlice';
import { showToast } from '../features/toast/toastSlice';

export const AboutPage = () => (
  <Box sx={{ maxWidth: 'md', mx: 'auto', py: 10, px: 3, display: 'flex', flexDirection: 'column', gap: 6 }}>
    <Typography variant="h2" fontWeight="900" color="text.primary" sx={{ letterSpacing: '-0.02em', textAlign: 'center' }}>
      Revolutionizing Academic Management
    </Typography>
    <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.8, textAlign: 'center', fontWeight: 500 }}>
      Our mission is to empower educational institutions with cutting-edge tools 
      that simplify administrative complexity and allow educators to focus on 
      what matters most: teaching.
    </Typography>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mt: 4 }}>
      <Paper elevation={0} sx={{ p: 5, borderRadius: 4, border: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
        <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>Our Vision</Typography>
        <Typography variant="body1" color="text.secondary">To be the global standard for educational operating systems.</Typography>
      </Paper>
      <Paper elevation={0} sx={{ p: 5, borderRadius: 4, border: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
        <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>Our Values</Typography>
        <Typography variant="body1" color="text.secondary">Transparency, Innovation, and Student-First philosophy.</Typography>
      </Paper>
    </Box>
  </Box>
);

export const ContactPage = () => (
  <Box sx={{ maxWidth: 'md', mx: 'auto', py: 10, px: 3 }}>
    <Paper elevation={0} sx={{ p: { xs: 5, md: 8 }, borderRadius: 6, border: '1px solid', borderColor: 'divider', textAlign: 'center', bgcolor: 'background.default' }}>
      <Typography variant="h3" fontWeight="900" color="text.primary" mb={2}>
        Get in Touch
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={6}>
        Need academic support or have a partnership inquiry? We're here for you.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, justifyContent: 'center' }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider', flex: 1 }}>
          <Typography variant="overline" display="block" color="text.secondary" fontWeight="bold" letterSpacing={1} mb={1}>
            Email Support
          </Typography>
          <Typography variant="body1" color="primary.main" fontWeight="bold">
            support@teacheros.io
          </Typography>
        </Paper>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider', flex: 1 }}>
          <Typography variant="overline" display="block" color="text.secondary" fontWeight="bold" letterSpacing={1} mb={1}>
            Main Office
          </Typography>
          <Typography variant="body1" color="primary.main" fontWeight="bold">
            Academic Square, SF
          </Typography>
        </Paper>
      </Box>
    </Paper>
  </Box>
);

export const AuthPage = ({ mode }: { mode: 'login' | 'register' }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);
  const isLogin = mode === 'login';

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    dispatch(clearError());
    setForm({ name: '', email: '', password: '' });
  }, [mode, dispatch]);

  useEffect(() => {
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [token, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      dispatch(showToast({ type: 'error', message: 'Please fill in all required fields' }));
      return;
    }

    try {
      if (isLogin) {
        await dispatch(loginUser({ email: form.email, password: form.password })).unwrap();
        dispatch(showToast({ type: 'success', message: 'Signed in successfully!' }));
      } else {
        await dispatch(registerUser({ name: form.name, email: form.email, password: form.password })).unwrap();
        dispatch(showToast({ type: 'success', message: 'Registration successful!' }));
      }
    } catch (err: any) {
    
      dispatch(showToast({ type: 'error', message: err.message || 'Authentication failed' }));
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 12 }}>
      <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, width: '100%', maxWidth: 480, borderRadius: 4, border: '1px solid #f1f5f9', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: '#1e293b', textAlign: 'center' }}>
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
          {isLogin ? 'Enter your credentials to access the dashboard' : 'Sign up to start managing your academic environment'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {!isLogin && (
            <TextField 
              fullWidth 
              label="Full Name" 
              name="name"
              value={form.name}
              onChange={handleChange}
              variant="outlined" 
              disabled={loading}
              autoComplete="name"
            />
          )}
          <TextField 
            fullWidth 
            label="Email Address" 
            name="email"
            type="email" 
            value={form.email}
            onChange={handleChange}
            variant="outlined" 
            disabled={loading}
            autoComplete="email"
          />
          <TextField 
            fullWidth 
            label="Password" 
            name="password"
            type="password" 
            value={form.password}
            onChange={handleChange}
            variant="outlined" 
            disabled={loading}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
          
          <Button 
            type="submit"
            variant="contained" 
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{ mt: 2, bgcolor: '#006d5b', '&:hover': { bgcolor: '#005a4a' }, borderRadius: 2, py: 1.5, textTransform: 'none', fontWeight: 700 }}
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Link to={isLogin ? "/register" : "/login"} style={{ color: '#006d5b', fontWeight: 700, textDecoration: 'none' }}>
                {isLogin ? 'Sign up' : 'Log in'}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
