import { Modal, Button } from '@mui/material';
import './SingleCardEditModal.css';
import { useCallback, useRef, useState } from 'react';
import { type FabricObject } from 'fabric';
import { useRealTimeResize } from '../hooks/useRealtimeResize';
import { type TemplateEdit } from '../resourcesTypedef';
import { ResourceDisplay } from './ResourceDisplay';
import { ImageAdjust } from './ImageAdjust';
import { ImageLayerEdit } from './ImageLayerEdit';
import { GameResourcesDisplay } from './GameResourcesDisplay';
import { useEditableCanvas } from '../hooks/useEditableCanvas';

type SingleCardEditSpaceProps = {
  onClose: () => void;
};

type SingleCardEditModalProps = SingleCardEditSpaceProps & {
  isOpen: boolean;
};

export const ModalInternalComponent = ({
  onClose,
}: SingleCardEditSpaceProps) => {
  const [ready, setReady] = useState(false);
  const [drawerState, setDrawerState] = useState(false);
  const padderRef = useRef<HTMLDivElement>(null);
  const [currentResource, setCurrentResource] =
    useState<[TemplateEdit | undefined, FabricObject | undefined]>();

  const {
    selectedCard,
    isImageAdjust,
    isObjectAdjust,
    editableCanvas,
    confirmAndSave,
    canvasElement,
  } = useEditableCanvas({ setReady, setCurrentResource });
  const layout = selectedCard!.template?.layout;

  useRealTimeResize({
    fabricCanvas: editableCanvas.current,
    layout: selectedCard!.template!.layout,
    media: selectedCard!.template!.media,
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
              card={selectedCard!}
              canvasRef={editableCanvas}
              className={`${classNameInt}`}
            />
          )}
          {isObjectAdjust && (
            <ImageLayerEdit card={selectedCard!} canvasRef={editableCanvas} />
          )}
        </div>
        <div className="verticalStack editSpace" ref={padderRef}>
          <canvas key="doNotChangePlease" ref={canvasElement} />
        </div>
      </div>
      <div className="tabbedResources">
        <GameResourcesDisplay
          game={selectedCard!.game}
          canvasRef={editableCanvas}
          drawerState={drawerState}
          setDrawerState={setDrawerState}
        />
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
}: SingleCardEditModalProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
    >
      <div className="cardEditModal verticalStack" tabIndex={-1}>
        {isOpen && <ModalInternalComponent onClose={onClose} />}
      </div>
    </Modal>
  );
};
