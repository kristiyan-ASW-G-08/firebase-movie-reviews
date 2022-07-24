import React, { FC } from 'react';
import { Formik, Form, FormikValues, useFormik } from 'formik';
import AuthSchema from '../../validtionSchemas/AuthSchema';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:600px)');
  const submitHandler = async (
    { email, password }: FormikValues,
    { setErrors }: any,
  ): Promise<void> => {
    console.log(email, password);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate('/');
    } catch (error: any) {
      console.log(JSON.stringify(error));
      if (error.code === 'auth/wrong-password') {
        setErrors({ password: 'Wrong Password!' });
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: AuthSchema,
    onSubmit: submitHandler,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        alignItems="center"
        direction="column"
        spacing={3}
        marginTop={20}
        height={'100%'}
        width="100%"
        style={{ width: '100vw' }}
      >
        <Grid item>
          <Typography variant="h4" component="h2">
            Log In
          </Typography>
          ;{' '}
        </Grid>
        <Grid item width={matches ? '50%' : '80%'}>
          <TextField
            data-testid="email"
            name="email"
            label="Email"
            variant="filled"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        <Grid item width={matches ? '50%' : '80%'}>
          <TextField
            data-testid="password"
            name="password"
            label="Password"
            variant="filled"
            type="password"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginPage;
