import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
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
import { useEffect, useState } from 'react';
import { isLogin, login } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { alertError, alertSuccess } from '../utils/sweetalert';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const isLoggedIn = async () => {
      const res = await isLogin();
      if (res.status === 200) {
        navigate('/books');
      }
    };

    isLoggedIn();
  }, [navigate]);

  const isValid = () => {
    let valid = true;
    const msg = [];
    if (username === '') {
      msg.push("Username can't be empty");
      valid = false;
    }

    if (password === '') {
      msg.push("Password can't be empty");
      valid = false;
    }

    setMessages(msg);
    return valid;
  };

  const handleLogin = async () => {
    if (isValid()) {
      try {
        const res = await login({ username, password });
        if (res.status === 200) {
          setShowPassword(false);
          alertSuccess('Login Successful');
          navigate('/books');
        }
      } catch (e) {
        const msg = [];
        const status = e.response.status;
        const resMsg = e.response.data.message;
        if (status === 404 && resMsg == 'User not found') {
          msg.push('Wrong Username');
          setMessages(msg);
          setShowAlert(true);
        } else if (status === 401 && resMsg == 'Invalid password') {
          msg.push('Wrong Password');
          setMessages(msg);
          setShowAlert(true);
        } else {
          alertError(resMsg);
        }
      }
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      <main className="flex items-center justify-center h-[100vh]">
        <CssBaseline />
        <Box
          sx={{
            maxWidth: 500,
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
            {showAlert && (
              <Alert severity="error" sx={{ m: 1 }}>
                <ul className="list-disc ml-4">
                  {messages.map((msg, i) => {
                    return <li key={i}>{msg}</li>;
                  })}
                </ul>
              </Alert>
            )}
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
