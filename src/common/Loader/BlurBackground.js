import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

const BlurBackground = () => (
  <div style={{ textAlign: 'center' }}>
    <Backdrop open sx={{ color: '#fff', zIndex: 1100 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  </div>
);

export default BlurBackground;
