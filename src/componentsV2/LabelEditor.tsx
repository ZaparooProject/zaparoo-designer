import {
  useRef,
  useState,
  type MouseEvent,
  type DragEvent as ReactDragEvent,
  useTransition,
} from 'react';
import { FabricCanvasWrapper } from '../components/FabricCanvasWrapper';
import { useLabelEditor } from '../hooks/useLabelEditor';
import { useFileDropperContext, type CardData } from '../contexts/fileDropper';
import { Checkbox, IconButton, Tooltip } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { autoFillTemplate } from '../utils/autoFillTemplate';
import './labelEditor.css';

type LabelEditorProps = {
  index: number;
  card: CardData;
  setCardToEdit: (arg: number) => void;
  editingIsRequired: boolean;
  selectionIsRequired: boolean;
  hasSelection: boolean;
  onImageDrop?: (
    imageUrl: string,
    context: { index: number; card: CardData; event: ReactDragEvent },
  ) => void;
};

export type MenuInfo = {
  open: boolean;
  top: number | string;
  left: number | string;
};

const getDraggedImageUrl = (event: ReactDragEvent) => {
  return (
    event.dataTransfer.getData('application/x-zaparoo-image-url') ||
    event.dataTransfer.getData('text/uri-list') ||
    event.dataTransfer.getData('text/plain')
  );
};

export const LabelEditor = ({
  index,
  card,
  setCardToEdit,
  selectionIsRequired,
  hasSelection,
  onImageDrop,
}: LabelEditorProps) => {
  const {
    deleteCardByIndex,
    selectedCardsCount,
    setSelectedCardsCount,
    duplicateCardByIndex,
  } = useFileDropperContext();
  const [, startTransition] = useTransition();
  const padderRef = useRef<HTMLDivElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { setFabricCanvas } = useLabelEditor({
    card,
    index,
    padderRef,
  });

  const isSelected = card.isSelected;
  const flashSelection = selectionIsRequired && !hasSelection;

  const handleDragOver = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDragEnter = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: ReactDragEvent<HTMLDivElement>) => {
    if (
      event.currentTarget &&
      event.relatedTarget instanceof Node &&
      event.currentTarget.contains(event.relatedTarget)
    ) {
      return;
    }
    setIsDragOver(false);
  };

  const handleDrop = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const imageUrl = getDraggedImageUrl(event);
    if (imageUrl && onImageDrop) {
      onImageDrop(imageUrl, { index, card, event });
    }
  };

  return (
    <div
      className={`labelContainer horizontal ${
        isSelected && selectionIsRequired ? 'card-selected' : ''
      } ${isDragOver ? 'card-drag-over' : ''}`}
      ref={padderRef}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label className="canvasLabel" onClick={() => setCardToEdit(index)}>
        <FabricCanvasWrapper setFabricCanvas={setFabricCanvas} />
      </label>
      <div className="horizontalStack labelControls">
        {selectionIsRequired && (
          <div className="button-look">
            <Checkbox
              className={flashSelection ? 'flash-checkbox' : ''}
              color="secondary"
              id={card.key}
              checked={isSelected}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                const isSelectedCheckbox = (e.target as HTMLInputElement)
                  .checked;
                card.isSelected = isSelectedCheckbox;
                startTransition(() => {
                  const newCount = isSelectedCheckbox
                    ? selectedCardsCount + 1
                    : selectedCardsCount - 1;
                  setSelectedCardsCount(newCount);
                });
              }}
            />
          </div>
        )}
        <div style={{ flexGrow: 1 }}></div>
        {/* <div className="button-look">
          <IconButton
            className="button-look"
            color="secondary"
            id={card.key}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              e.preventDefault();
              setCardToEdit(index);
            }}
          >
            <EditIcon />
          </IconButton>
        </div> */}
        {Object.keys(card.game).length > 0 && (
          <div className="button-look">
            <IconButton
              disabled={!card.template?.canFill}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                e.preventDefault();
                autoFillTemplate({ card });
              }}
              color="secondary"
              id={`${card.key}-magic`}
            >
              <AutoFixHighIcon />
            </IconButton>
          </div>
        )}
        <div className="button-look">
          <Tooltip title="Duplicate card">
            <IconButton
              className="button-look"
              color="secondary"
              id={`${card.key}-delete`}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                e.preventDefault();
                duplicateCardByIndex(index);
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="button-look">
          <Tooltip title="Delete card">
            <IconButton
              className="button-look"
              color="secondary"
              id={`${card.key}-delete`}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                e.preventDefault();
                deleteCardByIndex(index);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
