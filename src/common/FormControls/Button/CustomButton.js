import { Skeleton } from '@mui/material';
import React, { lazy, Suspense } from 'react';

const Button = lazy(() => import('./Button'));

const CustomButton = ({ ...rest }) => (
  <Suspense fallback={<Skeleton variant="rectangular" width={80} height={40} />}>
    <Button {...rest} />
  </Suspense>
);

export default CustomButton;
