import type { templateTypeV2 } from "../resourcesTypedef";
import { StaticCanvas, FabricImage } from 'fabric';
import { setTemplateV2OnCanvases } from "./setTemplateV2";
import { CardData } from "../contexts/fileDropper";

export const prepareTemplateCarousel = async (templates: (templateTypeV2)[], img: HTMLImageElement): Promise<HTMLCanvasElement[]> => {
  const canvases = [];
  for (const template of templates) {
    const canvas = new StaticCanvas(undefined, {
      renderOnAddRemove: false,
      enableRetinaScaling: false,
      backgroundColor: 'white',
    });
    canvas.add((new FabricImage(img, { resourceType: "main" })))
    const card: CardData = {
      file: img,
      canvas,
      template,
      isSelected: false,
      colors: [],
      originalColors: [],
      key: 'x',
    }
    await setTemplateV2OnCanvases([card], template)
    canvases.push(canvas.lowerCanvasEl);
  }
  return canvases;
}