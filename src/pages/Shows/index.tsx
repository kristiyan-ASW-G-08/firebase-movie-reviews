import { Box } from '@material-ui/core';
import {
  Autocomplete,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  Typography,
  Pagination,
} from '@mui/material';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import MovieCard from '../../Components/MovieCard';
import getData from '../../utilities/getData';

const Shows = () => {
  const [genres, setGenres] = useState<any[]>([]);
  const [genre, setGenre] = useState<number>();
  const [shows, setShows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(500);
  useEffect(() => {
    getData('/genre/tv/list').then(data => {
      console.log(data.genres);
      setGenres(data.genres);
    });
  }, []);
  useEffect(() => {
    const getShows = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB}&with_genres=${genre}&page=${currentPage}`,
      );
      const data = await response.json();
      console.log(data);
      setShows(data.results);
      setCurrentPage(data.page);
    };
    getShows();
  }, [genre, currentPage]);

  const paginationHandler = (page: any) => {
    setCurrentPage(page);
    window.scroll(0, 0);
  };
  const matches = useMediaQuery('(min-width:600px)');
  return (
    <Grid padding={3}>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Genre</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Genre"
            //@ts-ignore
            onChange={e => setGenre(e.target.value)}
          >
            {genres
              ? genres.map(({ name, id }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))
              : ''}
          </Select>
        </FormControl>
      </Grid>
      {shows.length > 0 ? (
        <>
          <Grid
            item
            marginTop={4}
            container
            margin={'auto'}
            alignItems="center"
            direction={matches ? 'row' : 'column'}
            spacing={3}
          >
            {shows?.map(show => (
              <MovieCard key={show.id} movie={show} type={'tv'} />
            ))}
          </Grid>
          <Box marginTop={5}>
            <Pagination
              count={lastPage}
              page={currentPage}
              //@ts-ignore
              onChange={e => paginationHandler(e.target.textContent)}
            />
          </Box>
        </>
      ) : (
        <Typography
          marginTop={3}
          marginBottom={3}
          marginLeft={5}
          variant="h4"
          component="h2"
        >
          No Genre Selected
        </Typography>
      )}
    </Grid>
  );
};

export default Shows;
