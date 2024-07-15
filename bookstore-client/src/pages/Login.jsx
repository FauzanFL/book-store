import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { login } from '../api/users';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await login({ username, password });
      if (res.status === 200) {
        navigate('/books');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <main className="flex items-center justify-center h-[100vh]">
        <CssBaseline />
        <Box
          sx={{
            width: 500,
            mx: 'auto',
            my: 4,
            py: 3,
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 1,
            border: 1,
            boxShadow: 2,
          }}
          variant="outlined"
        >
          <div className="mb-1">
            <div className="flex items-center justify-center gap-2">
              <img src="/bookstore.png" alt="" width={100} />
              <Typography variant="h5" gutterbottom>
                <b>Welcome to Bookstore!</b>
              </Typography>
            </div>
            <Typography
              variant="subtitle1"
              gutterbottom
              sx={{ textAlign: 'center' }}
            >
              Sign in to continue.
            </Typography>
          </div>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="username">Username</InputLabel>
              <OutlinedInput
                id="username"
                type="text"
                label="username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onChange={({ target }) => setPassword(target.value)}
                // type="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <div className="flex justify-center items-center">
              <Button onClick={handleLogin} variant="contained">
                Log in
              </Button>
            </div>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default Login;
