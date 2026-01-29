import { Button, Typography } from '@mui/material';
import './ActionBarButton.css';
import React from 'react';

export const ActionBarButton = ({
  label,
  children,
  selected,
  onClick,
}: React.PropsWithChildren<{
  onClick: () => void;
  selected: boolean;
  label: string;
}>) => (
  <Button
    size="small"
    className="actionBarButton"
    variant="contained"
    color={selected ? 'secondary' : 'primary'}
    onClick={onClick}
    sx={{ position: 'relative' }}
  >
    {children}
    <Typography
      fontSize={7}
      color={selected ? 'primary' : 'secondary'}
      sx={{ position: 'absolute', bottom: '1px' }}
    >
      {label}
    </Typography>
  </Button>
);
