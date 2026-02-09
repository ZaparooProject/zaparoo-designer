import { TextField } from '@mui/material';
import { type MutableRefObject, useCallback, useState } from 'react';
import { type Canvas } from 'fabric';
import { ImagePanelDisplay } from './ImagePanelDisplay';
import consoles from '../../consoles';
import './LogosTabs.css';

type ConsoleDisplayProps = {
  canvasRef: MutableRefObject<Canvas | null>;
  blocked?: boolean;
};

export const ConsoleDisplay = ({ canvasRef, blocked }: ConsoleDisplayProps) => {
  const [keyword, setKeyword] = useState('');

  const searchHandler = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setKeyword(evt.target.value.toLocaleLowerCase());
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
      </div>
      <div className="resourceListAreaLogos">
        {consoles.map(
          (console, index) =>
            console.name.toLowerCase().includes(keyword) && (
              <ImagePanelDisplay
                blocked={blocked}
                key={`${console.name}-${index}`}
                canvasRef={canvasRef}
                imageResult={{ url: console.url, width: 400, height: 400 }}
              />
            ),
        )}
      </div>
    </>
  );
};
