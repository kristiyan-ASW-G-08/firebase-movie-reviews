import {
  Grid,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../../Components/MovieCard';
import getData from '../../utilities/getData';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import ReviewForm from '../../Components/ReviewForm';
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import Review from '../../Components/Review';

const Movie = () => {
  const [movie, setMovie] = useState<any>();
  const [reviews, setReviews] = useState<any>();
  const { type, id } = useParams();
  const database = getFirestore();

  const reviewsRef = collection(database, 'reviews');
  //@ts-ignore
  const q = query(reviewsRef, where('movieId', '==', parseInt(id)));
  useEffect(() => {
    getData(`/${type}/${id}`).then(data => {
      setMovie(data);
    });
    onSnapshot(q, snapshot => {
      setReviews(snapshot.docs);
    });
  });
  const matches = useMediaQuery('(min-width:600px)');
  return (
    <div>
      {movie ? (
        <Grid
          container
          margin={'auto'}
          marginTop={4}
          alignItems="center"
          direction={matches ? 'row' : 'column'}
          marginX={matches ? 4 : 0}
          gap={5}
        >
          <Grid item>
            <Card sx={{ maxWidth: 300 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {movie.overview}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item marginRight={4}>
            <Typography gutterBottom variant="h4" component="div">
              {movie.title}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {movie.tagline}
            </Typography>

            <Typography gutterBottom variant="h6" component="div">
              Genres:
              <List dense={true}>
                {movie.genres.map((genre: any) => (
                  <ListItem key={genre.id}>
                    <ListItemText primary={genre.name} />
                  </ListItem>
                ))}
              </List>
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Revenue: {movie.revenue}
            </Typography>

            <Typography gutterBottom variant="h6" component="div">
              Runtime: {movie.runtime} minutes
            </Typography>
          </Grid>
          <Grid item marginRight={4}>
            <Typography gutterBottom variant="h6" component="div">
              Production Companies:
              <List dense={true}>
                {movie.production_companies.map((company: any) => (
                  <ListItem key={company.id}>
                    <ListItemText primary={company.name} />
                  </ListItem>
                ))}
              </List>
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Production Countries:
              <List dense={true}>
                {movie.production_countries.map((countries: any) => (
                  <ListItem key={countries.id}>
                    <ListItemText primary={countries.name} />
                  </ListItem>
                ))}
              </List>
            </Typography>
          </Grid>
          <Grid item container alignItems="center" gap={3} direction="column">
            <ReviewForm movieId={movie.id} />
            <Typography gutterBottom variant="h4" component="div">
              Reviews
            </Typography>
            {reviews?.map((review: any) => (
              <Review key={review.id} review={review.data()} />
            ))}
          </Grid>
        </Grid>
      ) : (
        ''
      )}
    </div>
  );
};

export default Movie;
