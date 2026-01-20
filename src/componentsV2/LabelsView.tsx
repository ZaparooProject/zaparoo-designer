import { useEffect } from 'react';
import { LabelEditor } from './LabelEditor';
import { useFileDropperContext } from '../contexts/fileDropper';
import './LabelsView.css';
import { PanelSection } from './PanelSection';
import { TextField, Typography } from '@mui/material';

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

  useEffect(() => {
    loadFontsForCanvas();
  }, []);

  return (
    <div className="editorContainer">
      <aside className="leftPanel">
        <PanelSection title="Search a game">
          <TextField
            fullWidth
            className="textField"
            size="small"
            autoComplete="off"
            label="Game name"
            style={{ fontWeight: 400, fontSize: 14 }}
            onKeyDown={(e: any) => {
              e.key === 'Enter' && 1;
            }}
          />
        </PanelSection>
        <PanelSection>
          <Typography variant="body1" color="secondary">
            Search for game covers or drop your own images
          </Typography>
        </PanelSection>
      </aside>
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
