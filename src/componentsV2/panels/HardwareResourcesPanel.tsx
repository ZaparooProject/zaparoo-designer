import { type MutableRefObject, type SyntheticEvent, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { type Canvas } from 'fabric';
import { ControllerDisplay } from './ControllerDisplay';
import { ConsoleDisplay } from './ConsoleDisplay';
import './HardwareResourcesPanel.css';
import { PanelSection } from './PanelSection';
import { RequireCards, SuggestClick, SuggestDrag } from './RequireEditing';

type GameResourcesDisplayProps = {
  canvasRef: MutableRefObject<Canvas | null>;
  isEditing: boolean;
  hasCards: boolean;
};

export function HardwareResourcesPanel({
  canvasRef,
  isEditing,
  hasCards,
}: GameResourcesDisplayProps) {
  const [value, setValue] = useState('consoles');
  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <PanelSection title="Hardware">
      {hasCards && !isEditing && <SuggestDrag />}
      {hasCards && isEditing && <SuggestClick />}
      {hasCards || <RequireCards />}
      <div className="horizontalStack tabs">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Consoles" value="consoles" />
          <Tab label="Controllers" value="controllers" />
        </Tabs>
      </div>
      {value === 'controllers' && (
        <ControllerDisplay canvasRef={canvasRef} blocked={!hasCards} />
      )}
      {value === 'consoles' && (
        <ConsoleDisplay canvasRef={canvasRef} blocked={!hasCards} />
      )}
    </PanelSection>
  );
}

export default HardwareResourcesPanel;
