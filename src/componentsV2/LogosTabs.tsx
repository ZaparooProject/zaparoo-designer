import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { logoStyles } from '../filteredLogos';
import { type MutableRefObject, useCallback, useEffect, useState } from 'react';
import { type Canvas } from 'fabric';
import { ImagePanelDisplay } from './ImagePanelDisplay';
import './LogosTabs.css';
import { PanelSection } from './PanelSection';

type StaticLogo = {
  url: string;
  name: string;
  style: string;
  category: string;
};

type LogoTabsProps = {
  canvasRef: MutableRefObject<Canvas> | null;
};

export const LogoTabs = ({ canvasRef }: LogoTabsProps) => {
  const [value, setValue] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [logos, setLogos] = useState<StaticLogo[]>([]);

  useEffect(() => {
    logoStyles[0].getter().then((data) => setLogos(data));
  }, [setLogos]);

  const searchHandler = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setKeyword(evt.target.value.toLocaleLowerCase());
    },
    [setKeyword],
  );

  return (
    <PanelSection title="Company logos">
      <div className="logoTools">
        <TextField
          id="filled-search"
          label="Search"
          type="search"
          variant="outlined"
          size="small"
          onChange={searchHandler}
        />
        <FormControl variant="standard">
          <InputLabel variant="outlined" size="small" id="logo-style-label">
            Style
          </InputLabel>
          <Select
            variant="outlined"
            size="small"
            labelId="logo-style-label"
            value={value}
            label="Style"
            onChange={async (event) => {
              const val = event.target.value;
              setValue(val);
              setLogos(await logoStyles[val].getter());
            }}
          >
            {logoStyles.map((_, index) => (
              <MenuItem key={logoStyles[index].style} value={index}>
                {logoStyles[index].style}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="resourceListAreaLogos">
        {logos.map(
          (logo) =>
            logo.name.toLowerCase().includes(keyword) && (
              <ImagePanelDisplay
                key={logo.url}
                canvasRef={canvasRef}
                imageResult={{ url: logo.url, width: 400, height: 400 }}
              />
            ),
        )}
      </div>
    </PanelSection>
  );
};

export default LogoTabs;
