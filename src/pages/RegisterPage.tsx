import { type FormEvent, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Container,
  Chip, Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WithAuth, {type WithInjectedAuth} from "../utils/context/WithAuth.tsx";
import {registerUser} from "../api/auth.ts";

const RegisterPage = (props: WithInjectedAuth) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log({ login, password });
    if (password.length < 4)
      setIsSnackbarOpen(true);
    const response = await registerUser(login, password);
    if (response.success && response.token){
      props.login(response.token)
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
              Register
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
                Create Account
              </Button>
            </form>
            <Box marginTop={2} sx={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="caption" align="center">
                Already have an account?
              </Typography>
              <Chip label="Login!" onClick={() => navigate('/login')} />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        message="Incorrect registration data!"
        onClose={() => setIsSnackbarOpen(false)}
      />
    </Container>
  );
};

export default WithAuth(RegisterPage);
