import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { logoStyles } from '../filteredLogos';
import { type MutableRefObject, useCallback, useState } from 'react';
import { type Canvas } from 'fabric';
import { ImageDrawerDisplay } from './ImageDrawerDisplay';
import './LogosTabs.css';

type LogoTabsProps = {
  canvasRef: MutableRefObject<Canvas | null>;
};

export const LogoTabs = ({ canvasRef }: LogoTabsProps) => {
  const [value, setValue] = useState(0);
  const [keyword, setKeyword] = useState('');

  const searchHandler = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setKeyword(evt.target.value);
    },
    [setKeyword],
  );

  return (
    <>
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
            onChange={(event) => {
              setValue(event.target.value);
            }}
          >
            {logoStyles.map((logos, index) => (
              <MenuItem value={index}>{logos[index].style}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="horizontalStack resourceListAreaLogos">
        {logoStyles[value].map(
          (logo) =>
            logo.name.includes(keyword) && (
              <ImageDrawerDisplay
                key={logo.name}
                canvasRef={canvasRef}
                imageResult={{ url: logo.url, width: 400, height: 400 }}
              />
            ),
        )}
      </div>
    </>
  );
};
