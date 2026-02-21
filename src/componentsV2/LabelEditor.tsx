import {
  useRef,
  useState,
  type MouseEvent,
  type DragEvent as ReactDragEvent,
  useTransition,
} from 'react';
import { FabricCanvasWrapper } from '../components/FabricCanvasWrapper';
import { setMainImageOnCanvas, useLabelEditor } from '../hooks/useLabelEditor';
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
import { getMainImage, getPlaceholderMain } from '../utils/templateHandling';
import { scaleImageToOverlayArea } from '../utils/setTemplateV2';

type LabelEditorProps = {
  index: number;
  card: CardData;
  setCardToEdit: (arg: number) => void;
  editingIsRequired: boolean;
  selectionIsRequired: boolean;
  hasSelection: boolean;
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
  hasSelection,
}: LabelEditorProps) => {
  const {
    deleteCardByIndex,
    selectedCardsCount,
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
    const imageUrl = event.dataTransfer.getData(DRAG_MIME_IMAGE_URL);
    if (imageUrl && card.canvas) {
      util.loadImage(imageUrl).then((img) => {
        const { canvas } = card;
        if (canvas) {
          const image = new FabricImage(img);
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
    const canvas = card.canvas;
    if (gameObjectRaw && canvas) {
      try {
        const gameObject = JSON.parse(gameObjectRaw) as SearchResult;
        const imageUrl = gameObject.cover.url;
        getImage(imageUrl, imageUrl).then((file) => {
          swapGameAtIndex(file, gameObject, index);
          // now on current canvas wipe the main image and swap with the image from file.
          // this is some code duplication from setTemplateV2 but i can't do better for now.
          canvas.remove(getMainImage(canvas));
          setMainImageOnCanvas(file, canvas).then(() => {
            const placeholder = getPlaceholderMain(canvas);
            const mainImage = getMainImage(canvas);
            if (mainImage && placeholder) {
              const index = canvas.getObjects().indexOf(placeholder);
              canvas.insertAt(index, mainImage);
              scaleImageToOverlayArea(placeholder, mainImage).then(() => {
                canvas.requestRenderAll();
              });
            }
          });
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
