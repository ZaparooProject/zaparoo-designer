import { useEffect } from 'react';
import { useAppDataContext } from '../contexts/appData';
import { CardData, useFileDropperContext } from '../contexts/fileDropper';
import { setTemplateOnCanvases } from '../utils/setTemplate';
import { updateColors } from '../utils/updateColors';
import { isTemplateV2 } from '../utils/utils';
import { setTemplateV2OnCanvases } from '../utils/setTemplateV2';

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
      if (isTemplateV2(template)) {
        setTemplateV2OnCanvases(selectedCards, template).then((colors) => {
          setOriginalColors(colors);
          setCustomColors(colors);
          setIsIdle(true);
        });
      } else {
        setTemplateOnCanvases(selectedCards, template).then((colors) => {
          setOriginalColors(colors);
          setCustomColors(colors);
          setIsIdle(true);
        });
      }
    }
  }, [template, setCustomColors, cards, setOriginalColors, setIsIdle]);

  useEffect(() => {
    const selectedCardsWithDifferentTemplate = cards.current.filter(
      (card): card is Required<CardData> =>
        card.isSelected && card.template !== template,
    );

    const selectedCards = cards.current.filter(
      (card): card is Required<CardData> => !!card.isSelected && !!card.canvas,
    );
    setIsIdle(false);
    if (isTemplateV2(template)) {
      setTemplateV2OnCanvases(
        selectedCardsWithDifferentTemplate,
        template,
      ).then(() => {
        updateColors(selectedCards, customColors, originalColors);
        setIsIdle(true);
      });
    } else {
      setTemplateOnCanvases(selectedCardsWithDifferentTemplate, template).then(
        () => {
          updateColors(selectedCards, customColors, originalColors);
          setIsIdle(true);
        },
      );
    }
  }, [cards, customColors, originalColors, setIsIdle, template]);

  return null;
};
