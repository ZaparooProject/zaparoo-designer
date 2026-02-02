import { type CardData, useFileDropperContext } from '../contexts/fileDropper';
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Canvas, FabricObject } from 'fabric';
import { fixImageInsideCanvas } from '../utils/fixImageInsideCanvas';
import { getMainImage } from '../utils/templateHandling';
import { type TemplateEdit } from '../resourcesTypedef';

type useEditableCanvasArgs = {
  setReady: React.Dispatch<boolean>;
  setCurrentResource: React.Dispatch<
    [TemplateEdit | undefined, FabricObject | undefined]
  >;
  setCurrentEditingCanvas?: React.Dispatch<MutableRefObject<Canvas>>;
};

type useEditableCanvasReturnType = {
  confirmAndSave: () => void;
  isImageAdjust: boolean;
  isObjectAdjust: boolean;
  editableCanvas: MutableRefObject<Canvas | null>;
  selectedCard: CardData | null;
  canvasElement: MutableRefObject<HTMLCanvasElement | null>;
};

export const useEditableCanvas = ({
  setReady,
  setCurrentResource,
  setCurrentEditingCanvas,
}: useEditableCanvasArgs): useEditableCanvasReturnType => {
  const { cards, editingCard } = useFileDropperContext();
  const editableCanvas = useRef<Canvas | null>(null);
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const [isImageAdjust, setImageAdjust] = useState<boolean>(false);
  const [isObjectAdjust, setIsObjectAdjust] = useState<boolean>(false);

  const selectedCard = editingCard;

  const confirmAndSave = useCallback(async () => {
    if (!selectedCard) return;
    const canvas = editableCanvas.current!;
    const data = canvas.toObject([
      'selectable',
      'evented',
      'resourceFor',
      'id',
      'original_fill',
      'original_stroke',
    ]);
    const targetCanvas = selectedCard.canvas!;
    targetCanvas.clear();
    await targetCanvas.loadFromJSON(data);
    targetCanvas.requestRenderAll();
  }, [editableCanvas, selectedCard]);

  useEffect(() => {
    // mount, we duplicate a card
    if (!!selectedCard && canvasElement.current) {
      const canvas = new Canvas(canvasElement.current, {
        selection: false,
        preserveObjectStacking: true,
      });
      // this is not great but we do not care for now
      editableCanvas.current = canvas;
      setCurrentEditingCanvas?.(editableCanvas as MutableRefObject<Canvas>);
      if (selectedCard.canvas) {
        const jsonData = selectedCard.canvas.toObject([
          'selectable',
          'evented',
          'resourceFor',
          'id',
          'original_fill',
          'original_stroke',
        ]);
        canvas.loadFromJSON(jsonData).then(() => {
          const mainImage = getMainImage(canvas);
          if (mainImage) {
            mainImage.hasControls = false;
            mainImage.hasBorders = false;
            mainImage.strokeWidth = 0;
            mainImage.imageSmoothing = false;
          }
          // canvas.on('mouse:down', (opt) => {
          // const resource = opt.subTargets?.[0];
          // if (resource && resource.resourceFor) {
          //   const edit = selectedCard.template?.edits?.find(
          //     // @ts-expect-error not sure what to do here
          //     (edit) => edit.id === resource.resourceFor,
          //   );
          //   if (edit) {
          //     setCurrentResource([edit, resource]);
          //   }
          // }
          // });

          canvas.on('selection:created', ({ selected }) => {
            if (selected[0] === mainImage) {
              setImageAdjust(true);
              setIsObjectAdjust(false);
              setCurrentResource([undefined, undefined]);
            } else {
              setIsObjectAdjust(true);
              setImageAdjust(false);
            }
          });
          canvas.on('selection:cleared', ({ deselected }) => {
            if (deselected.length) {
              setImageAdjust(false);
              setIsObjectAdjust(false);
            }
          });
          canvas.on('selection:updated', ({ selected }) => {
            if (selected[0] === mainImage) {
              setImageAdjust(true);
              setIsObjectAdjust(false);
              setCurrentResource([undefined, undefined]);
            } else {
              setImageAdjust(false);
              setIsObjectAdjust(true);
            }
          });
          canvas.on('object:moving', ({ target }) => {
            if (target === mainImage) {
              fixImageInsideCanvas(mainImage);
            }
          });
          setReady(true);
        });
      }
      return () => {
        // console.log('disposing');
        canvas && canvas.dispose();
      };
    }
  }, [
    cards,
    selectedCard,
    setCurrentEditingCanvas,
    setCurrentResource,
    setReady,
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const canvas = editableCanvas.current;
      if (!canvas) return;

      const activeObject = canvas.getActiveObject();
      if (!activeObject) return;
      const mainImage = getMainImage(canvas);

      let moved = false;
      switch (e.key) {
        case 'ArrowUp':
          activeObject.top = (activeObject.top ?? 0) - 1;
          moved = true;
          break;
        case 'ArrowDown':
          activeObject.top = (activeObject.top ?? 0) + 1;
          moved = true;
          break;
        case 'ArrowLeft':
          activeObject.left = (activeObject.left ?? 0) - 1;
          moved = true;
          break;
        case 'ArrowRight':
          activeObject.left = (activeObject.left ?? 0) + 1;
          moved = true;
          break;
      }

      if (activeObject === mainImage) {
        fixImageInsideCanvas(mainImage);
      }

      if (moved) {
        e.preventDefault();
        activeObject.setCoords();
        canvas.requestRenderAll();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect;

  return {
    confirmAndSave,
    isImageAdjust,
    isObjectAdjust,
    editableCanvas,
    selectedCard,
    canvasElement,
  };
};
