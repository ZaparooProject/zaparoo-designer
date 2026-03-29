import {
  Alert,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { type MutableRefObject } from 'react';
import { type Canvas } from 'fabric';
import { ImagePanelDisplay } from './ImagePanelDisplay';
import { printMediaTypes } from '../../printMediaTypes';

import './LogosTabs.css';
import { PanelSection } from './PanelSection';
import { useAppDataContext } from '../../contexts/appData';
import { useFileDropperContext } from '../../contexts/fileDropper';

type TemplatePanelProps = {
  canvasRef: MutableRefObject<Canvas | null>;
  hasCards: boolean;
};

const mediaEntries = Object.entries(printMediaTypes);

export const TemplatePanel = ({ canvasRef, hasCards }: TemplatePanelProps) => {
  const { setTemplate, template, availableTemplates, setMediaType, mediaType } =
    useAppDataContext();
  const { selectedCardsCount, cards } = useFileDropperContext();
  const allSelected = hasCards && selectedCardsCount === cards.current.length;

  return (
    <PanelSection title="Templates" className="resourcePanelSection">
      {hasCards && selectedCardsCount === 0 && (
        <Alert
          style={{ width: '100%', boxSizing: 'border-box' }}
          severity="info"
        >
          Choosing a template sets the design for new cards. To change existing
          cards, select them first.
        </Alert>
      )}
      {selectedCardsCount > 0 && (
        <Alert
          style={{ width: '100%', boxSizing: 'border-box' }}
          severity="info"
        >
          Template will be applied to selected cards.
        </Alert>
      )}
      <div className="logoTools">
        <FormControl variant="standard">
          <InputLabel variant="outlined" size="small" id="logo-style-label">
            Media
          </InputLabel>
          {/* Disable media type changes when cards exist unless all are selected,
              because PDF export uses the first card's media dimensions for the
              entire grid layout. Allowing changes only when all cards are selected
              ensures no mixed media types which would corrupt the output. */}
          <Select
            variant="outlined"
            size="small"
            labelId="template-media"
            value={mediaType.label}
            label="Style"
            disabled={hasCards && !allSelected}
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
          {hasCards && !allSelected && (
            <FormHelperText>
              Select all cards to change media type.
            </FormHelperText>
          )}
        </FormControl>
      </div>
      <div className="resourceListAreaLogosScroll">
        <div className="resourceListAreaLogos">
          {availableTemplates.map((templateTypeV2) => (
            <ImagePanelDisplay
              key={templateTypeV2.key}
              canvasRef={canvasRef}
              onClick={() => setTemplate(templateTypeV2)}
              active={templateTypeV2.key === template.key}
              imageResult={{
                url: templateTypeV2.preview,
                width: 400,
                height: 400,
              }}
            />
          ))}
        </div>
      </div>
    </PanelSection>
  );
};

export default TemplatePanel;
