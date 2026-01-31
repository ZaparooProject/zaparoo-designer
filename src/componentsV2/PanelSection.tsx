import { Typography } from '@mui/material';
import './panelSection.css';

type PanelSectionProps = {
  title?: string;
  helpText?: string;
  className?: string;
};

export const PanelSection = ({
  title,
  className = '',
  children,
}: React.PropsWithChildren<PanelSectionProps>) => {
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
      </div>
      {children}
    </div>
  );
};
