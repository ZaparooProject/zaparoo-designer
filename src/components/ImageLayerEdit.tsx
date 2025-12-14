import { Button } from '@mui/material';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import type { Canvas } from 'fabric';
import { useCallback, type RefObject } from 'react';
import { CardData } from '../contexts/fileDropper';

type ImageLayerEditProps = {
    canvasRef: RefObject<Canvas>;
    card: CardData;
};

export const ImageLayerEdit = ({ canvasRef, card }: ImageLayerEditProps) => {

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

    return (
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
    );
};
