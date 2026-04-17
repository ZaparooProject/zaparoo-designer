import type { StaticCanvas } from 'fabric';
import type { PossibleFile } from '../contexts/fileDropper';
import { setMainImageOnCanvas } from '../hooks/useLabelEditor';
import { scaleImageToOverlayArea } from './setTemplateV2';
import { getMainImage, getPlaceholderMain } from './templateHandling';

export const hasUserImageLayersOnCanvas = (canvas?: StaticCanvas) =>
  !!canvas?.getObjects().some((obj) => obj['zaparoo-user-layer'] === true);

export const replaceMainImageOnCanvas = async (
  canvas: StaticCanvas,
  file: PossibleFile,
) => {
  canvas.remove(getMainImage(canvas));
  await setMainImageOnCanvas(file, canvas);
  const placeholder = getPlaceholderMain(canvas);
  const mainImage = getMainImage(canvas);

  if (!mainImage || !placeholder) {
    canvas.requestRenderAll();
    return;
  }

  const placeholderIndex = canvas.getObjects().indexOf(placeholder);
  canvas.insertAt(placeholderIndex, mainImage);
  await scaleImageToOverlayArea(placeholder, mainImage);
  canvas.requestRenderAll();
};

export const applyMainImageIfCanvasIsEmpty = async (
  canvas: StaticCanvas | undefined,
  file: PossibleFile,
) => {
  if (!canvas || hasUserImageLayersOnCanvas(canvas)) {
    return false;
  }

  await replaceMainImageOnCanvas(canvas, file);
  return true;
};
