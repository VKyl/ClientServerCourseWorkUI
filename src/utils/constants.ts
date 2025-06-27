import { createTheme } from '@mui/material/styles';
import { green, teal, grey } from '@mui/material/colors';

const greenTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: green[600],
      light: green[400],
      dark: green[800],
      contrastText: '#ffffff'
    },
    secondary: {
      main: teal[500],
      contrastText: '#ffffff'
    },
    background: {
      default: '#f0fdf4',
      paper: '#ffffff',
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
    success: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

export default greenTheme;
