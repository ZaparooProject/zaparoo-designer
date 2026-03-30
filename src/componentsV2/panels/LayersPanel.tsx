import { Button, IconButton, Typography } from '@mui/material';
import { PanelSection } from './PanelSection';
import './LayersPanel.css';
import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { type TFiller, type Canvas, FabricObject, StaticCanvas } from 'fabric';
import { RequireCards } from './RequireEditing';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ColorSwatch } from './ColorSwatch';

type LayersPanelProps = {
  canvasRef: MutableRefObject<Canvas | null>;
  hasCards: boolean;
};

const getFilteredObjects = (canvas: StaticCanvas) =>
  canvas
    .getObjects()
    .filter((object) => object.visible === true)
    .map((object) => ({
      id: object.id,
      type: object.type,
      text: 'text' in object ? (object.text as string | undefined) : undefined,
      fill: (object.fill as string | undefined) ?? undefined,
      stroke: (object.stroke as string | undefined) ?? undefined,
    }));

export const LayersPanel = ({ canvasRef, hasCards }: LayersPanelProps) => {
  const [layers, setLayers] = useState<
    Array<{
      type: string;
      text?: string;
      fill?: string;
      stroke?: string;
      id: string;
    }>
  >([]);
  const [openSwatchKey, setOpenSwatchKey] = useState<string | null>(null);

  const getSwatchKey = useCallback(
    (id: string, property: 'fill' | 'stroke') => {
      return `${id}:${property}`;
    },
    [],
  );

  const refreshLayers = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      setLayers([]);
      return;
    }

    setLayers(getFilteredObjects(canvas));
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    refreshLayers();
  }, [canvasRef, refreshLayers]);

  const deleteCanvasLayer = useCallback(
    (layer: FabricObject) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      if (canvas.getActiveObject() === layer) {
        canvas.discardActiveObject();
      }

      canvas.remove(layer);
      canvas.requestRenderAll();
      refreshLayers();
    },
    [canvasRef, refreshLayers],
  );

  const rotateClockwise = useCallback(() => {
    const canvas = canvasRef.current;
    const layer = canvas && canvas.getActiveObject();
    if (layer) {
      const angleRemainder = layer.angle % 90;
      layer.set('angle', layer.angle + 90 - angleRemainder);
      layer.setCoords();
      canvas.requestRenderAll();
      refreshLayers();
    }
  }, [canvasRef, refreshLayers]);

  const moveUp = useCallback(() => {
    const canvas = canvasRef.current;
    const layer = canvas && canvas.getActiveObject();
    if (layer) {
      canvas.bringObjectForward(layer);
      canvas.requestRenderAll();
      refreshLayers();
    }
  }, [canvasRef, refreshLayers]);

  const moveDown = useCallback(() => {
    const canvas = canvasRef.current;
    const layer = canvas && canvas.getActiveObject();
    if (layer) {
      canvas.sendObjectBackwards(layer);
      canvas.requestRenderAll();
      refreshLayers();
    }
  }, [canvasRef, refreshLayers]);

  const deleteLayer = useCallback(() => {
    const canvas = canvasRef.current;
    const layer = canvas && canvas.getActiveObject();
    if (layer) {
      deleteCanvasLayer(layer);
    }
  }, [canvasRef, deleteCanvasLayer]);

  const deleteLayerById = useCallback(
    (id: string) => {
      const canvas = canvasRef.current;
      const layer = canvas?.getObjects().find((obj) => obj.id === id);
      if (layer) {
        deleteCanvasLayer(layer);
      }
    },
    [canvasRef, deleteCanvasLayer],
  );

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
        refreshLayers();
      }
    },
    [canvasRef, refreshLayers],
  );

  return (
    <>
      <PanelSection
        title="Tools"
        helpText="Perform actions on the selected layer"
      >
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
          {layers.map((layer) => (
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
                {layer.type ?? 'layer'} {layer.text ?? layer.id}
              </Typography>
              {layer.type !== 'image' && (
                <div onClick={(event) => event.stopPropagation()}>
                  <ColorSwatch
                    onColorSelect={onColorSelect}
                    property="fill"
                    id={layer.id}
                    color={
                      layer.fill && !(layer.fill as unknown as TFiller)?.toLive
                        ? layer.fill
                        : 'transparent'
                    }
                    ariaLabel="fill color"
                    isOpen={openSwatchKey === getSwatchKey(layer.id, 'fill')}
                    onOpenChange={(nextOpen) => {
                      setOpenSwatchKey(
                        nextOpen ? getSwatchKey(layer.id, 'fill') : null,
                      );
                    }}
                  />
                </div>
              )}
              {layer.type !== 'image' && (
                <div onClick={(event) => event.stopPropagation()}>
                  <ColorSwatch
                    onColorSelect={onColorSelect}
                    property="stroke"
                    id={layer.id}
                    color={
                      layer.stroke &&
                      !(layer.stroke as unknown as TFiller)?.toLive
                        ? layer.stroke
                        : 'transparent'
                    }
                    ariaLabel="stroke color"
                    isOpen={openSwatchKey === getSwatchKey(layer.id, 'stroke')}
                    onOpenChange={(nextOpen) => {
                      setOpenSwatchKey(
                        nextOpen ? getSwatchKey(layer.id, 'stroke') : null,
                      );
                    }}
                  />
                </div>
              )}
              <IconButton
                size="small"
                aria-label={`Delete ${layer.type ?? 'layer'}`}
                onClick={(event) => {
                  event.stopPropagation();
                  deleteLayerById(layer.id);
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </div>
          ))}
        </div>
      </PanelSection>
    </>
  );
};

export default LayersPanel;
