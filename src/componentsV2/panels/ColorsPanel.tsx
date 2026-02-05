import { PanelSection } from './PanelSection';
import { ColorChanger } from './ColorChanger';
import { useFileDropperContext } from '../../contexts/fileDropper';
import { useAppDataContext } from '../../contexts/appData';
import { useEffect } from 'react';
import { colorsDiffer } from '../../utils/utils';
import { RequireCards, SuggestSelecting } from './RequireEditing';

export const ColorsPanel = ({
  hasSelection,
  hasCards,
}: {
  isEditing: boolean;
  hasCards: boolean;
  hasSelection: boolean;
}) => {
  const { cards } = useFileDropperContext();
  const { isIdle } = useAppDataContext();
  const {
    originalColors,
    customColors,
    setCustomColors,
    template,
    setOriginalColors,
    setTemplate,
  } = useAppDataContext();

  console.log({ originalColors, customColors });

  useEffect(() => {
    if (hasCards) {
      const selectedCard =
        cards.current.find((card) => card.isSelected) ?? cards.current[0];
      const currentTemplate = selectedCard.template!;
      const currentColors = selectedCard.colors;
      const currentOriginalColors = selectedCard.originalColors;
      console.log({ selectedCard, currentColors, currentOriginalColors });
      if (
        customColors.length === 0 ||
        colorsDiffer(currentColors, customColors)
      ) {
        setCustomColors(currentColors);
      }
      if (
        originalColors.length === 0 ||
        colorsDiffer(currentOriginalColors, originalColors)
      ) {
        setOriginalColors(currentOriginalColors);
      }
      if (currentTemplate && currentTemplate !== template) {
        setTemplate(currentTemplate);
      }
    }
  }, [
    cards,
    customColors,
    originalColors,
    hasSelection,
    setCustomColors,
    setOriginalColors,
    setTemplate,
    template,
    hasCards,
    isIdle,
  ]);

  return (
    <PanelSection title="Color selection">
      {hasCards || <RequireCards />}
      {hasSelection || <SuggestSelecting />}
      <div className="resourceListAreaLogos">
        <ColorChanger
          setCustomColors={setCustomColors}
          customColors={customColors}
          originalColors={originalColors}
        />
      </div>
    </PanelSection>
  );
};
