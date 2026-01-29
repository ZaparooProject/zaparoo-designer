import { Button } from '@mui/material';
import './ActionBarButton.css';
import React from 'react';

export const ActionBarButton = ({
  children,
  onClick,
}: React.PropsWithChildren<{ onClick: () => void }>) => (
  <Button
    size="small"
    className="actionBarButton"
    variant="contained"
    color="primary"
    onClick={onClick}
  >
    {children}
  </Button>
);
