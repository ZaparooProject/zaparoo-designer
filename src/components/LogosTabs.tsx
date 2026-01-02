import { Tab, Tabs } from '@mui/material';
import { logoStyles } from '../filteredLogos';
import { type MutableRefObject, type SyntheticEvent, useState } from 'react';
import { type Canvas } from 'fabric';
import { ImageDrawerDisplay } from './ImageDrawerDisplay';

type LogoTabsProps = {
  canvasRef: MutableRefObject<Canvas | null>;
};

export const LogoTabs = ({ canvasRef }: LogoTabsProps) => {
  const [value, setValue] = useState(0);
  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="horizontalStack tabs">
        <Tabs value={value} onChange={handleChange} aria-label="logo style tab">
          {logoStyles.map((logos, index) => (
            <Tab label={logos[index].style} value={index} />
          ))}
        </Tabs>
      </div>
      <div className="horizontalStack resourceListAreaLogos">
        {logoStyles[value].map((logo) => (
          <ImageDrawerDisplay
            key={logo.name}
            canvasRef={canvasRef}
            imageResult={{ url: logo.url, width: 400, height: 400 }}
          />
        ))}
      </div>
    </>
  );
};
