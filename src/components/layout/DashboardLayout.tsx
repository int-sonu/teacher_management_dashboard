import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, 
  ListItemButton, ListItemIcon, ListItemText, IconButton, Avatar, 
  InputBase, useTheme 
} from '@mui/material';
import { LayoutDashboard, Users, LogOut, Search, Bell, Menu, Info, Mail } from 'lucide-react';

const DRAWER_WIDTH = 260;

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/teachers', icon: <Users size={20} />, label: 'Teachers' },
   
  ];

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ 
          width: 32, height: 32, borderRadius: 2, 
          bgcolor: 'primary.main', display: 'flex', 
          alignItems: 'center', justifyContent: 'center' 
        }}>
          <Users size={18} color="#fff" />
        </Box>
        <Typography variant="h6" fontWeight="bold" color="primary.main">
          Course Space
        </Typography>
      </Box>

      <List sx={{ px: 2, flex: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <ListItem key={item.to} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={NavLink}
                to={item.to}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? 'primary.main' : 'transparent',
                  color: isActive ? 'primary.contrastText' : 'text.secondary',
                  '&:hover': {
                    bgcolor: isActive ? 'rgba(0, 109, 91, 0.9)' : 'rgba(0,0,0,0.04)',
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: 'inherit', 
                  minWidth: 40 
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ fontWeight: isActive ? 600 : 500 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ p: 2 }}>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => navigate('/')} 
            sx={{ borderRadius: 2, color: 'error.main', '&:hover': { bgcolor: 'error.light', color: 'error.contrastText' } }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <LogOut size={20} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" primaryTypographyProps={{ fontWeight: 500 }} />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: 'none',
          color: 'text.primary',
          borderRadius: 0,
          p: 0,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <Menu />
            </IconButton>
            
            <Box sx={{ 
              display: { xs: 'none', sm: 'flex' }, 
              alignItems: 'center', 
              bgcolor: 'background.default', 
              borderRadius: 3, 
              px: 2, py: 0.5,
              border: '1px solid',
              borderColor: 'divider',
            }}>
              <Search size={18} color={theme.palette.text.secondary} />
              <InputBase
                placeholder="Search teachers..."
                sx={{ ml: 1, flex: 1, color: 'text.primary', fontSize: '0.875rem' }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit">
              <Bell size={20} />
            </IconButton>
            <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
              A
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, borderRight: 'none', borderRadius: 0, p: 0 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, borderRadius: 0, p: 0 },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: '64px', 
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
