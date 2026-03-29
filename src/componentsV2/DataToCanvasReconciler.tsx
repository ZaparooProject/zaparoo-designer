import { useEffect } from 'react';
import { useAppDataContext } from '../contexts/appData';
import { CardData, useFileDropperContext } from '../contexts/fileDropper';
import { updateColors } from '../utils/updateColors';
import { setTemplateV2OnCanvases } from '../utils/setTemplateV2';

/**
 * Now this is a bad idea and i want to trash it.
 */
export const DataToCanvasReconciler = () => {
  const { cards } = useFileDropperContext();
  const {
    template,
    setOriginalColors,
    setCustomColors,
    setIsIdle,
    customColors,
    originalColors,
  } = useAppDataContext();

  // takes care of template change
  useEffect(() => {
    if (cards.current.length) {
      setIsIdle(false);
      const selectedCards = cards.current.filter((card) => card.isSelected);
      setTemplateV2OnCanvases(selectedCards, template).then((colors) => {
        setOriginalColors(colors);
        setCustomColors(colors);
        setIsIdle(true);
      });
    }
  }, [template, setCustomColors, cards, setOriginalColors, setIsIdle]);

  useEffect(() => {
    const selectedCards = cards.current.filter(
      (card): card is Required<CardData> => !!card.isSelected && !!card.canvas,
    );
    if (!selectedCards.length) {
      return;
    }

    const hasPendingTemplateSwap = selectedCards.some(
      (card) => card.template !== template,
    );
    if (hasPendingTemplateSwap) {
      return;
    }

    setIsIdle(false);
    updateColors(selectedCards, customColors, originalColors);
    setIsIdle(true);
  }, [cards, customColors, originalColors, setIsIdle, template]);

  return null;
};
