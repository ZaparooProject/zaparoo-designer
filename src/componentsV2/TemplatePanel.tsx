import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { templatesPreview } from '../templatesPreview';
import { useState, type MutableRefObject } from 'react';
import { type Canvas } from 'fabric';
import { ImagePanelDisplay } from './ImagePanelDisplay';
import { printMediaTypes } from '../printMediaTypes';

import './LogosTabs.css';

type LogoTabsProps = {
  canvasRef: MutableRefObject<Canvas | null>;
};

export const TemplatePanel = ({ canvasRef }: LogoTabsProps) => {
  const [value, setValue] = useState(printMediaTypes.NFCCCsizeCard.label);
  const [templates, setTemplates] = useState<typeof templatesPreview>(() =>
    templatesPreview.filter(
      (template) => template.media === printMediaTypes.NFCCCsizeCard.label,
    ),
  );

  return (
    <>
      <div className="logoTools">
        <FormControl variant="standard">
          <InputLabel variant="outlined" size="small" id="logo-style-label">
            Media
          </InputLabel>
          <Select
            variant="outlined"
            size="small"
            labelId="template-media"
            value={value}
            label="Style"
            onChange={async (event) => {
              const val = event.target.value;
              setValue(val);
              setTemplates(
                templatesPreview.filter((template) => template.media === val),
              );
            }}
          >
            {Object.entries(printMediaTypes).map(([key, media]) => (
              <MenuItem key={key} value={media.label}>
                {media.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="resourceListAreaLogos">
        {templates.map((templatePreview) => (
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
