import { useEffect, useRef, useState } from 'react';
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
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { downloadTemplatesPreview } from '../utils/downloadTemplatePreviews';
import { TemplatePanel } from './TemplatePanel';
import { GameResourcesPanel } from './GameResourcesPanel';
import { Canvas } from 'fabric';
import { noop } from '../utils/utils';
import { ColorsPanel } from './ColorsPanel';
import { DataToCanvasReconciler } from '../components/DataToCanvasReconciler';

const enum panels {
  'Search',
  'Resources',
  'Logos',
  'Templates',
  'FilesUtils',
  'Consoles',
  'Controllers',
  'Colors',
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
  const canvasRef = useRef<Canvas | null>(null);
  const { cards, selectedCardGame } = useFileDropperContext();
  const [panel, setPanel] = useState<panels>(panels.Search);
  useEffect(() => {
    loadFontsForCanvas();
  }, []);

  return (
    <div className="editorContainer">
      <aside className="actionBar verticalStack">
        <ActionBarButton onClick={() => setPanel(panels.Search)}>
          <SearchIcon width="24" height="24" />
        </ActionBarButton>
        <ActionBarButton onClick={() => setPanel(panels.Templates)}>
          <BackupTableIcon width="24" height="24" />
        </ActionBarButton>
        <ActionBarButton onClick={() => setPanel(panels.Resources)}>
          <AddPhotoAlternateIcon width="24" height="24" />
        </ActionBarButton>
        <ActionBarButton onClick={() => setPanel(panels.Logos)}>
          <BusinessIcon width="24" height="24" />
        </ActionBarButton>
        <ActionBarButton onClick={() => setPanel(panels.Consoles)}>
          <SportsEsportsIcon width="24" height="24" />
        </ActionBarButton>
        <ActionBarButton onClick={() => setPanel(panels.Colors)}>
          <PaletteIcon width="24" height="24" />
        </ActionBarButton>
        <ActionBarButton onClick={() => setPanel(panels.FilesUtils)}>
          <BuildCircleIcon width="24" height="24" />
        </ActionBarButton>
      </aside>
      <div className="leftPanel">
        {panel === panels.Search && <ImageSearchPanel />}
        {panel === panels.Templates && <TemplatePanel canvasRef={canvasRef} />}
        {panel === panels.Resources && (
          <GameResourcesPanel game={selectedCardGame} canvasRef={canvasRef} />
        )}
        {panel === panels.Logos && <LogoTabs canvasRef={canvasRef} />}
        {panel === panels.Consoles && (
          <HardwareResourcesPanel canvasRef={canvasRef} />
        )}
        {panel === panels.Colors && <ColorsPanel canvasRef={canvasRef} />}
        {panel === panels.FilesUtils && (
          <>
            <Button variant="contained" color="secondary">
              Add from Disk
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => downloadTemplatesPreview()}
            >
              export templates
            </Button>
          </>
        )}
      </div>
      <div className="labelsView">
        {cards.current.map((card, index) => (
          <LabelEditor
            key={card.key}
            index={index}
            card={card}
            setCardToEdit={noop}
          />
        ))}
      </div>
      <DataToCanvasReconciler />
    </div>
  );
};

export default LabelsView;
