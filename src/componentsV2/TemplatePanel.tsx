import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { templatesPreview } from '../templatesPreview';
import { useCallback, useState, type MutableRefObject } from 'react';
import { type Canvas } from 'fabric';
import { ImagePanelDisplay } from './ImagePanelDisplay';
import { printMediaTypes } from '../printMediaTypes';

import './LogosTabs.css';
import { PanelSection } from './PanelSection';
import { useAppDataContext } from '../contexts/appData';

type LogoTabsProps = {
  canvasRef: MutableRefObject<Canvas | null>;
};

export const TemplatePanel = ({ canvasRef }: LogoTabsProps) => {
  const { setTemplate, availableTemplates } = useAppDataContext();

  const setActiveTemplate = useCallback(
    async (evt: any) => {
      const value = evt.target.value;
      const chosenTemplate = availableTemplates.find(
        (template) => template.key === value,
      );
      setTemplate(chosenTemplate!);
    },
    [setTemplate, availableTemplates],
  );

  const [value, setValue] = useState(printMediaTypes.NFCCCsizeCard.label);
  const [templates, setTemplates] = useState<typeof templatesPreview>(() =>
    templatesPreview.filter(
      (template) => template.media === printMediaTypes.NFCCCsizeCard.label,
    ),
  );

  return (
    <PanelSection title="Templates">
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
            onClick={setActiveTemplate}
            imageResult={{ url: templatePreview.url, width: 400, height: 400 }}
          />
        ))}
      </div>
    </PanelSection>
  );
};
