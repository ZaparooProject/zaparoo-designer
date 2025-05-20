import {
  FabricImage,
  util,
  loadSVGFromURL,
  Group,
  FabricObject,
  type Canvas,
  Rect,
  Path,
  type StaticCanvas,
} from 'fabric';
import { CardData } from '../contexts/fileDropper';
import type { templateTypeV2 } from '../resourcesTypedef';
import { extractUniqueColorsFromGroup } from './templateHandling';

FabricObject.ownDefaults.originX = 'center';
FabricObject.ownDefaults.originY = 'center';
FabricObject.ownDefaults.objectCaching = false;
/* add the ability to parse 'id' and zaparoo attributes to shapes */
Rect.ATTRIBUTE_NAMES = [...Rect.ATTRIBUTE_NAMES, 'id', 'zaparoo-placeholder', 'zaparoo-fill-strategy', 'zaparoo-no-print'];
Path.ATTRIBUTE_NAMES = [...Path.ATTRIBUTE_NAMES, 'id', 'zaparoo-placeholder', 'zaparoo-fill-strategy', 'zaparoo-no-print'];
FabricImage.ATTRIBUTE_NAMES = [...FabricImage.ATTRIBUTE_NAMES, 'id', 'zaparoo-no-print'];
FabricObject.customProperties = [
  'zaparoo-placeholder',
  'id',
  'zaparoo-fill-strategy',
  'original_stroke',
  'original_fill',
  'zaparoo-no-print'
];

FabricImage.customProperties = [
  'resourceType',
  'original_stroke',
  'original_fill',
  'zaparoo-no-print'
];

// declare the methods for typescript
declare module "fabric" {
  // to have the properties recognized on the instance and in the constructor
  interface FabricObject {
    "original_fill": string;
    "original_stroke": string;
    "zaparoo-placeholder"?: "main";
    "zaparoo-no-print"?: "true";
    "zaparoo-fill-strategy"?: "fit" | "cover";
  }

  interface FabricImage {
    "resourceType"?: "main" | "screenshot" | "logo";
  }
}

export const getPlaceholderMain = (canvas: Canvas | Group | StaticCanvas) => canvas.getObjects().find((obj) => obj["zaparoo-placeholder"] === "main")

export const getMainImage = (canvas: Canvas | Group | StaticCanvas) => canvas.getObjects('image')
.find(
  (fabricImage) =>
    (fabricImage as FabricImage).resourceType === 'main',
) as FabricImage;

export const scaleImageToOverlayArea = async (
  placeholder: FabricObject,
  mainImage: FabricImage,
) => {

  // scale the art to the designed area in the template. to fit
  // TODO: add option later for fit or cover
  const isRotated = mainImage.angle % 180 !== 0;
  const isCover =  placeholder["zaparoo-fill-strategy"] === "cover";
  const scaler = isCover ? util.findScaleToCover : util.findScaleToFit;
  const scaledOverlay = placeholder._getTransformedDimensions();

  const scale = scaler(
    {
      width: isRotated ? mainImage.height : mainImage.width,
      height: isRotated ? mainImage.width : mainImage.height,
    },
    {
      width: scaledOverlay.x,
      height: scaledOverlay.y,
    },
  );

  if (isCover) {
    const clipPath = await placeholder.clone();
    clipPath.visible = true;
    clipPath.absolutePositioned = true;
    mainImage.clipPath = clipPath;
  } else {
    mainImage.clipPath = undefined
  }

  mainImage.set({
    scaleX: scale,
    scaleY: scale,
  });

  mainImage.top = placeholder.top;
  mainImage.left = placeholder.left;

  if (mainImage.clipPath) {
    mainImage.clipPath.left = mainImage.left;
    mainImage.clipPath.top = mainImage.top;
  }
  mainImage.setCoords();
};



const parseSvg = (url: string): Promise<Group> =>
  loadSVGFromURL(url).then(({ objects }) => {
    const nonNullObjects = objects.filter(
      (objects) => !!objects,
    ) as FabricObject[];
    const group = new Group(nonNullObjects);
    extractUniqueColorsFromGroup(group);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return group;
  });

const reposition = (
  fabricLayer: FabricObject,
  template: templateTypeV2,
): void => {
  if (template.layout === 'horizontal') {
    fabricLayer.left = template.media.width / 2;
    fabricLayer.top = template.media.height / 2;
  } else {
    fabricLayer.left = template.media.height / 2;
    fabricLayer.top = template.media.width / 2;
  }
  fabricLayer.setCoords();
};

export const setTemplateV2OnCanvases = async (
  cards: CardData[],
  template: templateTypeV2,
): Promise<string[]> => {
  const { layout, url, parsed, media } = template;

  const templateSource = await (parsed ?? (template.parsed = parseSvg(url)));
  const placeholder = getPlaceholderMain(templateSource);
  if (placeholder) {
      // remove strokewidth so the placeholder can clip the image
      placeholder.strokeWidth = 0;
      // the placeholder stays with us but we don't want to see it
      placeholder.visible = false;
  }
  // fixme: avoid parsing colors more than once.
  const colors = extractUniqueColorsFromGroup(templateSource);
  const isHorizontal = layout === 'horizontal';
  const { width, height } = media;
  const finalWidth = isHorizontal ? width : height;
  const finalHeight = isHorizontal ? height : width;

  for (const card of cards) {
    const { canvas } = card;
    if (!canvas) {
      continue;
    }
    card.template = template;
    // resize only if necessary
    if (finalHeight !== canvas.height || finalWidth !== canvas.width) {
      canvas.setDimensions(
        {
          width: finalWidth,
          height: finalHeight,
        },
        { backstoreOnly: true },
      );
      const clipPath = new Rect(template.media);
      clipPath.canvas = canvas as Canvas;
      canvas.centerObject(clipPath);
      canvas.clipPath = clipPath;

      canvas.setDimensions(
        {
          width: isHorizontal ? 'var(--cell-width)' : 'auto',
          height: isHorizontal ? 'auto' : 'var(--cell-width)',
        },
        { cssOnly: true },
      );
    }
    // save a reference to the original image
    const mainImage = canvas.getObjects('image').find(
      (fabricImage) => (fabricImage as FabricImage).resourceType === 'main'
    ) as FabricImage;

    // copy the template for this card
    const fabricLayer = await templateSource.clone();
    // find out how bit it is naturally
    const templateSize = fabricLayer._getTransformedDimensions();
    
    if (media?.stretchTemplate) {
      // Stretch the overlay asset to fill the designed media ( the card )
      fabricLayer.scaleX = canvas.width / templateSize.x;
      fabricLayer.scaleY = canvas.height / templateSize.y;
    } else {
      // scale the overlay asset to fit the designed media ( the card )
      const templateScale = util.findScaleToFit({
        width: templateSize.x,
        height: templateSize.y,
      }, canvas);

      fabricLayer.scaleX = templateScale;
      fabricLayer.scaleY = templateScale;
    }
    // set the overlay of the template in the center of the card
    reposition(fabricLayer, template);

    // remove the previous template from the canvas if any.
    canvas.remove(...canvas.getObjects());
    canvas.backgroundImage = undefined;
    canvas.overlayImage = undefined;
    // add the template to the canvas
    canvas.add(...fabricLayer.removeAll());
    // find the layer that olds the image.
    const placeholder = getPlaceholderMain(canvas);
    if (placeholder) {
      // add the image on the placeholder
      if (mainImage) {
        const index = canvas.getObjects().indexOf(placeholder);
        canvas.insertAt(index, mainImage);
        await scaleImageToOverlayArea(placeholder, mainImage);
      }
    }
  
    const { clipPath } = canvas;
    if (clipPath) {
      if (template.layout === 'horizontal') {
        clipPath.angle = 0;
      } else {
        clipPath.angle = 90;
      }
      reposition(clipPath, template);
    }

    canvas.requestRenderAll();
  }
  // this could returned by the promise right away
  return colors;
};
