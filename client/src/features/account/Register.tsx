import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';
import agent from '../../app/api/agent';

const theme = createTheme();

export default function Register() {

    const history = useHistory();
    const dispatch = useAppDispatch();

    const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'all'
    });

    const handleApiError = (errors: any) => {
        if (errors){
            errors.forEach((error: string) => {
                if (error.includes('password')){
                    setError('password', { message: 'Invalid Password.'})
                }
                else if (error.includes('username')){
                    setError('username', {message: 'Invalid username'})
                } 
                else if (error.includes('email')) {
                    setError('email', {
                        message: "invalid email"
                    });
                }
            });
        }

    }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" 
          onSubmit={handleSubmit((data)=>   
            agent.Account.register(data).catch(error => handleApiError(error)))} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              autoFocus
              {...register('username', {
                required: "Username is required"
            })}
            error={!!errors.username}
            helperText={!errors?.username?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              {...register('email', {
                required: "Email is required",
                        pattern:{
                            value: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
                            message: 'Invalid email'
                        } 
            })}
            error={!!errors.email}
            helperText={!errors?.email?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register('password', {
                required: "password is required",
                pattern: {
                    value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                    message: 'Password complexity is not enough'

                }
              })}
              error={!!errors.password}
            helperText={!errors?.password?.message}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
                loading={isSubmitting}
              type="submit"
              disabled={!isValid}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </LoadingButton>
            <Grid container>
              
              <Grid item>
                <Link href="/Login" variant="body2">
                  {"Already have account? login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}