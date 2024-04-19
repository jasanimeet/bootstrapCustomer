import React from 'react';
import { Typography as MuiTypography } from '@mui/material';

const Typography = ({
  key, sx, children, color, fontSize, fontWeight, ...props
}) => (
  <MuiTypography
    key={key}
    sx={{
      ...sx,
      fontFamily: 'calibri',
      fontSize: fontSize || '14px',
      fontWeight: fontWeight || 'normal',
    }}
    {...props}
  >
    {children}
  </MuiTypography>
);

export default Typography;
