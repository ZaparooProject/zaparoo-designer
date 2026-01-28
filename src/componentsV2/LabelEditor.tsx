import { useRef, type MouseEvent, useTransition } from 'react';
import { FabricCanvasWrapper } from '../components/FabricCanvasWrapper';
import { useLabelEditor } from '../hooks/useLabelEditor';
import { useFileDropperContext, type CardData } from '../contexts/fileDropper';
import { Checkbox, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import { autoFillTemplate } from '../utils/autoFillTemplate';
import './labelEditor.css';

type LabelEditorProps = {
  index: number;
  className: string;
  card: CardData;
  setCardToEdit: (arg: number) => void;
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
}: LabelEditorProps) => {
  const { selectedCardsCount, setSelectedCardsCount, setSelectedCardGame } =
    useFileDropperContext();
  const [, startTransition] = useTransition();
  const padderRef = useRef<HTMLDivElement | null>(null);
  const { setFabricCanvas } = useLabelEditor({
    card,
    index,
    padderRef,
  });

  const isSelected = card.isSelected;

  return (
    <div
      className={`labelContainer horizontal ${
        isSelected ? 'card-selected' : ''
      }`}
      ref={padderRef}
    >
      <label className="canvasLabel" htmlFor={card.key}>
        <FabricCanvasWrapper setFabricCanvas={setFabricCanvas} />
      </label>
      <div className="horizontalStack labelControls">
        <div className="button-look">
          <Checkbox
            color="secondary"
            id={card.key}
            checked={isSelected}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              const isSelectedCheckbox = (e.target as HTMLInputElement).checked;
              card.isSelected = isSelectedCheckbox;
              startTransition(() => {
                const newCount = isSelectedCheckbox
                  ? selectedCardsCount + 1
                  : selectedCardsCount - 1;
                setSelectedCardsCount(newCount);
                if (newCount === 1) {
                  setSelectedCardGame(card.game);
                } else {
                  setSelectedCardGame({});
                }
              });
            }}
          />
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div className="button-look">
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
        </div>
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
          <IconButton
            className="button-look"
            color="secondary"
            id={`${card.key}-delete`}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              e.preventDefault();
              // TODO: implement delete logic
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
