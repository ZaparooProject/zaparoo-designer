import {
  lazy,
  MutableRefObject,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from 'react';
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
import BusinessIcon from '@mui/icons-material/Business';
import EditIcon from '@mui/icons-material/Edit';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { downloadTemplatesPreview } from '../utils/downloadTemplatePreviews';
import { Canvas } from 'fabric';
import { ColorsPanel } from './ColorsPanel';
import { DataToCanvasReconciler } from '../components/DataToCanvasReconciler';
import { SingleCardEditModal } from './SingleCardEditModal';
import { LayersPanel } from './LayersPanel';
import { TemplatePreview } from './TemplatePreview';

const LogoTabs = lazy(() => import('./LogosTabs'));
const HardwareResourcesPanel = lazy(() => import('./HardwareResourcesPanel'));
const TemplatePanel = lazy(() => import('./TemplatePanel'));
const GameResourcesPanel = lazy(() => import('./GameResourcesPanel'));

const enum panels {
  'Search',
  'Resources',
  'Logos',
  'Templates',
  'FilesUtils',
  'Consoles',
  'Controllers',
  'Colors',
  'Edit',
}

const requireSelectionPanel = [panels.Templates, panels.Colors];
const requireEditingPanel = [
  panels.Templates,
  panels.Colors,
  panels.Resources,
  panels.Logos,
  panels.Consoles,
  panels.Controllers,
  panels.Edit,
];

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
  const { cards, selectedCardsCount, editingCard, setEditingCard } =
    useFileDropperContext();
  const [panel, setPanel] = useState<panels>(panels.Search);
  const [canvasRef, setCurrentEditingCanvas] = useState<
    MutableRefObject<Canvas | null>
  >({ current: null });
  useEffect(() => {
    loadFontsForCanvas();
  }, []);

  const onClose = useCallback(() => {
    setEditingCard(-1);
    setCurrentEditingCanvas({ current: null });
  }, [setEditingCard]);

  const editingIsRequired = requireEditingPanel.includes(panel);
  const selectionIsRequired = requireSelectionPanel.includes(panel);

  const isEditing = canvasRef.current !== null;
  const hasSelection = selectedCardsCount > 0 || isEditing;
  const hasCards = cards.current.length > 0;

  return (
    <div className="editorContainer">
      <aside className="actionBar verticalStack">
        <ActionBarButton
          label="SEARCH"
          onClick={() => setPanel(panels.Search)}
          selected={panel === panels.Search}
        >
          <SearchIcon width="24" height="24" />
        </ActionBarButton>
        <ActionBarButton
          label="TEMPLATES"
          onClick={() => setPanel(panels.Templates)}
          selected={panel === panels.Templates}
        >
          <BackupTableIcon width="24" height="24" />
        </ActionBarButton>
        <ActionBarButton
          label="GAME"
          onClick={() => setPanel(panels.Resources)}
          selected={panel === panels.Resources}
        >
          <AddPhotoAlternateIcon width="24" height="24" />
        </ActionBarButton>
        <ActionBarButton
          label="LOGOS"
          onClick={() => setPanel(panels.Logos)}
          selected={panel === panels.Logos}
        >
          <BusinessIcon width="24" height="24" />
        </ActionBarButton>
        <ActionBarButton
          label="CONSOLES"
          onClick={() => setPanel(panels.Consoles)}
          selected={panel === panels.Consoles}
        >
          <SportsEsportsIcon width="24" height="24" />
        </ActionBarButton>
        <ActionBarButton
          label="COLORS"
          onClick={() => setPanel(panels.Colors)}
          selected={panel === panels.Colors}
        >
          <PaletteIcon width="24" height="24" />
        </ActionBarButton>
        <ActionBarButton
          label="EDIT"
          onClick={() => setPanel(panels.Edit)}
          selected={panel === panels.Edit}
        >
          <EditIcon width="24" height="24" />
        </ActionBarButton>
        <ActionBarButton
          label="UTILS"
          onClick={() => setPanel(panels.FilesUtils)}
          selected={panel === panels.FilesUtils}
        >
          <BuildCircleIcon width="24" height="24" />
        </ActionBarButton>
      </aside>
      <div className="leftPanel">
        <Suspense fallback={null}>
          {panel === panels.Search && <ImageSearchPanel />}
          {panel === panels.Templates && (
            <TemplatePanel
              isEditing={isEditing}
              canvasRef={canvasRef}
              hasSelection={hasSelection}
              hasCards={hasCards}
            />
          )}
          {panel === panels.Resources && (
            <GameResourcesPanel
              game={editingCard?.game}
              canvasRef={canvasRef}
              isEditing={isEditing}
              hasCards={hasCards}
            />
          )}
          {panel === panels.Logos && (
            <LogoTabs
              canvasRef={canvasRef}
              isEditing={isEditing}
              hasCards={hasCards}
            />
          )}
          {panel === panels.Consoles && (
            <HardwareResourcesPanel
              canvasRef={canvasRef}
              isEditing={isEditing}
              hasCards={hasCards}
            />
          )}
          {panel === panels.Colors && (
            <ColorsPanel
              isEditing={isEditing}
              hasSelection={hasSelection}
              hasCards={hasCards}
            />
          )}
          {panel === panels.Edit && (
            <LayersPanel
              canvasRef={canvasRef}
              isEditing={isEditing}
              hasCards={hasCards}
            />
          )}
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
        </Suspense>
      </div>
      <div className="labelsView">
        {cards.current.map((card, index) => (
          <LabelEditor
            key={card.key}
            index={index}
            card={card}
            setCardToEdit={setEditingCard}
            editingIsRequired={editingIsRequired}
            selectionIsRequired={selectionIsRequired}
            hasSelection={hasSelection}
          />
        ))}
        <TemplatePreview />
        <SingleCardEditModal
          setCurrentEditingCanvas={setCurrentEditingCanvas}
          isOpen={!!editingCard}
          onClose={onClose}
        />
      </div>
      <DataToCanvasReconciler />
    </div>
  );
};

export default LabelsView;
