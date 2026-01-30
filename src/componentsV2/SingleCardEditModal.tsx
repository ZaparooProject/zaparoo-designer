import { Modal, Button } from '@mui/material';
import './SingleCardEditModal.css';
import { useCallback, useRef, useState } from 'react';
import { useRealTimeResize } from '../hooks/useRealtimeResize';
import { useEditableCanvas } from '../hooks/useEditableCanvas';
import { noop } from '../utils/utils';

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
  const padderRef = useRef<HTMLDivElement>(null);

  const { selectedCard, editableCanvas, confirmAndSave, canvasElement } =
    useEditableCanvas({ currentCardIndex, setReady, setCurrentResource: noop });

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
  return (
    <>
      <div className="verticalStack editSpace" ref={padderRef}>
        <canvas key="doNotChangePlease" ref={canvasElement} />
      </div>
      <div className="horizontalStack confirmButtons">
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={onClose}
          disableElevation={true}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={confirmAndClose}
          disableElevation={true}
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
    <Modal
      open={isOpen}
      onClose={onClose}
      disableEnforceFocus
      disableEscapeKeyDown
      disableAutoFocus
      disableRestoreFocus
      hideBackdrop
      slotProps={{
        root: {
          style: {
            left: 'calc(var(--left-panel-width) + var(--action-bar-width))',
            top: 'var(--header-height)',
          },
        },
      }}
    >
      <div className="cardEditModal verticalStack" tabIndex={-1}>
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
