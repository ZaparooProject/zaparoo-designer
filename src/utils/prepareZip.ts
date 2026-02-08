import type { InputWithSizeMeta } from 'client-zip';
import { downloadBlob } from './utils';
import { CardData } from '../contexts/fileDropper';
import { type FabricObject } from 'fabric';

export const prepareZip = async (cards: CardData[]) => {
  const { downloadZip } = await import('client-zip');
  const canvases = cards.map((card) => card.canvas!);
  if (canvases) {
    const inputs = await Promise.all(
      canvases.map<Promise<InputWithSizeMeta>>((origiCanvas, index) => {
        return origiCanvas.clone([]).then((canvas) => {
          canvas.getObjects().forEach((object: FabricObject) => {
            if (object['zaparoo-no-print']) {
              object.visible = false;
            }
          });
          const referenceObject = (canvas.backgroundImage ||
            canvas.overlayImage ||
            canvas.clipPath)!;
          const { top, left, width, height } =
            referenceObject!.getBoundingRect();
          // TODO: the top and left values should take in account of viewport translations
          const htmlCanvas = canvas.toCanvasElement(2 / canvas.getZoom(), {
            top: top * canvas.getZoom(),
            left: left * canvas.getZoom(),
            width: width * canvas.getZoom(),
            height: height * canvas.getZoom(),
          });
          return new Promise((resolve) => {
            htmlCanvas.toBlob((blob: Blob | null) => {
              blob &&
                resolve({
                  name: `label_${index}.png`,
                  lastModified: Date.now(),
                  input: blob,
                  size: blob.size,
                });
            });
          });
        });
      }),
    );
    const blob = await downloadZip(inputs).blob();
    // trigger download
    downloadBlob(blob, 'labels.zip');
  }
};
