import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { flow as compose, isUndefined } from 'lodash';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withTheme } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  CircularProgress,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Theme,
  Typography,
} from '@material-ui/core';

import LoginStyle from './LoginStyle';

import { fetchActiveUser, loginUser, writeCookie } from '../../endpoints';
import { ActiveUser, useActiveUserUpdate } from '../../context/ActiveUserContext';

const Login: FC<LoginProps> = ({ theme }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const setActiveUserUpdate = useActiveUserUpdate();

  const formik = useFormik({
    initialValues: {
      Email: '',
      Password: '',
    },
    onSubmit: async (values) => {
      setSubmitLoading(true);
      const JWTResponse = await loginUser(values);
      setSubmitLoading(false);
      if (isUndefined(JWTResponse)) setErrorMessage('Wrong email or password');
      else {
        writeCookie('token', JWTResponse.data);
        const userResponse = await fetchActiveUser();
        setActiveUserUpdate(userResponse.data as ActiveUser);
        navigate('/home');
      }
    },
  });

  return (
    <LoginStyle theme={theme}>
      <Grid container component="main" className="root">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="image" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="paper">
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className="form" onSubmit={formik.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="Email"
                autoComplete="email"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.Email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.Password}
              />

              <div id="errorMessage">
                <small>{errorMessage}</small>
              </div>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
                type="submit"
              >
                {submitLoading
                  ? <CircularProgress color="secondary" className="loadingSpinner" size={24} />
                  : 'Sign In'}
              </Button>
              <Box mt={5}>
                <Typography variant="body2" color="textSecondary" align="center">
                  {'Copyright © '}
                  <Link color="inherit" href="https://everscode.com/">
                    urielcookies
                  </Link>
                  &nbsp;
                  {new Date().getFullYear()}
                  &nbsp;
                </Typography>
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </LoginStyle>
  );
};

interface LoginProps {
  theme: Theme;
}

export default compose(
  withTheme,
)(Login);
