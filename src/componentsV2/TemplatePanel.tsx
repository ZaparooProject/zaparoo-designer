import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { type MutableRefObject } from 'react';
import { type Canvas } from 'fabric';
import { ImagePanelDisplay } from './ImagePanelDisplay';
import { printMediaTypes } from '../printMediaTypes';

import './LogosTabs.css';
import { PanelSection } from './PanelSection';
import { useAppDataContext } from '../contexts/appData';
import { SuggestSelecting } from './RequireEditing';

type LogoTabsProps = {
  canvasRef: MutableRefObject<Canvas | null>;
  isEditing: boolean;
  hasCards: boolean;
  hasSelection: boolean;
};

const mediaEntries = Object.entries(printMediaTypes);

export const TemplatePanel = ({
  canvasRef,
  hasSelection,
  hasCards,
}: LogoTabsProps) => {
  const { setTemplate, availableTemplates, setMediaType, mediaType } =
    useAppDataContext();

  return (
    <PanelSection title="Templates">
      {hasCards && !hasSelection && <SuggestSelecting />}
      <div className="logoTools">
        <FormControl variant="standard">
          <InputLabel variant="outlined" size="small" id="logo-style-label">
            Media
          </InputLabel>
          <Select
            variant="outlined"
            size="small"
            labelId="template-media"
            value={mediaType.label}
            label="Style"
            onChange={async (event) => {
              const val = event.target.value;
              const [, value] =
                mediaEntries.find(([, media]) => media.label === val) ??
                mediaEntries[0];
              setMediaType(value);
            }}
          >
            {mediaEntries.map(([key, media]) => (
              <MenuItem key={key} value={media.label}>
                {media.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="resourceListAreaLogos">
        {availableTemplates.map((templateTypeV2) => (
          <ImagePanelDisplay
            key={templateTypeV2.key}
            canvasRef={canvasRef}
            onClick={() => setTemplate(templateTypeV2)}
            imageResult={{
              url: templateTypeV2.preview,
              width: 400,
              height: 400,
            }}
          />
        ))}
      </div>
    </PanelSection>
  );
};

export default TemplatePanel;
