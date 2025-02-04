import DeleteIcon from '@mui/icons-material/Delete';
import Rotate90DegreesCwIcon from '@mui/icons-material/Rotate90DegreesCw';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import TemplateDropdown from './TemplateDropdown';
import ColorChanger from './ColorChanger';
import Typography from '@mui/material/Typography';
import { useFileDropperContext } from '../contexts/fileDropper';
import { useAppDataContext } from '../contexts/appData';
import {
  getMainImage,
  getPlaceholderMain,
  scaleImageToOverlayArea,
} from '../utils/setTemplateV2';
import { useCallback, useEffect } from 'react';
import { colorsDiffer } from '../utils/utils';

const PurpleHeader = () => {
  const { selectedCardsCount, cards, removeCards, setSelectedCardsCount } =
    useFileDropperContext();
  const {
    originalColors,
    customColors,
    setCustomColors,
    template,
    setOriginalColors,
    setTemplate,
  } = useAppDataContext();
  const hasSelectedCards = !!selectedCardsCount;

  // when selecting a card, update the selected colors with the first card clicled.
  // run on mount only. so first selection.

  useEffect(() => {
    if (selectedCardsCount === 1) {
      const selectedCard = cards.current.find((card) => card.isSelected)!;
      const currentColors = selectedCard.colors;
      const currentOriginalColors = selectedCard.originalColors;
      const currentTemplate = selectedCard.template!;
      if (colorsDiffer(currentColors, customColors)) {
        setCustomColors(currentColors);
      }
      if (colorsDiffer(currentOriginalColors, originalColors)) {
        setOriginalColors(currentOriginalColors);
      }
      if (currentTemplate !== template) {
        setTemplate(currentTemplate);
      }
    }
    // we want to run this only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCardsCount]);

  const deselectAll = useCallback(() => {
    cards.current.forEach((card) => {
      card.isSelected = false;
    });
    setSelectedCardsCount(0);
  }, [cards, setSelectedCardsCount]);

  const rotateMainImage = useCallback(() => {
    cards.current.forEach((card) => {
      if (card.isSelected && card.canvas) {
        const placeholder = getPlaceholderMain(card.canvas);
        const mainImage = getMainImage(card.canvas);

        if (placeholder && mainImage) {
          mainImage.angle += 90;
          mainImage.angle %= 360;

          scaleImageToOverlayArea(placeholder, mainImage);
          card.canvas.requestRenderAll();
        }
      }
    });
  }, [cards]);

  return (
    <div className={`topHeader purpleHeader ${hasSelectedCards ? 'show' : ''}`}>
      <div className="content">
        <TemplateDropdown template={template} id="header" />
        <ColorChanger
          setCustomColors={setCustomColors}
          customColors={customColors}
          originalColors={originalColors}
        />
        <Typography color="secondary">
          {`Apply on ${selectedCardsCount} selected card(s)`}
        </Typography>
      </div>
      <div className="content">
        <IconButton onClick={rotateMainImage}>
          <Rotate90DegreesCwIcon />
        </IconButton>
        <div className="spacer" />
        <IconButton onClick={removeCards}>
          <DeleteIcon />
        </IconButton>
      </div>
      <div className="content">
        <IconButton onClick={deselectAll}>
          <CancelIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default PurpleHeader;
