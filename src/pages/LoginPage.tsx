import {type FormEvent, useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Container, Chip, Snackbar,
} from '@mui/material';
import {useNavigate} from "react-router-dom";
import WithAuth, {type WithInjectedAuth} from "../utils/context/WithAuth.tsx";
import {loginUser} from "../api/auth.ts";

const LoginPage = (props: WithInjectedAuth) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log({ login, password });
    if(!login && !password) {
      setIsSnackbarOpen(true);
      return;
    }
    const response = await loginUser(login, password);
    if (response.success && response.token) {
      props.login(response.token);
      navigate("/dashboard");
    }
    setIsSnackbarOpen(true);
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" minHeight="100vh" alignItems="center" justifyContent="center">
        <Card sx={{ width: '100%', p: 2 }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Login"
                type="text"
                fullWidth
                margin="normal"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                Sign In
              </Button>
            </form>
            <Box marginTop={2} gap={2} sx={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="caption" align="center">
                Dont have an account?
              </Typography>
              <Chip label="Create an Account!" onClick={() => navigate('/register')} />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        message="Incorrect login data!"
        onClose={() => setIsSnackbarOpen(false)}
      />
    </Container>
  );
};

export default WithAuth(LoginPage);
