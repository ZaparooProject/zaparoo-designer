import { PanelSection } from './PanelSection';
import { useFileDropperContext } from '../../contexts/fileDropper';
import { useAppDataContext } from '../../contexts/appData';
import { useEffect, useState } from 'react';
import { RequireCards, SuggestSelecting } from './RequireEditing';
import { extractUniqueColorsFromGroup } from '../../utils/templateHandling';
import { type Group } from 'fabric';
import { IconButton, Typography } from '@mui/material';
import { ColorButtons } from './ColorButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export const ColorsPanel = ({
  hasSelection,
  hasCards,
}: {
  isEditing: boolean;
  hasCards: boolean;
  hasSelection: boolean;
}) => {
  const { cards, selectedCardsCount } = useFileDropperContext();
  const { template } = useAppDataContext();
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [originalColors, setOriginalColors] = useState<string[]>([]);

  useEffect(() => {
    const colorPicker = async () => {
      const card =
        cards.current.find((card) => card.isSelected) ?? cards.current[0];
      const objectGroup = card?.canvas ?? (await template.parsed);
      console.log(objectGroup);
      const actualColors = extractUniqueColorsFromGroup(objectGroup as Group);
      setCustomColors(actualColors);
      setOriginalColors(card ? card.originalColors : actualColors);
    };
    colorPicker();
  }, [selectedCardsCount]);

  return (
    <PanelSection title="Color selection">
      {hasCards || <RequireCards />}
      {hasSelection || <SuggestSelecting />}
      <Typography color="secondary">
        Select on color from the current selected card and change it with
        another
      </Typography>
      <div className="horizontalStack">
        {originalColors.map((color, index) => (
          <ColorButtons
            key={color}
            color={customColors[index]}
            onClick={(color) => {
              const newColors = [...customColors];
              newColors[index] = color;
              setCustomColors(newColors);
            }}
          />
        ))}
        {originalColors.length > 0 && (
          <IconButton onClick={() => setCustomColors(originalColors)}>
            <RestartAltIcon />
          </IconButton>
        )}
      </div>
    </PanelSection>
  );
};

export default ColorsPanel;
