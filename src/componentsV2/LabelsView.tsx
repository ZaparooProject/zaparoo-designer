import {
  lazy,
  MutableRefObject,
  Suspense,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { LabelEditor } from './LabelEditor';
import { useFileDropperContext } from '../contexts/fileDropper';
import './LabelsView.css';
import { Button, Typography } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SearchIcon from '@mui/icons-material/Search';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { ActionBarButton } from './ActionBarButton';
import ImageSearchPanel from './panels/SearchPanel';
import BusinessIcon from '@mui/icons-material/Business';
import EditIcon from '@mui/icons-material/Edit';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { downloadTemplatesPreview } from '../utils/downloadTemplatePreviews';
import { Canvas } from 'fabric';
import { DataToCanvasReconciler } from './DataToCanvasReconciler';
import { TemplatePreview } from './TemplatePreview';
import {
  panels,
  requireSelectionPanel,
  panelReducer,
  initialPanelState,
} from './panelReducer';
import { selectAllCards, clearCardSelection } from './cardSelection';

const LogoTabs = lazy(() => import('./panels/LogosTabs'));
const HardwareResourcesPanel = lazy(
  () => import('./panels/HardwareResourcesPanel'),
);
const TemplatePanel = lazy(() => import('./panels/TemplatePanel'));
const GameResourcesPanel = lazy(() => import('./panels/GameResourcesPanel'));
const LayersPanel = lazy(() => import('./panels/LayersPanel'));
const ColorsPanel = lazy(() => import('./panels/ColorsPanel'));
const SingleCardEditModal = lazy(() => import('./SingleCardEditModal'));

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
  const {
    cards,
    selectedCardsCount,
    setSelectedCardsCount,
    editingCard,
    setEditingCard,
  } = useFileDropperContext();
  const clearSelection = useCallback(() => {
    setSelectedCardsCount(clearCardSelection(cards.current));
  }, [cards, setSelectedCardsCount]);
  const selectAll = useCallback(() => {
    setSelectedCardsCount(selectAllCards(cards.current));
  }, [cards, setSelectedCardsCount]);
  const [{ panel }, dispatch] = useReducer(panelReducer, initialPanelState);
  const setPanel = useCallback(
    (p: panels) => dispatch({ type: 'SELECT_PANEL', panel: p }),
    [],
  );

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

  const isEditing = canvasRef.current !== null;
  const wasEditing = useRef(false);

  useEffect(() => {
    if (isEditing && !wasEditing.current) {
      dispatch({ type: 'ENTER_EDITING', editingCard });
    } else if (!isEditing && wasEditing.current) {
      dispatch({ type: 'LEAVE_EDITING' });
    }
    wasEditing.current = isEditing;
  }, [isEditing, editingCard]);

  const selectionIsRequired = requireSelectionPanel.includes(panel);
  const hasSelection = selectedCardsCount > 0 || isEditing;
  const hasCards = cards.current.length > 0;

  return (
    <div className="editorContainer">
      <aside className="actionBar verticalStack">
        <ActionBarButton
          label="TEMPLATES"
          onClick={() => setPanel(panels.Templates)}
          selected={panel === panels.Templates}
          disabled={isEditing}
          tooltip="Close editor to change template"
        >
          <BackupTableIcon width="24" height="24" />
        </ActionBarButton>
        <ActionBarButton
          label="SEARCH"
          onClick={() => setPanel(panels.Search)}
          selected={panel === panels.Search}
        >
          <SearchIcon width="24" height="24" />
        </ActionBarButton>
        <ActionBarButton
          label="GAME"
          onClick={() => setPanel(panels.Resources)}
          selected={panel === panels.Resources}
          disabled={!isEditing}
          tooltip="Click a card to edit"
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
          label="EDIT"
          onClick={() => setPanel(panels.Edit)}
          selected={panel === panels.Edit}
          disabled={!isEditing}
          tooltip="Click a card to edit"
        >
          <EditIcon width="24" height="24" />
        </ActionBarButton>
        {import.meta.env.DEV && (
          <ActionBarButton
            label="UTILS"
            onClick={() => setPanel(panels.FilesUtils)}
            selected={panel === panels.FilesUtils}
            disabled={isEditing}
            tooltip="Close editor first"
          >
            <BuildCircleIcon width="24" height="24" />
          </ActionBarButton>
        )}
      </aside>
      <div className="leftPanel">
        <Suspense fallback={null}>
          {panel === panels.Search && (
            <ImageSearchPanel
              isEditing={isEditing}
              onSelectGame={() => setPanel(panels.Resources)}
            />
          )}
          {panel === panels.Templates && (
            <TemplatePanel canvasRef={canvasRef} hasCards={hasCards} />
          )}
          {panel === panels.Resources && (
            <GameResourcesPanel
              game={editingCard?.game}
              canvasRef={canvasRef}
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
            <LayersPanel canvasRef={canvasRef} hasCards={hasCards} />
          )}
          {import.meta.env.DEV && panel === panels.FilesUtils && (
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
      <div
        className="labelsView"
        style={
          selectionIsRequired && hasCards ? { paddingBottom: 72 } : undefined
        }
      >
        {hasCards && !isEditing && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ position: 'absolute', top: 4, left: 8, zIndex: 1 }}
          >
            Click a card to edit it.
          </Typography>
        )}
        {cards.current.map((card, index) => (
          <LabelEditor
            key={card.key}
            index={index}
            card={card}
            setCardToEdit={setEditingCard}
            selectionIsRequired={selectionIsRequired}
          />
        ))}
        <TemplatePreview hasCards={hasCards} />
        {selectionIsRequired && hasCards && (
          <div className="selectionBar">
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={selectAll}
              disabled={selectedCardsCount === cards.current.length}
              disableElevation
            >
              Select all
            </Button>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={clearSelection}
              disabled={selectedCardsCount === 0}
              disableElevation
            >
              Clear selection ({selectedCardsCount})
            </Button>
          </div>
        )}
        {!!editingCard && (
          <SingleCardEditModal
            setCurrentEditingCanvas={setCurrentEditingCanvas}
            isOpen={!!editingCard}
            onClose={onClose}
          />
        )}
      </div>
      <DataToCanvasReconciler />
    </div>
  );
};

export default LabelsView;
