import type { templateType, templateTypeV2 } from "../resourcesTypedef";
import { StaticCanvas, FabricImage } from 'fabric';
import { setTemplateOnCanvases } from "./setTemplate";
import { setTemplateV2OnCanvases } from "./setTemplateV2";
import { CardData } from "../contexts/fileDropper";
import { isTemplateV2 } from "./utils";

export const prepareTemplateCarousel = async (templates: (templateType | templateTypeV2)[], img: HTMLImageElement): Promise<HTMLCanvasElement[]> => {
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
    if (isTemplateV2(template)) {
      await setTemplateV2OnCanvases([card], template)
    } else {
      await setTemplateOnCanvases([card], template)
    }
    canvases.push(canvas.lowerCanvasEl);
  }
  return canvases;
}