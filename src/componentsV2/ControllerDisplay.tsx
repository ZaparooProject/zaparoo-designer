import { TextField } from '@mui/material';
import { type MutableRefObject, useCallback, useState } from 'react';
import { type Canvas } from 'fabric';
import { ImagePanelDisplay } from './ImagePanelDisplay';
import controllers from '../controllers';
import './LogosTabs.css';

type LogoTabsProps = {
  canvasRef: MutableRefObject<Canvas | null>;
};

export const ControllerDisplay = ({ canvasRef }: LogoTabsProps) => {
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
        {controllers.map(
          (controller) =>
            controller.name.toLowerCase().includes(keyword) && (
              <ImagePanelDisplay
                key={controller.name}
                canvasRef={canvasRef}
                imageResult={{ url: controller.url, width: 400, height: 400 }}
              />
            ),
        )}
      </div>
    </>
  );
};
