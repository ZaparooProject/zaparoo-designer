import { Button, Typography } from '@mui/material';
import { PanelSection } from './PanelSection';
import './LayersPanel.css';
import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { type TFiller, type Canvas, FabricImage, StaticCanvas } from 'fabric';
import { RequireCards, RequireEditing } from './RequireEditing';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ColorSwatch } from './ColorSwatch';

type LayersPanelProps = {
  canvasRef: MutableRefObject<Canvas | null>;
  isEditing: boolean;
  hasCards: boolean;
};

const getFilteredObjects = (canvas: StaticCanvas) =>
  canvas
    .getObjects()
    .filter(
      (object) =>
        !(object instanceof FabricImage) &&
        object.visible === true &&
        !(object.fill as unknown as TFiller)?.toLive,
    )
    .map((object) => ({
      id: object.id,
      type: object.type,
      text: 'text' in object ? (object.text as string | undefined) : undefined,
      fill: (object.fill as string | undefined) ?? undefined,
      stroke: (object.stroke as string | undefined) ?? undefined,
    }));

export const LayersPanel = ({
  canvasRef,
  isEditing,
  hasCards,
}: LayersPanelProps) => {
  const [layers, setLayers] = useState<
    Array<{
      type: string;
      text?: string;
      fill?: string;
      stroke?: string;
      id: string;
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    setLayers(getFilteredObjects(canvas));
  }, [canvasRef]);

  const rotateClockwise = useCallback(() => {
    const canvas = canvasRef.current;
    const layer = canvas && canvas.getActiveObject();
    if (layer) {
      const angleRemainder = layer.angle % 90;
      layer.set('angle', layer.angle + 90 - angleRemainder);
      layer.setCoords();
      canvas.requestRenderAll();
    }
  }, [canvasRef]);

  const moveUp = useCallback(() => {
    const canvas = canvasRef.current;
    const layer = canvas && canvas.getActiveObject();
    if (layer) {
      canvas.bringObjectForward(layer);
      canvas.requestRenderAll();
    }
  }, [canvasRef]);

  const moveDown = useCallback(() => {
    const canvas = canvasRef.current;
    const layer = canvas && canvas.getActiveObject();
    if (layer) {
      canvas.sendObjectBackwards(layer);
      canvas.requestRenderAll();
    }
  }, [canvasRef]);

  const deleteLayer = useCallback(() => {
    const canvas = canvasRef.current;
    const layer = canvas && canvas.getActiveObject();
    if (layer) {
      canvas.remove(layer);
      canvas.requestRenderAll();
    }
  }, [canvasRef]);

  const selectOnCanvas = useCallback(
    (id: string) => {
      const canvas = canvasRef.current!;
      const layer = canvas.getObjects().find((obj) => obj.id === id);
      if (layer) {
        canvas.setActiveObject(layer);
        canvas.requestRenderAll();
      }
    },
    [canvasRef],
  );

  const onColorSelect = useCallback(
    (id: string, nextColor: string, property: 'fill' | 'stroke') => {
      const canvas = canvasRef.current!;
      const layer = canvas.getObjects().find((obj) => obj.id === id);
      if (layer) {
        layer.set(property, nextColor);
        canvas.requestRenderAll();
        setLayers(getFilteredObjects(canvas));
      }
    },
    [canvasRef],
  );

  return (
    <>
      <PanelSection
        title="Tools"
        helpText="Perform actions on the selected layer"
      >
        {(isEditing && hasCards) || <RequireEditing />}
        {hasCards || <RequireCards />}
        <div className="tools">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              padding: 12,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<RotateRightIcon />}
              onClick={rotateClockwise}
              sx={{ justifyContent: 'flex-start' }}
            >
              Rotate 90° Clockwise
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowUpwardIcon />}
              onClick={moveUp}
              sx={{ justifyContent: 'flex-start' }}
            >
              Move Layer Up
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowDownwardIcon />}
              onClick={moveDown}
              sx={{ justifyContent: 'flex-start' }}
            >
              Move Layer Down
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DeleteOutlineIcon />}
              onClick={deleteLayer}
              sx={{ justifyContent: 'flex-start' }}
            >
              Delete Layer
            </Button>
          </div>
        </div>
      </PanelSection>
      <PanelSection
        title="Layers"
        helpText="Perform actions on the selected layer"
      >
        <div className="layers-list">
          {layers.map((layer, index) => (
            <div
              className="layers-row"
              onClick={() => selectOnCanvas(layer.id)}
              key={layer.id}
            >
              <Typography
                display="flex"
                flexGrow="1"
                variant="body2"
                color="text.secondary"
                className="layers-row-text"
              >
                {layer.type ?? 'layer'}
              </Typography>
              <ColorSwatch
                onColorSelect={onColorSelect}
                property="fill"
                id={layer.id}
                color={layer.fill}
                ariaLabel="fill color"
              />
              <ColorSwatch
                onColorSelect={onColorSelect}
                property="stroke"
                id={layer.id}
                color={layer.stroke}
                ariaLabel="stroke color"
              />
            </div>
          ))}
        </div>
      </PanelSection>
    </>
  );
};

export default LayersPanel;
