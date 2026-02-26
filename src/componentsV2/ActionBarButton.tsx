import { Button, Tooltip, Typography } from '@mui/material';
import './ActionBarButton.css';
import React from 'react';

export const ActionBarButton = ({
  label,
  children,
  selected,
  onClick,
  className,
  disabled = false,
  tooltip,
}: React.PropsWithChildren<{
  onClick: () => void;
  selected: boolean;
  label: string;
  className?: string;
  disabled?: boolean;
  tooltip?: string;
}>) => {
  const button = (
    <Button
      size="small"
      className={`actionBarButton ${className ?? ''}`}
      variant="contained"
      color={selected ? 'secondary' : 'primary'}
      onClick={onClick}
      disabled={disabled}
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

  if (tooltip && disabled) {
    return (
      <Tooltip title={tooltip} placement="right">
        <span className="actionBarButtonWrapper">{button}</span>
      </Tooltip>
    );
  }

  return button;
};
