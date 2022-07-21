import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const MovieCard: FC<any> = ({ movie, type }) => {
  return (
    <Grid item>
      <Card sx={{ maxWidth: 300, minHeight: 500 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.overview}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            component={Link}
            to={`/${type}/item/${movie.id}`}
            size="small"
            color="primary"
          >
            Leave a review
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MovieCard;
