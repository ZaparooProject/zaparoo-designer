import {
  FabricImage,
  util,
  Point,
  loadSVGFromURL,
  Group,
  FabricObject,
  type Canvas,
  Rect,
} from 'fabric';
import { CardData } from '../contexts/fileDropper';
import type { templateType, templateTypeV2 } from '../resourcesTypedef';
import { extractUniqueColorsFromGroup } from './templateHandling';

FabricObject.ownDefaults.originX = 'center';
FabricObject.ownDefaults.originY = 'center';
FabricObject.ownDefaults.objectCaching = false;
/* add the ability to parse 'id' to rects */
Rect.ATTRIBUTE_NAMES = [...Rect.ATTRIBUTE_NAMES, 'id', 'zaparoo-placeholder', 'zaparoo-scale-strategy'];
FabricObject.customProperties = [
  'zaparoo-placeholder',
  'id',
  'zaparoo-scale-strategy',
  'original_stroke',
  'original_fill'
];

// declare the methods for typescript
declare module "fabric" {
  // to have the properties recognized on the instance and in the constructor
  interface FabricObject {
    "original_fill": string;
    "original_stroke": string;
    "zaparoo-placeholder"?: "main";
    "zaparoo-scale-strategy"?: "fit" | "cover";
  }
}


export const scaleImageToOverlayArea = (
  placeholder: FabricObject,
  mainImage: FabricImage,
) => {

  // scale the art to the designed area in the template. to fit
  // TODO: add option later for fit or cover
  const isRotated = mainImage.angle % 180 !== 0;
  const isCover =  placeholder["zaparoo-scale-strategy"] === "cover";
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
    const  clipPath =  new Rect({ width: scaledOverlay.x, height: scaledOverlay.y });
    clipPath.absolutePositioned = true;
    mainImage.clipPath = clipPath;
  } else {
    mainImage.clipPath = undefined
  }

  mainImage.set({
    scaleX: scale,
    scaleY: scale,
  });

  const placeholderMatrix = placeholder.calcTransformMatrix();
  mainImage.setPositionByOrigin(
    new Point(
      placeholderMatrix[4],
      placeholderMatrix[5],
    ),
    'center',
    'center',
  );
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
  template: templateType,
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

  const templateSource = await (parsed ?? (template.parsed = parseSvg(url)))
  const fabricLayer = await templateSource.clone();

  const isHorizontal = layout === 'horizontal';
  const { width, height } = template.media;
  const finalWidth = isHorizontal ? width : height;
  const finalHeight = isHorizontal ? height : width;
  const colors = extractUniqueColorsFromGroup(fabricLayer);

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
    const mainImage = canvas.getObjects('image')[0] as FabricImage;

    const placeholder = fabricLayer.getObjects().find((obj) => obj["zaparoo-placeholder"] === "main");
    if (!placeholder) {
      continue;
    }

    // remove strokewidth so the placeholder can clip the image
    placeholder.strokeWidth = 0;
    placeholder.visible = false;
    const templateSize = fabricLayer._getTransformedDimensions();
    // find the layer that olds the image.

    // scale the overlay asset to fit the designed media
    const templateScale = util.findScaleToFit({
      width: templateSize.x,
      height: templateSize.y,
    }, media);

    fabricLayer.set('canvas', canvas);
    fabricLayer.scaleX = templateScale;
    fabricLayer.scaleY = templateScale;
    // set the overlay of the template in the center of the card
    reposition(fabricLayer, template);
    scaleImageToOverlayArea(placeholder, mainImage);
    canvas.overlayImage = fabricLayer;
  
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
