import {
  type MouseEventHandler,
  type MutableRefObject,
  type DragEventHandler,
  useRef,
} from 'react';
import { type ResultImage } from '../../../netlify/apiProviders/types.mts';
import { util, type Canvas, FabricImage } from 'fabric';
import './ImagePanelDisplay.css';
import { noop } from '../../utils/utils';
import { DRAG_MIME_IMAGE_URL } from '../../constants/dragDrop';

type ImageDrawerDisplayProps = {
  canvasRef?: MutableRefObject<Canvas | null>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  imageResult: Pick<ResultImage, 'url' | 'width' | 'height'>;
  blocked?: boolean;
};

export const ImagePanelDisplay = ({
  imageResult,
  onClick,
  canvasRef,
  blocked = false,
}: ImageDrawerDisplayProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
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

  const handleDragStart: DragEventHandler<HTMLDivElement> = (event) => {
    if (blocked) {
      event.preventDefault();
      return;
    }
    const dragUrl = imageResult.url;
    event.dataTransfer.setData(DRAG_MIME_IMAGE_URL, dragUrl);
    event.dataTransfer.setData('text/uri-list', dragUrl);
    event.dataTransfer.setData('text/plain', dragUrl);
    event.dataTransfer.effectAllowed = 'copy';
    if (imgRef.current) {
      const offsetX = Math.max(0, imgRef.current.width / 2);
      const offsetY = Math.max(0, imgRef.current.height / 2);
      event.dataTransfer.setDragImage(imgRef.current, offsetX, offsetY);
    }
  };

  return (
    <div
      onClick={blocked ? noop : onClick ?? defaultOnClick}
      className={`imageResourceDisplayContainer ${blocked ? 'notActive' : ''}`}
      draggable
      onDragStart={handleDragStart}
    >
      <img
        ref={imgRef}
        width="100%"
        className="imageResourceDisplay"
        src={imageResult.url}
        loading="lazy"
        draggable={false}
      />
    </div>
  );
};
