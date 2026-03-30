import { Button as MUIButton, type ButtonProps } from '@mui/material';
import { boxShadow } from '../constants';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Button = forwardRef<any, ButtonProps>(
  ({ classes = {}, sx = {}, ...otherProps }, ref) => (
    <MUIButton
      {...otherProps}
      sx={{
        boxShadow,
        fontSize: '0.9375rem',
        textTransform: 'none',
        ...sx,
      }}
      ref={ref}
      classes={{ ...classes, root: 'hiddenText' }}
    />
  ),
);
