import { useEffect, useState } from 'react';
import { LabelEditor } from './LabelEditor';
import { useFileDropperContext } from '../contexts/fileDropper';
import './LabelsView.css';
import { PanelSection } from './PanelSection';
import { IconButton, TextField, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PaletteIcon from '@mui/icons-material/Palette';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { ActionBarButton } from './ActionBarButton';
import ImageSearchPanel from './SearchPanel';
import { GameResourcesPanel } from './GameResourcesPanel';
import { LogoTabs } from '../components/LogosTabs';
import { ConsoleDisplay } from '../components/ConsoleDisplay';
import { ControllerDisplay } from '../components/ControllerDisplay';

const enum panels {
  'Search',
  'Resources',
  'Logos',
  'Templates',
  'FilesUtils',
  'Consoles',
  'Controllers',
}

const loadFontsForCanvas = async () => {
  const fontsToLoad = [
    { family: 'Noto Sans', weight: '400', style: 'normal' },
    { family: 'Noto Sans', weight: '400', style: 'italic' },
    { family: 'Noto Sans', weight: '700', style: 'normal' },
  ];

  await Promise.all(
    fontsToLoad.map(({ family, weight, style }) =>
      document.fonts.load(`${style} ${weight} 16px "${family}"`),
    ),
  ).then(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      fontsToLoad.forEach(({ family, weight, style }) => {
        ctx.font = `${style} ${weight} 16px "${family}"`;
        ctx.fillText('preload', 0, 0);
      });
    }
  });

  // Create a small disposable canvas to ensure fonts are canvas-ready
};

export const LabelsView = () => {
  const { cards } = useFileDropperContext();
  const [panel, setPanel] = useState<panels>(panels.Search);
  useEffect(() => {
    loadFontsForCanvas();
  }, []);

  return (
    <div className="editorContainer">
      <aside className="actionBar verticalStack">
        <ActionBarButton>
          <SearchIcon
            width="24"
            height="24"
            onClick={() => setPanel(panels.Search)}
          />
        </ActionBarButton>
        <ActionBarButton>
          <BackupTableIcon
            width="24"
            height="24"
            onClick={() => setPanel(panels.Templates)}
          />
        </ActionBarButton>
        <ActionBarButton>
          <AddPhotoAlternateIcon
            width="24"
            height="24"
            onClick={() => setPanel(panels.Resources)}
          />
        </ActionBarButton>
        <ActionBarButton>
          <AddPhotoAlternateIcon
            width="24"
            height="24"
            onClick={() => setPanel(panels.Logos)}
          />
        </ActionBarButton>
        <ActionBarButton>
          <AddPhotoAlternateIcon
            width="24"
            height="24"
            onClick={() => setPanel(panels.Consoles)}
          />
        </ActionBarButton>
        <ActionBarButton>
          <AddPhotoAlternateIcon
            width="24"
            height="24"
            onClick={() => setPanel(panels.Controllers)}
          />
        </ActionBarButton>
        <ActionBarButton>
          <PaletteIcon width="24" height="24" />
        </ActionBarButton>
      </aside>
      <div className="leftPanel">
        {panel === panels.Search && <ImageSearchPanel />}

        {panel === panels.Resources && <GameResourcesPanel game={{}} />}
        {panel === panels.Logos && <LogoTabs canvasRef={{}} />}
        {panel === panels.Consoles && <ConsoleDisplay canvasRef={{}} />}
        {panel === panels.Controllers && <ControllerDisplay canvasRef={{}} />}

        {panel === panels.FilesUtils && (
          <Button variant="contained" color="secondary">
            Add from Disk
          </Button>
        )}
      </div>
      <div className="labelsView">
        {cards.current.map((card, index) => (
          <LabelEditor
            className="labelContainer horizontal"
            key={card.key}
            index={index}
            card={card}
          />
        ))}
      </div>
    </div>
  );
};

export default LabelsView;
