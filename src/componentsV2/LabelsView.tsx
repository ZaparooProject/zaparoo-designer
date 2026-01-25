import { useEffect, useState } from 'react';
import { LabelEditor } from './LabelEditor';
import { useFileDropperContext } from '../contexts/fileDropper';
import './LabelsView.css';
import { Button } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SearchIcon from '@mui/icons-material/Search';
import PaletteIcon from '@mui/icons-material/Palette';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { ActionBarButton } from './ActionBarButton';
import ImageSearchPanel from './SearchPanel';
import { HardwareResourcesPanel } from './HardwareResourcesPanel';
import { LogoTabs } from './LogosTabs';
import BusinessIcon from '@mui/icons-material/Business';

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
          <BusinessIcon
            width="24"
            height="24"
            onClick={() => setPanel(panels.Logos)}
          />
        </ActionBarButton>
        <ActionBarButton>
          <SportsEsportsIcon
            width="24"
            height="24"
            onClick={() => setPanel(panels.Consoles)}
          />
        </ActionBarButton>
        <ActionBarButton>
          <PaletteIcon width="24" height="24" />
        </ActionBarButton>
      </aside>
      <div className="leftPanel">
        {panel === panels.Search && <ImageSearchPanel />}
        {/* 
        {panel === panels.Resources && (
          <GameResourcesPanel game={{}} canvasRef={{}} />
        )} */}
        {panel === panels.Logos && <LogoTabs canvasRef={{}} />}
        {panel === panels.Consoles && <HardwareResourcesPanel canvasRef={{}} />}
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
