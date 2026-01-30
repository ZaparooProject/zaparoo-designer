import { Typography, Popover } from '@mui/material';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { useState } from 'react';
import './panelSection.css';

type PanelSectionProps = {
  title?: string;
  helpText?: string;
  className?: string;
};

export const PanelSection = ({
  title,
  helpText,
  className = '',
  children,
}: React.PropsWithChildren<PanelSectionProps>) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={`verticalStack panelSection ${className}`}>
      <div className="horizontalStack">
        {title && (
          <Typography
            variant="h1"
            color="secondary"
            sx={{ paddingLeft: '8px' }}
          >
            {title}
          </Typography>
        )}
        {helpText && <HelpCenterIcon width="18" height="18" />}
        <Popover
          id={id}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Typography>{helpText}</Typography>
        </Popover>
      </div>
      {children}
    </div>
  );
};
