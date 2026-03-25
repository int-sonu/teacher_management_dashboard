import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import DashboardLayout from './components/layout/DashboardLayout';
import PublicLayout from './components/layout/PublicLayout';
import DashboardHome from './pages/DashboardHome';
import TeachersPage from './pages/TeachersPage';
import LandingPage from './pages/LandingPage';
import { AboutPage, ContactPage, AuthPage } from './pages/StaticPages';
import Toast from './components/common/Toast';
import { useAppSelector } from './app/hooks';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAppSelector((state) => state.auth.token);
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><AuthPage mode="login" /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><AuthPage mode="register" /></PublicLayout>} />

          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><DashboardHome /></DashboardLayout></ProtectedRoute>} />
          <Route path="/teachers" element={<ProtectedRoute><DashboardLayout><TeachersPage /></DashboardLayout></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toast />
      </Router>
    </ThemeProvider>
  );
};

export default App;
