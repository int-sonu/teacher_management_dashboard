import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Stack,
  Grid
} from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'white', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={8} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Stack spacing={4}>
              <Box>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: { xs: '3rem', md: '5rem' }, 
                    lineHeight: 1.1,
                    mb: 3,
                    fontWeight: 900,
                    color: '#1e293b',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Improve you’r <Box component="span" sx={{ color: '#00a884', position: 'relative', display: 'inline-block' }}>
                    Skill
                    <Box component="span" sx={{ 
                      position: 'absolute', 
                      bottom: -8, 
                      left: 0, 
                      width: '100%', 
                      height: 6, 
                      bgcolor: '#f7a400', 
                      borderRadius: 4 
                    }} />
                  </Box> <br />
                  with Different Way
                </Typography>
                <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 540, mx: { xs: 'auto', md: 0 }, fontSize: '1.25rem', lineHeight: 1.6, mb: 2 }}>
                  Experience a revolutionary way of academic tracking and growth. 
                  Set your own pace, manage your resources, and excel in your field 
                  with our professional management suite.
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button 
                  component={Link}
                  to="/dashboard"
                  variant="contained" 
                  size="large" 
                  sx={{ 
                    bgcolor: '#006d5b', 
                    borderRadius: '50px', 
                    py: 2.5, 
                    px: 6,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    fontWeight: 800,
                    '&:hover': { bgcolor: '#005a4a' },
                    boxShadow: '0 20px 40px rgba(0, 109, 91, 0.25)'
                  }}
                >
                  Get Started for Free
                </Button>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ 
              position: 'relative', 
              width: '100%', 
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}>
              <Box 
                component="img"
                src="/home.jpg"
                alt="Online Learning"
                sx={{
                  width: '100%',
                  height: 'calc(100vh - 300px)',
                  maxHeight: '480px',
                  objectFit: 'cover',
                  borderRadius: '24px',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.15)'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
