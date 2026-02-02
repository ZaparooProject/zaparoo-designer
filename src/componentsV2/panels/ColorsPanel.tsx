import { PanelSection } from './PanelSection';
import { ColorChanger } from './ColorChanger';
import { useFileDropperContext } from '../../contexts/fileDropper';
import { useAppDataContext } from '../../contexts/appData';
import { useEffect } from 'react';
import { colorsDiffer } from '../../utils/utils';
import { RequireEditing, RequireSelection } from './RequireEditing';

export const ColorsPanel = ({
  isEditing,
  hasSelection,
  hasCards,
}: {
  isEditing: boolean;
  hasCards: boolean;
  hasSelection: boolean;
}) => {
  const { selectedCardsCount, cards } = useFileDropperContext();
  const {
    originalColors,
    customColors,
    setCustomColors,
    template,
    setOriginalColors,
    setTemplate,
  } = useAppDataContext();

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

  return (
    <PanelSection title="Color selection">
      {isEditing || <RequireEditing />}
      {hasSelection || <RequireSelection />}
      {hasCards || <RequireSelection />}
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
