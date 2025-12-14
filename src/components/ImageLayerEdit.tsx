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
    const placeholderHandler = useCallback(
        (action: string) => () => {
            if (!canvasRef.current) {
                return;
            }
            // Placeholder logic to be implemented with real layer manipulation.
            console.info(`Image layer action pending: ${action}`, {
                card,
                canvasObjectCount: canvasRef.current.getObjects().length,
            });
        },
        [canvasRef, card],
    );

    const rotateClockwise = placeholderHandler('rotateClockwise');
    const moveUp = placeholderHandler('moveUp');
    const moveDown = placeholderHandler('moveDown');
    const deleteLayer = placeholderHandler('delete');

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
                variant="outlined"
                color="primary"
                startIcon={<RotateRightIcon />}
                onClick={rotateClockwise}
                sx={{ justifyContent: 'flex-start' }}
            >
                Rotate 90° Clockwise
            </Button>
            <Button
                variant="outlined"
                color="primary"
                startIcon={<ArrowUpwardIcon />}
                onClick={moveUp}
                sx={{ justifyContent: 'flex-start' }}
            >
                Move Layer Up
            </Button>
            <Button
                variant="outlined"
                color="primary"
                startIcon={<ArrowDownwardIcon />}
                onClick={moveDown}
                sx={{ justifyContent: 'flex-start' }}
            >
                Move Layer Down
            </Button>
            <Button
                variant="outlined"
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
