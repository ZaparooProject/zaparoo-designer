import { IconButton } from '@mui/material';
import { ColorButtons } from './ColorButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useCallback } from 'react';

type ColorChangerProps = {
  setCustomColors: (colors: string[]) => void;
  customColors: string[];
  originalColors: string[];
};

export const ColorChanger = ({
  setCustomColors,
  customColors,
  originalColors,
}: ColorChangerProps) => {
  const reset = useCallback(() => {
    setCustomColors(originalColors);
  }, [originalColors, setCustomColors]);

  return (
    <>
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
        <IconButton onClick={reset}>
          <RestartAltIcon />
        </IconButton>
      )}
    </>
  );
};

export default ColorChanger;
