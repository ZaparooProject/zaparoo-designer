import { type MouseEventHandler, type MutableRefObject } from 'react';
import { type ResultImage } from '../../netlify/apiProviders/types.mts';
import { util, type Canvas, FabricImage } from 'fabric';
import './ImagePanelDisplay.css';

type ImageDrawerDisplayProps = {
  canvasRef?: MutableRefObject<Canvas | null>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  imageResult: Pick<ResultImage, 'url' | 'width' | 'height'>;
};

export const ImagePanelDisplay = ({
  imageResult,
  onClick,
  canvasRef,
}: ImageDrawerDisplayProps) => {
  const defaultOnClick = () => {
    util.loadImage(imageResult.url).then((img) => {
      if (!canvasRef?.current) {
        return;
      }
      const image = new FabricImage(img);
      const scale = util.findScaleToFit(image, canvasRef.current);
      image.scale(scale);
      canvasRef.current.add(image);
      canvasRef.current.centerObject(image);
    });
  };

  return (
    <div
      onClick={onClick ?? defaultOnClick}
      className="imageResourceDisplayContainer"
    >
      <img
        width="100%"
        className="imageResourceDisplay"
        src={imageResult.url}
        loading="lazy"
      />
    </div>
  );
};
