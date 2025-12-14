import { Modal, Button } from '@mui/material';
import './SingleCardEditModal.css';
import { useCallback, useRef, useState } from 'react';
import { type FabricObject } from 'fabric';
import { useRealTimeResize } from '../hooks/useRealtimeResize';
import { type TemplateEdit } from '../resourcesTypedef';
import { ResourceDisplay } from './ResourceDisplay';
import { ImageAdjust } from './ImageAdjust'
import { GameResourcesDisplay } from './GameResourcesDisplay';
import { useEditableCanvas } from '../hooks/useEditableCanvas';

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
  const [ready, setReady] = useState(false);
  const [drawerState, setDrawerState] = useState(false);
  const padderRef = useRef<HTMLDivElement>(null);
  const [currentResource, setCurrentResource] =
    useState<[TemplateEdit | undefined, FabricObject | undefined]>();

  const { selectedCard, isImageAdjust, editableCanvas, confirmAndSave, canvasElement } = useEditableCanvas({ currentCardIndex, setReady, setCurrentResource })
  const layout = selectedCard.template?.layout;

  useRealTimeResize({
    fabricCanvas: editableCanvas.current,
    layout: selectedCard.template!.layout,
    media: selectedCard.template!.media,
    ready,
    padderRef,
    throttleMs: 100,
  });

  const confirmAndClose = useCallback(() => {
    confirmAndSave();
    onClose();
  }, [confirmAndSave, onClose]);

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
      <div className="tabbedResources">
        <GameResourcesDisplay game={selectedCard.game} canvasRef={editableCanvas} drawerState={drawerState} setDrawerState={setDrawerState} />
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
          onClick={() => setDrawerState(true)}
        >
          Resources
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
