import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import getData from './utilities/getData';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import MovieCard from './Components/MovieCard';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

function App() {
  const [movies, setMovies] = useState<any[]>();
  const [shows, setShows] = useState<any[]>();
  const matches = useMediaQuery('(min-width:600px)');
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  useEffect(() => {
    getData('/movie/popular').then(data => {

      setMovies(data.results);
    });
    getData('/tv/popular').then(data => {
 
      setShows(data.results);
  
    });
  }, []);
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Typography
        marginTop={3}
        marginBottom={3}
        marginLeft={5}
        variant="h4"
        component="h2"
      >
        Trending
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {/*
 // @ts-ignore */}
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Movies" value="1" />
            <Tab label="TV Shows" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {' '}
          <Grid
            marginTop={4}
            container
            margin={'auto'}
            alignItems="center"
            direction={matches ? 'row' : 'column'}
            spacing={3}
          >
            {movies?.map(movie => (
              <MovieCard key={movie.id} movie={movie} type={'movie'} />
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value="2">
          <Grid
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
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default App;
