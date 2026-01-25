import {
  FormControl,
  InputLabel,
  //   Select,
  //   MenuItem,
  //   TextField,
} from '@mui/material';
import { templatesPreview } from '../templatesPreview';
import { type MutableRefObject } from 'react';
import { type Canvas } from 'fabric';
import { ImagePanelDisplay } from './ImagePanelDisplay';
import './LogosTabs.css';

type LogoTabsProps = {
  canvasRef: MutableRefObject<Canvas | null>;
};

export const TemplatePanel = ({ canvasRef }: LogoTabsProps) => {
  return (
    <>
      <div className="logoTools">
        <FormControl variant="standard">
          <InputLabel variant="outlined" size="small" id="logo-style-label">
            Media
          </InputLabel>
          {/* <Select
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
          </Select> */}
        </FormControl>
      </div>
      <div className="resourceListAreaLogos">
        {templatesPreview.map((templatePreview) => (
          <ImagePanelDisplay
            key={templatePreview.url}
            canvasRef={canvasRef}
            imageResult={{ url: templatePreview.url, width: 400, height: 400 }}
          />
        ))}
      </div>
    </>
  );
};
