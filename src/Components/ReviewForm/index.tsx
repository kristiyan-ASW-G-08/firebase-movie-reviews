import React, { FC, useContext } from 'react';
import { Formik, Form, FormikValues, useFormik } from 'formik';
import AuthSchema from '../../validtionSchemas/AuthSchema';
import { auth, app } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import ReviewSchema from '../../validtionSchemas/ReviewSchema';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import NotificationContext from '../../context/NotificationContext';

export const ReviewForm: FC<{ movieId: number }> = ({ movieId }) => {
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:600px)');
  const database = getFirestore();
  const reviewsRef = collection(database, 'reviews');
  const setNotificationState = useContext(NotificationContext);
  const submitHandler = async (
    { content }: FormikValues,
    { setErrors }: any,
  ): Promise<void> => {
    try {
      if (auth.currentUser) {
        addDoc(reviewsRef, {
          content,
          author: `/users/${auth.currentUser.uid}`,
          authorUsername: auth.currentUser.displayName,
          movieId,
        });
      } else {
        setNotificationState({
          type: 'warning',
          content: 'Login to leave a review!',
        });
      }
    } catch (error) {
      //   formErrorHandler(error, setErrors, notification =>
      //     notificationStore.setNotification(notification),
      //   );
    }
  };
  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: ReviewSchema,
    onSubmit: submitHandler,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        alignItems="center"
        direction="column"
        gap={3}
        item
        width={matches ? '50vw' : '100%'}
      >
        <Grid item>
          <Typography variant="h4" component="h2">
            Write Your Review
          </Typography>
          ;{' '}
        </Grid>
        <Grid item width={'100%'}>
          <TextField
            name="content"
            label="Enter your review"
            variant="filled"
            fullWidth
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
        </Grid>

        <Grid item>
          <Button type="submit" variant="contained">
            Post
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ReviewForm;
