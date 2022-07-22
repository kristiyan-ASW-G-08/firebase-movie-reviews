import React from 'react';
import { Container, Grid, Box, Button } from '@mui/material';
import { grey, blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import TMDBLOGO from '../../assets/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg';
const color = grey[900];
const button = blue[500];
const Footer = () => {
  return (
    <Box bgcolor={color} height={'20vh'} marginTop={5}>
      <Container maxWidth="lg">
        <Grid container >
          <Grid item xs={12} sm={12}padding={4}>
            <img src={TMDBLOGO} alt="tmdb logo" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Footer;
