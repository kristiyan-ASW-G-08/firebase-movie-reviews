import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Review: React.FC<any> = ({ review }) => {

  return (
    <Card sx={{ width: '80%' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {review.content}
        </Typography>
        <Typography variant="h5" component="div">
          {review.authorUsername}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Review;
