import Modal from '@mui/material/Modal';
import './SingleCardEditModal.css';
import Button from '@mui/material/Button';
import { useFileDropperContext } from '../contexts/fileDropper';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, FabricImage, type FabricObject } from 'fabric';
import { useRealTimeResize } from '../hooks/useRealtimeResize';
import { type TemplateEdit } from '../resourcesTypedef';
import { ResourceDisplay } from './ResourceDisplay';
import { ImageAdjust } from './ImageAdjust';
import { fixImageInsideCanvas } from '../utils/fixImageInsideCanvas';
import { getMainImage } from '../utils/setTemplateV2';

type SingleCardEditSpaceProps = {
  onClose: () => void;
  currentCardIndex: number;
};

type SingleCardEditModalProps = SingleCardEditSpaceProps & {
  isOpen: boolean;
};

export const ModalInternalComponent = ({
  onClose,
  currentCardIndex,
}: SingleCardEditSpaceProps) => {
  const { cards } = useFileDropperContext();
  const [ready, setReady] = useState(false);
  const editableCanvas = useRef<Canvas | null>(null);
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const selectedCard = cards.current[currentCardIndex];
  const layout = selectedCard.template?.layout;
  const padderRef = useRef<HTMLDivElement>(null);
  const [currentResource, setCurrentResource] =
    useState<[TemplateEdit | undefined, FabricObject | undefined]>();
  const [isImageAdjust, setImageAdjust] = useState<boolean>(false);

  useRealTimeResize({
    fabricCanvas: editableCanvas.current,
    layout: selectedCard.template!.layout,
    media: selectedCard.template!.media,
    ready,
    padderRef,
    throttleMs: 100,
  });

  const confirmAndClose = useCallback(async () => {
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
    onClose();
  }, [onClose, selectedCard.canvas]);

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
            if (selected[0] instanceof FabricImage) {
              setImageAdjust(true);
              setCurrentResource([undefined, undefined]);
            } else {
              setImageAdjust(false);
            }
          });
          canvas.on('selection:cleared', ({ deselected }) => {
            if (deselected[0] instanceof FabricImage) {
              setImageAdjust(false);
            }
          });
          canvas.on('selection:updated', ({ selected }) => {
            if (selected[0] instanceof FabricImage) {
              setImageAdjust(true);
              setCurrentResource([undefined, undefined]);
            } else {
              setImageAdjust(false);
            }
          });
          canvas.on('object:moving', ({ target }) => {
            if (target instanceof FabricImage) {
              fixImageInsideCanvas(target);
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
  }, [cards, currentCardIndex, selectedCard.canvas]);
  const classNameExt =
    layout === 'vertical' ? 'horizontalStack' : 'verticalStack';
  const classNameInt =
    layout === 'horizontal' ? 'horizontalStack' : 'verticalStack';
  return (
    <>
      <div className={`${classNameExt} topSpace`}>
        <div className={`${classNameInt} resourceSpace`}>
          <ResourceDisplay
            className={`${classNameInt}`}
            resource={currentResource?.[0]}
            target={currentResource?.[1]}
            setCurrentResource={setCurrentResource}
          />
          {isImageAdjust && (
            <ImageAdjust
              card={selectedCard}
              canvasRef={editableCanvas}
              className={`${classNameInt}`}
            />
          )}
        </div>
        <div className="verticalStack editSpace" ref={padderRef}>
          <canvas key="doNotChangePlease" ref={canvasElement} />
        </div>
      </div>
      <div className="horizontalStack confirmButtons">
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={confirmAndClose}
        >
          Confirm
        </Button>
      </div>
    </>
  );
};

export const SingleCardEditModal = ({
  isOpen,
  onClose,
  currentCardIndex,
}: SingleCardEditModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="cardEditModal verticalStack">
        {isOpen && (
          <ModalInternalComponent
            onClose={onClose}
            currentCardIndex={currentCardIndex}
          />
        )}
      </div>
    </Modal>
  );
};
