import { FabricObject, Group } from 'fabric';
import { type CardData } from '../contexts/fileDropper';

const colorChanger = (
  object: FabricObject,
  colors: string[],
  originalColors: string[],
) => {
  (['stroke', 'fill'] as const).forEach((property) => {
    if (object[property]) {
      const objectOriginalColor = object[
        `original_${property}` as keyof typeof object
      ] as string;
      const originalIndex = originalColors.indexOf(objectOriginalColor);
      if (originalIndex > -1 && colors[originalIndex] !== object[property]) {
        object.set({
          [property]: colors[originalIndex],
        });
      }
    }
  });
};

export const updateColors = (cards: CardData[], colors: string[]) => {
  cards.forEach((card) => {
    const { canvas } = card;
    if (!canvas) {
      return;
    }
    card.colors = colors;
    console.log(card.originalColors);
    const { overlayImage, backgroundImage } = canvas;
    const objects = canvas.getObjects();
    objects.forEach((object) => {
      colorChanger(object, colors, card.originalColors);
    });
    if (overlayImage instanceof Group) {
      overlayImage.forEachObject((object) => {
        colorChanger(object, colors, card.originalColors);
      });
    }
    if (backgroundImage instanceof Group) {
      backgroundImage.forEachObject((object) => {
        colorChanger(object, colors, card.originalColors);
      });
    }
    canvas.requestRenderAll();
  });
};
