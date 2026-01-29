import { Typography } from '@mui/material';
import './panelSection.css';

type PanelSectionProps = {
  title?: string;
  className?: string;
};

export const PanelSection = ({
  title,
  className = '',
  children,
}: React.PropsWithChildren<PanelSectionProps>) => {
  return (
    <div className={`verticalStack panelSection ${className}`}>
      {title && (
        <Typography variant="h1" color="secondary" sx={{ paddingLeft: '8px' }}>
          {title}
        </Typography>
      )}
      {children}
    </div>
  );
};
