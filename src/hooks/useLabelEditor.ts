import { useEffect, useState, MutableRefObject } from 'react';
import { type CardData } from '../contexts/fileDropper';
import { util, FabricImage, type StaticCanvas } from 'fabric';
import { useAppDataContext } from '../contexts/appData';
import { updateColors } from '../utils/updateColors';
import { setTemplateV2OnCanvases } from '../utils/setTemplateV2';

type useLabelEditorParams = {
  padderRef: MutableRefObject<HTMLDivElement | null>;
  index: number;
  card: CardData;
};

export const useLabelEditor = ({
  card,
  padderRef,
}: useLabelEditorParams) => {
  const { template, customColors, originalColors } =
    useAppDataContext();
  const [fabricCanvas, setFabricCanvas] = useState<StaticCanvas | null>(null);
  // local ready state, when template is loaded
  const [isImageReady, setImageReady] = useState<boolean>(false);

  useEffect(() => {
    if (fabricCanvas) {
      const { file } = card;
      const imagePromise =
        file instanceof Blob
          ? util.loadImage(URL.createObjectURL(file))
          : Promise.resolve(file);
      if (file) {
        const currentImage = fabricCanvas.getObjects('image')[0];
        if (currentImage) {
          fabricCanvas.remove(currentImage);
        }
        setImageReady(false);
        imagePromise.then((image) => {
          const fabricImage = new FabricImage(image, { resourceType: "main" });
          // @ts-expect-error no originalFile
          fabricImage.originalFile = file;
          const scale = util.findScaleToCover(fabricImage, fabricCanvas);
          fabricImage.scaleX = scale;
          fabricImage.scaleY = scale;
          fabricCanvas.add(fabricImage);
          fabricCanvas.centerObject(fabricImage);
          setImageReady(true);
        });
      }
    }
  }, [card, fabricCanvas]);

  // creation of a new card
  useEffect(() => {
    const divRef = padderRef.current;
    if (fabricCanvas && divRef && isImageReady) {
      fabricCanvas.setDimensions(
        {
          width: 'var(--cell-width)' as unknown as number,
          height: 'auto' as unknown as number,
        },
        { cssOnly: true },
      );
      card.canvas = fabricCanvas;
      card.template = template;
      card.colors = customColors;
      card.originalColors = originalColors;
      setTemplateV2OnCanvases([card], template).then(() => {
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
