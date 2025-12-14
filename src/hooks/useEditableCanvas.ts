import { type CardData, useFileDropperContext } from '../contexts/fileDropper';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, type FabricObject } from 'fabric';
import { fixImageInsideCanvas } from '../utils/fixImageInsideCanvas';
import { getMainImage } from '../utils/setTemplateV2';
import { type TemplateEdit } from '../resourcesTypedef';

type useEditableCanvasArgs = {
    currentCardIndex: number;
    setReady: React.Dispatch<boolean>;
    setCurrentResource: React.Dispatch<[TemplateEdit | undefined, FabricObject | undefined]>;
}

type useEditableCanvasReturnType = {
    confirmAndSave: () => void;
    isImageAdjust: boolean;
    isObjectAdjust: boolean;
    editableCanvas: MutableRefObject<Canvas | null>;
    selectedCard: CardData;
    canvasElement: MutableRefObject<HTMLCanvasElement | null>;
};

export const useEditableCanvas = ({ currentCardIndex, setReady, setCurrentResource }: useEditableCanvasArgs): useEditableCanvasReturnType => {
    const { cards } = useFileDropperContext();
    const editableCanvas = useRef<Canvas | null>(null);
    const canvasElement = useRef<HTMLCanvasElement>(null);
    const [isImageAdjust, setImageAdjust] = useState<boolean>(false);
    const [isObjectAdjust, setIsObjectAdjust] = useState<boolean>(false);

    const selectedCard = cards.current[currentCardIndex];

    const confirmAndSave = useCallback(async () => {
        const canvas = editableCanvas.current!;
        const data = canvas.toObject([
            'resourceFor',
            'id',
            'original_fill',
            'original_stroke',
        ]);
        const targetCanvas = selectedCard.canvas!;
        targetCanvas.clear();
        await targetCanvas.loadFromJSON(data);
        targetCanvas.requestRenderAll();
    }, [editableCanvas, selectedCard.canvas]);

    useEffect(() => {
        // mount, we duplicate a card
        if (currentCardIndex > -1 && canvasElement.current) {
            const canvas = new Canvas(canvasElement.current, {
                preserveObjectStacking: true,
            });
            // this is not great but we do not care for now
            editableCanvas.current = canvas;
            if (selectedCard.canvas) {
                const jsonData = selectedCard.canvas.toObject([
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
    }, [cards, currentCardIndex, selectedCard.canvas, setCurrentResource, setReady]);

    return {
        confirmAndSave,
        isImageAdjust,
        isObjectAdjust,
        editableCanvas,
        selectedCard,
        canvasElement,
    }
}