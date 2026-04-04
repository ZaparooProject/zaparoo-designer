import {
  useRef,
  useState,
  type MouseEvent,
  type DragEvent as ReactDragEvent,
  useTransition,
} from 'react';
import { FabricCanvasWrapper } from './FabricCanvasWrapper';
import { useLabelEditor } from '../hooks/useLabelEditor';
import { useFileDropperContext, type CardData } from '../contexts/fileDropper';
import { Checkbox, IconButton, Tooltip } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { autoFillTemplate } from '../utils/autoFillTemplate';
import './labelEditor.css';
import { FabricImage, util } from 'fabric';
import {
  DRAG_MIME_GAME_OBJECT,
  DRAG_MIME_IMAGE_URL,
} from '../constants/dragDrop';
import { SearchResult } from '../../netlify/apiProviders/types.mts';
import { getImage } from '../utils/search';
import { replaceMainImageOnCanvas } from '../utils/applyMainImageToCanvas';

type LabelEditorProps = {
  index: number;
  card: CardData;
  setCardToEdit: (arg: number) => void;
  selectionIsRequired: boolean;
};

export type MenuInfo = {
  open: boolean;
  top: number | string;
  left: number | string;
};

export const LabelEditor = ({
  index,
  card,
  setCardToEdit,
  selectionIsRequired,
}: LabelEditorProps) => {
  const {
    deleteCardByIndex,
    setSelectedCardsCount,
    duplicateCardByIndex,
    swapGameAtIndex,
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
    const { canvas } = card;
    if (canvas) {
      const placeHolders = canvas
        .getObjects()
        .filter((obj) => !!obj['zaparoo-placeholder']);
      placeHolders.forEach((obj) => {
        obj.visible = true;
      });
      canvas.requestRenderAll();
    }
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
    const { canvas } = card;
    if (canvas) {
      const placeHolders = canvas
        .getObjects()
        .filter((obj) => !!obj['zaparoo-placeholder']);
      placeHolders.forEach((obj) => {
        obj.visible = false;
      });
      canvas.requestRenderAll();
    }
  };

  const handleDrop = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const imageUrl = event.dataTransfer.getData(DRAG_MIME_IMAGE_URL);
    const { canvas } = card;
    if (imageUrl && canvas) {
      console.log(event, event.clientX, canvas?.calcOffset());

      util.loadImage(imageUrl).then((img) => {
        if (canvas) {
          const image = new FabricImage(img, {
            'zaparoo-user-layer': true,
          });
          const scale = util.findScaleToFit(image, canvas);
          image.scale(scale);
          canvas.add(image);
          canvas.centerObject(image);
          canvas.requestRenderAll();
        }
      });
      return;
    }

    const gameObjectRaw = event.dataTransfer.getData(DRAG_MIME_GAME_OBJECT);
    if (gameObjectRaw && canvas) {
      try {
        const gameObject = JSON.parse(gameObjectRaw) as SearchResult;
        const imageUrl = gameObject.cover.url;
        getImage(imageUrl, imageUrl).then((file) => {
          swapGameAtIndex(file, gameObject, index);
          void replaceMainImageOnCanvas(canvas, file);
        });
      } catch {
        // Ignore invalid payloads.
      }
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
        <div
          className={`button-look ${
            selectionIsRequired ? 'checkbox-pulse' : ''
          }`}
          style={{ visibility: selectionIsRequired ? 'visible' : 'hidden' }}
        >
          <Checkbox
            color="secondary"
            id={card.key}
            checked={isSelected}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              const isSelectedCheckbox = (e.target as HTMLInputElement).checked;
              card.isSelected = isSelectedCheckbox;
              startTransition(() => {
                setSelectedCardsCount((prev) =>
                  isSelectedCheckbox ? prev + 1 : prev - 1,
                );
              });
            }}
          />
        </div>
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
              id={`${card.key}-duplicate`}
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
