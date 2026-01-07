import { useRef, type MouseEvent, useTransition } from 'react';
import { FabricCanvasWrapper } from './FabricCanvasWrapper';
import { useLabelEditor } from '../hooks/useLabelEditor';
import { useFileDropperContext, type CardData } from '../contexts/fileDropper';
import { Checkbox, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { autoFillTemplate } from '../utils/autoFillTemplate';

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
  className,
  card,
  setCardToEdit,
}: LabelEditorProps) => {
  const { selectedCardsCount, setSelectedCardsCount } = useFileDropperContext();
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
      className={`${className} ${isSelected ? 'card-selected' : ''}`}
      ref={padderRef}
    >
      <label htmlFor={card.key}>
        <FabricCanvasWrapper setFabricCanvas={setFabricCanvas} />
        <div className="floating-checkbox right button-look">
          <Checkbox
            color="secondary"
            id={card.key}
            checked={isSelected}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              const isSelectedCheckbox = (e.target as HTMLInputElement).checked;
              card.isSelected = isSelectedCheckbox;
              startTransition(() => {
                setSelectedCardsCount(
                  isSelectedCheckbox
                    ? selectedCardsCount + 1
                    : selectedCardsCount - 1,
                );
              });
            }}
          />
        </div>
      </label>
      <div className="floating-container left">
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
        {card.template?.canFill && Object.keys(card.game).length > 0 && (
          <div className="button-look">
            <IconButton
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
      </div>
    </div>
  );
};
