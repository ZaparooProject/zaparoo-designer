import { useEffect } from 'react';
import { LabelEditor } from './LabelEditor';
import { DataToCanvasReconciler } from './DataToCanvasReconciler';
import { useFileDropperContext } from '../contexts/fileDropper';
import './LabelsView.css';
import { SmallDropZone } from './SmallDropZone';
import { SingleCardEditModal } from './SingleCardEditModal';
import { useSingleEditModal } from '../hooks/useSingleEditModal';

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
  const { isOpen, onClose, setCardToEdit, currentCardIndex } =
    useSingleEditModal();
  return (
    <div className="labelsView">
      {cards.current.map((card, index) => (
        <LabelEditor
          setCardToEdit={setCardToEdit}
          className="labelContainer horizontal"
          key={card.key}
          index={index}
          card={card}
        />
      ))}
      <SmallDropZone className="labelContainer horizontal" />
      <DataToCanvasReconciler />
      <SingleCardEditModal
        isOpen={isOpen}
        onClose={onClose}
        currentCardIndex={currentCardIndex}
      />
    </div>
  );
};

export default LabelsView;
