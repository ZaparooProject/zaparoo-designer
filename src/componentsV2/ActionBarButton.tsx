import { Button } from '@mui/material';
import './ActionBarButton.css';
import React from 'react';

export const ActionBarButton = ({ children }: React.PropsWithChildren) => (
  <Button
    size="small"
    className="actionBarButton"
    variant="contained"
    color="primary"
  >
    {children}
  </Button>
);
