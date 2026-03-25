import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="fixed" elevation={0} sx={{ borderBottom: '1px solid #f1f5f9' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 80, justifyContent: 'space-between' }}>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontWeight: 900,
                color: 'primary.main',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              Teacher<Box component="span" sx={{ color: '#00a884' }}>Dashboard</Box>
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {navLinks.map((link) => (
                  <Typography
                    key={link.label}
                    component={NavLink}
                    to={link.to}
                    sx={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'text.secondary',
                      textDecoration: 'none',
                      transition: '0.3s',
                      '&.active': { color: 'primary.main' },
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {!isMobile && (
                <>
                  <Button 
                    component={Link} 
                    to="/dashboard" 
                    variant="text" 
                    sx={{ px: 2, color: 'text.secondary', fontWeight: 600, textTransform: 'none' }}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    component={Link} 
                    to="/login" 
                    variant="outlined" 
                    sx={{ borderRadius: 50, px: 4, borderColor: '#e2e8f0', color: 'text.primary', textTransform: 'none', fontWeight: 700 }}
                  >
                    Login
                  </Button>
                  <Button 
                    component={Link} 
                    to="/register" 
                    variant="contained" 
                    sx={{ borderRadius: 50, px: 4, bgcolor: '#006d5b', textTransform: 'none', fontWeight: 700 }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
              {isMobile && (
                <IconButton onClick={handleDrawerToggle} color="inherit">
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ '& .MuiDrawer-paper': { width: 280 } }}
      >
        <List sx={{ pt: 4 }}>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton component={Link} to={link.to} onClick={handleDrawerToggle}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard" onClick={handleDrawerToggle}>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/login" onClick={handleDrawerToggle}>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/register" onClick={handleDrawerToggle}>
              <ListItemText primary="Sign Up" sx={{ color: '#006d5b', fontWeight: 'bold' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ pt: 10, flexGrow: 1 }}>
        {children}
      </Box>

      <Box sx={{ py: 6, borderTop: '1px solid #f1f5f9', bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
           <Typography variant="body2" color="text.secondary" align="center">
             © 2026 Teacher Dashboard. Academic excellence redefined.
           </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default PublicLayout;
