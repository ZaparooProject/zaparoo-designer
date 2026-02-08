import { PanelSection } from './PanelSection';
import { ColorChanger } from './ColorChanger';
import { useFileDropperContext } from '../../contexts/fileDropper';
import { useAppDataContext } from '../../contexts/appData';
import { useEffect, useState } from 'react';
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
  const { cards, selectedCardsCount } = useFileDropperContext();
  const findCard = () =>
    cards.current.find((card) => card.isSelected) ?? cards.current[0];
  const [customColors, setCustomColors] = useState(
    () => findCard()?.colors ?? [],
  );
  const [originalColors] = useState(() => findCard()?.originalColors ?? []);

  useEffect(() => {}, [cards, selectedCardsCount]);

  console.log({ originalColors, customColors });

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
