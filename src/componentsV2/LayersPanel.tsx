import { Typography } from '@mui/material';
import { PanelSection } from './PanelSection';
import { ImageLayerEdit } from './ImageLayerEdit';
import './LayersPanel.css';
import { MutableRefObject } from 'react';
import { type Canvas } from 'fabric';
import { RequireCards, RequireEditing } from './RequireEditing';

type LayersPanelProps = {
  canvasRef: MutableRefObject<Canvas | null>;
  isEditing: boolean;
  hasCards: boolean;
};

export const LayersPanel = ({
  canvasRef,
  isEditing,
  hasCards,
}: LayersPanelProps) => {
  return (
    <PanelSection
      title="Layers"
      helpText="This panel requires a card in edit mode to work."
    >
      {isEditing || <RequireEditing />}
      {hasCards || <RequireCards />}
      <div className="tools">
        <ImageLayerEdit canvasRef={canvasRef} />
        <Typography color="secondary">
          In this section you find all necessary buttons and widgets to
          add/remove pieces of a card, and change properties of a selected
          layer.
        </Typography>
      </div>
    </PanelSection>
  );
};
