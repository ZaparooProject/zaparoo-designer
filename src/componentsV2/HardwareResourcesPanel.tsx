import { type MutableRefObject, type SyntheticEvent, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { type Canvas } from 'fabric';
import { ControllerDisplay } from './ControllerDisplay';
import { ConsoleDisplay } from './ConsoleDisplay';
import './HardwareResourcesPanel.css';

type GameResourcesDisplayProps = {
  canvasRef: MutableRefObject<Canvas | null>;
};

export function HardwareResourcesPanel({
  canvasRef,
}: GameResourcesDisplayProps) {
  const [value, setValue] = useState('consoles');
  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="horizontalStack tabs">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Consoles" value="consoles" />
          <Tab label="Controllers" value="controllers" />
        </Tabs>
      </div>
      {value === 'controllers' && <ControllerDisplay canvasRef={canvasRef} />}
      {value === 'consoles' && <ConsoleDisplay canvasRef={canvasRef} />}
    </>
  );
}
