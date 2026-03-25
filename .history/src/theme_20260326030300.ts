import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#006d5b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f7a400',
    },
    background: {
      default: '#f8fafc', // 🔥 better soft background
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 900,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    // 🔥 BUTTON
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 20px',
          borderRadius: '10px',
        },
        containedPrimary: {
          backgroundColor: '#006d5b',
          '&:hover': {
            backgroundColor: '#005a4a',
          },
        },
      },
    },

    // 🔥 CARD / PAPER
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          padding: '16px',
        },
      },
    },

    // 🔥 TABLE
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          backgroundColor: '#f1f5f9',
        },
        root: {
          padding: '12px',
        },
      },
    },

    // 🔥 INPUT
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },

    // 🔥 APPBAR
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1e293b',
          boxShadow: 'none',
          borderBottom: '1px solid #e2e8f0',
        },
      },
    },
  },
});

export default theme;