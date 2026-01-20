import { Typography } from '@mui/material';
import './panelSection.css';

type PanelSectionProps = {
  title?: string;
};

export const PanelSection = ({
  title,
  children,
}: React.PropsWithChildren<PanelSectionProps>) => {
  return (
    <div className="verticalStack panelSection">
      {title && (
        <Typography variant="h1" color="secondary">
          {title}
        </Typography>
      )}
      {children}
    </div>
  );
};
