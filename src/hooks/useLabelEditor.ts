import { useEffect, useState, MutableRefObject } from 'react';
import { PossibleFile, type CardData } from '../contexts/fileDropper';
import { util, FabricImage, type StaticCanvas } from 'fabric';
import { useAppDataContext } from '../contexts/appData';
import { updateColors } from '../utils/updateColors';
import { setTemplateV2OnCanvases } from '../utils/setTemplateV2';
import { getMainImage } from '../utils/templateHandling';

type useLabelEditorParams = {
  padderRef: MutableRefObject<HTMLDivElement | null>;
  index: number;
  card: CardData;
};

export const setMainImageOnCanvas = async (
  file: PossibleFile,
  fabricCanvas: StaticCanvas,
): Promise<void> => {
  const imagePromise =
    file instanceof Blob
      ? util.loadImage(URL.createObjectURL(file))
      : Promise.resolve(file);

  const currentImage = getMainImage(fabricCanvas);
  if (currentImage) {
    fabricCanvas.remove(currentImage);
  }
  return imagePromise.then((image) => {
    if (image) {
      const fabricImage = new FabricImage(image, {
        resourceType: 'main',
      });
      // @ts-expect-error no originalFile
      fabricImage.originalFile = file;
      const scale = util.findScaleToCover(fabricImage, fabricCanvas);
      fabricImage.scaleX = scale;
      fabricImage.scaleY = scale;
      fabricCanvas.add(fabricImage);
      fabricCanvas.centerObject(fabricImage);
    }
  });
};

export const useLabelEditor = ({ card, padderRef }: useLabelEditorParams) => {
  const { template, customColors, originalColors } = useAppDataContext();
  const [fabricCanvas, setFabricCanvas] = useState<StaticCanvas | null>(null);
  // local ready state, when template is loaded
  const [isImageReady, setImageReady] = useState<boolean>(false);

  useEffect(() => {
    const { file, canvas, template: cardTemplate } = card;
    if (fabricCanvas && !canvas) {
      setImageReady(false);
      setMainImageOnCanvas(file, fabricCanvas).then(() => {
        setImageReady(true);
      });
    } else if (fabricCanvas && canvas) {
      // just swap the element
      canvas.elements.lower = fabricCanvas.elements.lower;
      canvas.setDimensions({
        width: canvas.getWidth(),
        height: canvas.getHeight(),
      });
      const isHorizontal = cardTemplate?.layout === 'horizontal';
      canvas.setDimensions(
        {
          width: isHorizontal ? 'var(--cell-width)' : 'auto',
          height: isHorizontal ? 'auto' : 'var(--cell-width)',
        },
        { cssOnly: true },
      );
      canvas.requestRenderAll();
    }
  }, [card, fabricCanvas]);

  // creation of a new card
  useEffect(() => {
    // if the card is alrady done do not touch anything
    if (card.canvas) {
      return;
    }
    const divRef = padderRef.current;
    if (fabricCanvas && divRef && isImageReady) {
      const isHorizontal = template.layout === 'horizontal';
      fabricCanvas.setDimensions(
        {
          width: isHorizontal ? 'var(--cell-width)' : 'auto',
          height: isHorizontal ? 'auto' : 'var(--cell-width)',
        },
        { cssOnly: true },
      );
      card.canvas = fabricCanvas;
      card.template = template;
      card.colors = customColors;
      setTemplateV2OnCanvases([card], template).then((meh) => {
        card.originalColors = meh;
        updateColors([card], customColors, originalColors);
        fabricCanvas.requestRenderAll();
      });
    }
    // shouldn't retrigger for index change or template change or colors
    // the data reconciler does that
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card, fabricCanvas, isImageReady]);

  return {
    fabricCanvas,
    setFabricCanvas,
  };
};
