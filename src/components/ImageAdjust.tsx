import Slider from '@mui/material/Slider';
import type { Canvas, FabricImage } from 'fabric';
import { util } from 'fabric';
import { type RefObject, useCallback, useEffect, useState } from 'react';
import { CardData } from '../contexts/fileDropper';
import { Typography } from '@mui/material';
import { fixImageInsideCanvas } from '../utils/fixImageInsideCanvas';
import { getMainImage, getPlaceholderMain } from '../utils/setTemplateV2';

type ImageAdjustProps = {
  canvasRef: RefObject<Canvas>;
  className: string;
  card: CardData;
};

export const ImageAdjust = ({
  className,
  canvasRef,
  card,
}: ImageAdjustProps) => {
  const [value, setValue] = useState<number>(1);
  const [minScale, setMinScale] = useState<number>(0.5);
  const [maxScale, setMaxScale] = useState<number>(5);
  const [printSizeX, setPrintsizeX] = useState<number>(1);
  const [printSizeY, setPrintsizeY] = useState<number>(1);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const image = getMainImage(canvas);
    const placeholderMain = getPlaceholderMain(canvas);
    if (placeholderMain) {
      const dims = placeholderMain._getTransformedDimensions();
      const coverScale = util.findScaleToCover(image, {
        width: dims.x,
        height: dims.y,
      });
      setPrintsizeX(dims.x);
      setPrintsizeY(dims.y);
      setMinScale(coverScale);
      setMaxScale(coverScale * 10);
      setValue(image.scaleX);
    }
  }, [canvasRef, card]);

  const scaleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ target }: any) => {
      const { value } = target;
      const canvas = canvasRef.current!;
      const image = canvas.getObjects('image')[0] as FabricImage;
      image.scale(value);
      fixImageInsideCanvas(image);
      canvas.requestRenderAll();
      setValue(value);
    },
    [canvasRef],
  );

  return (
    <div
      className={className}
      style={{ justifyContent: 'center', flexGrow: 1 }}
    >
      <div style={{ paddingLeft: 18 }}>
        <Slider
          aria-label="Volume"
          min={minScale}
          max={maxScale}
          value={value}
          step={0.01}
          onChange={scaleChange}
        />
        <Typography>
          Maximum image DPI: {Math.floor(300 / value).toString()}
        </Typography>
        <Typography>
          The maximum image DPI represents the resulting resolution of the image
          after you scaled it to cover the part of template that is around{' '}
          {(printSizeX / 300).toFixed(2)} by {(printSizeY / 300).toFixed(2)}{' '}
          inches.
        </Typography>
      </div>
    </div>
  );
};
