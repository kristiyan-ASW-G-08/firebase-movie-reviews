import React, { FC } from 'react';
import { Formik, Form, FormikValues, useFormik } from 'formik';
import AuthSchema from '../../validtionSchemas/AuthSchema';
import { auth, database } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import SignUpSchema from '../../validtionSchemas/SIgnUpSchema.';

export const SignUpPage: FC = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:600px)');
  const submitHandler = async (
    { email, password, username }: FormikValues,
    { setErrors }: any,
  ): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: username,
        });
        navigate('/');
      }
    } catch (error) {
      //   formErrorHandler(error, setErrors, notification =>
      //     notificationStore.setNotification(notification),
      //   );
    }
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: SignUpSchema,
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
            Sign Up
          </Typography>
          ;{' '}
        </Grid>
        <Grid item width={matches ? '50%' : '80%'}>
          <TextField
            name="username"
            label="Username"
            variant="filled"
            fullWidth
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>

        <Grid item width={matches ? '50%' : '80%'}>
          <TextField
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
            name="password"
            label="Password"
            variant="filled"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type="password"
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpPage;
