/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FabricImage,
  type FabricObject,
  // Group,
  type ImageProps,
  Path,
  type StaticCanvas,
  util,
  Color,
  Rect,
  type TFiller,
  type Gradient,
  type TMat2D,
  iMatrix,
  FabricText,
  GraphemeBBox,
} from 'fabric';
import type { MediaDefinition, templateTypeV2 } from '../resourcesTypedef';
import { getFontKey, registerFont } from './pdfFontCache';

export const createDownloadStream = async (pdfDoc: any): Promise<Blob> => {
  // @ts-expect-error yeah no definitions
  const { default: BlobStream } = await import('blob-stream/blob-stream.js');
  const stream = pdfDoc.pipe(new BlobStream());
  return new Promise((resolve) => {
    stream.on('finish', () => {
      resolve(stream.toBlob('application/pdf'));
    });
  });
};

type box = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// const testGradient = (pdfDoc: any) => {
//   const grad = pdfDoc.linearGradient(0, 0, 100, 100);
//   grad.transform = [0.5, 0, 0, 0.5, 30, 10];
//   grad.stop(0, 'red');
//   grad.stop(1, 'green');
//   pdfDoc.rect(0, 0, 100, 100);
//   pdfDoc.fill(grad);
// }

const toPdfColor = (
  color: string | TFiller,
  pdfDoc: any,
  object: FabricObject,
): any => {
  if (!pdfDoc) {
    return;
  }
  if (
    (color as Gradient<'linear'>).colorStops &&
    (color as Gradient<'linear'>).type === 'linear'
  ) {
    const fabricGrad = color as Gradient<'linear'>;
    const { coords, gradientTransform, offsetX, offsetY, colorStops } =
      fabricGrad;
    const { x1, y1, x2, y2 } = coords;
    const sortedStops = [...colorStops].sort((a, b) => a.offset - b.offset);
    const grad = pdfDoc.linearGradient(x1, y1, x2, y2);
    const matOffset = [
      1,
      0,
      0,
      1,
      offsetX - object.width / 2,
      offsetY - object.height / 2,
    ] as TMat2D;
    grad.transform = util.multiplyTransformMatrixArray([
      matOffset,
      gradientTransform ?? iMatrix,
    ]);
    sortedStops.forEach(({ color, offset }) => {
      const col = new Color(color as unknown as string);
      grad.stop(offset, col.getSource().slice(0, 3));
    });
    return grad;
  } else {
    const fill = new Color(color as unknown as string);
    return fill.getSource().slice(0, 3);
  }
};

const addFabricTextToPdf = async (text: FabricText, pdfDoc: any) => {
  pdfDoc.save();

  transformPdf(text, pdfDoc);

  // Get font key and register font if needed
  const fontKey = getFontKey(text);
  const registeredFontKey = await registerFont(fontKey, pdfDoc);

  // Set font
  pdfDoc.font(registeredFontKey);

  // Set font size
  pdfDoc.fontSize(text.fontSize || 16);

  // Handle fill color
  if (text.fill && text.fill !== 'transparent') {
    const fillColor = toPdfColor(text.fill, pdfDoc, text);
    pdfDoc.fillColor(fillColor);
  }

  // Calculate text position
  // FabricJS text is centered by default at (0,0) after transform
  // We need to position from top-left of the text bounding box
  // const textWidth = text.width || 0;

  // Text rendering options for PDFKit
  // const textOptions: any = {
  //   width: textWidth,

  //   lineGap: text.lineHeight
  //     ? (text.lineHeight - 1) * (text.fontSize || 16)
  //     : 0,
  // };

  // Handle character spacing
  // if (text.charSpacing) {
  //   textOptions.characterSpacing =
  //     (text.charSpacing / 1000) * (text.fontSize || 16);
  // }

  // Set opacity if needed
  if (text.opacity !== undefined && text.opacity < 1) {
    pdfDoc.fillOpacity(text.opacity);
  }
  // Draw the text
  // Replicate fabricJS internal renderTextCommon loop
  // supports single color single style for now

  let lineHeights = 0;
  const left = text._getLeftOffset(),
    top = text._getTopOffset();
  for (let i = 0, len = text._textLines.length; i < len; i++) {
    renderTextLine({
      text,
      line: text._textLines[i],
      left: left + text._getLineLeftOffset(i),
      // @ts-expect-error ok is private, i need it
      top: top + lineHeights + text.getHeightOfLineImpl(i),
      lineIndex: i,
      pdfDoc,
      textOptions: {
        baseline: 'alphabetic',
      },
    });
    lineHeights += text.getHeightOfLine(i);
  }

  pdfDoc.restore();
};

const renderTextLine = ({
  text,
  line,
  left,
  top,
  lineIndex,
  pdfDoc,
  textOptions,
}: {
  text: FabricText;
  line: string[];
  left: number;
  top: number;
  lineIndex: number;
  pdfDoc: any;
  textOptions: any;
}) => {
  const isJustify = text.textAlign.includes('justify'),
    shortCut =
      !isJustify && text.charSpacing === 0 && text.isEmptyStyles(lineIndex),
    isLtr = text.direction === 'ltr',
    sign = isLtr ? 1 : -1;

  let charsToRender = '',
    charBox,
    boxWidth = 0,
    timeToRender,
    drawingLeft;
  // @ts-expect-error ok is private, i need it
  top -= text.getHeightOfLineImpl(lineIndex) * text._fontSizeFraction;
  if (shortCut) {
    // render all the line in one pass without checking
    // drawingLeft = isLtr ? left : left - this.getLineWidth(lineIndex);
    pdfDoc.text(line.join(''), left, top, textOptions);
    return;
  }
  for (let i = 0, len = line.length - 1; i <= len; i++) {
    timeToRender = i === len || text.charSpacing;
    charsToRender += line[i];
    charBox = text.__charBounds[lineIndex][i] as Required<GraphemeBBox>;
    if (boxWidth === 0) {
      left += sign * (charBox.kernedWidth - charBox.width);
      boxWidth += charBox.width;
    } else {
      boxWidth += charBox.kernedWidth;
    }
    if (isJustify && !timeToRender) {
      if (text._reSpaceAndTab.test(line[i])) {
        timeToRender = true;
      }
    }
    if (!timeToRender) {
      // if we have charSpacing, we render char by char
      // actualStyle =
      //   actualStyle || text.getCompleteStyleDeclaration(lineIndex, i);
      // nextStyle = text.getCompleteStyleDeclaration(lineIndex, i + 1);
      // timeToRender = hasStyleChanged(actualStyle, nextStyle, false);
    }
    if (timeToRender) {
      drawingLeft = left;
      pdfDoc.text(charsToRender, drawingLeft, top, textOptions);
    }
    charsToRender = '';
    // actualStyle = nextStyle;
    left += sign * boxWidth;
    boxWidth = 0;
  }
};

const addRectToPdf = (rect: Rect, pdfDoc: any) => {
  pdfDoc.save();

  transformPdf(rect, pdfDoc);
  const hasRounds = rect.rx || rect.ry;
  const paintStroke = () => {
    if (rect.stroke && rect.stroke !== 'transparent') {
      const stroke = toPdfColor(rect.stroke, pdfDoc, rect);
      pdfDoc.lineWidth(rect.strokeWidth);
      if (hasRounds) {
        pdfDoc.roundedRect(
          -rect.width / 2,
          -rect.height / 2,
          rect.width,
          rect.height,
          rect.rx,
        );
      } else {
        pdfDoc.rect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
      }
      // pdfDoc.strokeOpacity(this.opacity);
      if (
        rect.strokeDashArray &&
        rect.strokeDashArray[0] !== 0 &&
        rect.strokeDashArray[1] !== 0
      ) {
        pdfDoc.dash(rect.strokeDashArray[0] / rect.scaleX, {
          space: rect.strokeDashArray[1] * rect.strokeWidth,
        });
      }
      pdfDoc.stroke(stroke);
    }
  };

  const paintFill = () => {
    if (rect.fill && rect.fill !== 'transparent') {
      const fill = toPdfColor(rect.fill, pdfDoc, rect);
      // pdfDoc.fillOpacity(this.opacity);
      if (hasRounds) {
        pdfDoc.roundedRect(
          -rect.width / 2,
          -rect.height / 2,
          rect.width,
          rect.height,
          rect.rx,
        );
      } else {
        pdfDoc.rect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
      }
      pdfDoc.fill(fill);
    }
  };

  if (rect.paintFirst === 'stroke') {
    paintStroke();
    paintFill();
  } else {
    paintFill();
    paintStroke();
  }
  pdfDoc.restore();
};

const addPathToPdf = (path: Path, pdfDoc: any) => {
  pdfDoc.save();
  transformPdf(path, pdfDoc);

  const pathString = util
    .transformPath(path.path, iMatrix, path.pathOffset)
    .map((c) => c.join(' '))
    .join(' ');

  // const pathString = path.path.map((c) => c.join(' ')).join(' ');

  if (path.stroke && path.stroke !== 'transparent') {
    const stroke = new Color(path.stroke as string);
    pdfDoc.lineWidth(path.strokeWidth);
    pdfDoc.path(pathString);
    if (
      path.strokeDashArray &&
      path.strokeDashArray[0] !== 0 &&
      path.strokeDashArray[1] !== 0
    ) {
      pdfDoc.dash(path.strokeDashArray[0] * path.strokeWidth, {
        space: path.strokeDashArray[1] * path.strokeWidth,
      });
    }
    pdfDoc.stroke(stroke.getSource().slice(0, 3));
  }
  if (path.fill && path.fill !== 'transparent') {
    const pdfColor = toPdfColor(path.fill, pdfDoc, path);
    pdfDoc.path(pathString);
    pdfDoc.fill(pdfColor);
  }
  pdfDoc.restore();
};

const transformPdf = (fabricObject: FabricObject, pdfDoc: any) => {
  const matrix = fabricObject.calcOwnMatrix();
  pdfDoc.transform(...matrix);
};

const handleAbsoluteClipPath = (clipPath: FabricObject, pdfDoc: any) => {
  transformPdf(clipPath as FabricObject, pdfDoc);
  if (clipPath instanceof Rect) {
    pdfDoc
      .roundedRect(
        -clipPath.width / 2,
        -clipPath.height / 2,
        clipPath.width,
        clipPath.height,
        clipPath.rx,
      )
      .clip();
  }
  if (clipPath instanceof Path) {
    const pathString = util
      .transformPath(clipPath.path, iMatrix, clipPath.pathOffset)
      .map((c) => c.join(' '))
      .join(' ');
    pdfDoc.path(pathString).clip();
  }
  const matrix = clipPath.calcOwnMatrix();
  pdfDoc.transform(...util.invertTransform(matrix));
};

const addImageToPdf = async (
  fabricImage: FabricImage<ImageProps>,
  pdfDoc: any,
) => {
  pdfDoc.save();
  const clipPath = fabricImage.clipPath;
  if (clipPath && clipPath.absolutePositioned) {
    handleAbsoluteClipPath(clipPath as FabricObject, pdfDoc);
  }
  transformPdf(fabricImage, pdfDoc);
  if (clipPath && !clipPath.absolutePositioned) {
    console.warn('Missing code for standard clipPath');
  }
  const originalSize = fabricImage.getOriginalSize();
  // @ts-expect-error this isn't typed
  const originalFile = fabricImage.originalFile;
  if ((originalFile as File) instanceof File) {
    // @ts-expect-error this isn't typed
    const arrayBuffer = await (fabricImage.originalFile as File).arrayBuffer();
    pdfDoc.image(arrayBuffer, -fabricImage.width / 2, -fabricImage.height / 2, {
      width: originalSize.width,
      height: originalSize.height,
    });
  } else if (originalFile) {
    const imageFetch = await (await fetch(originalFile.src)).arrayBuffer();
    pdfDoc.image(imageFetch, -fabricImage.width / 2, -fabricImage.height / 2, {
      width: originalSize.width,
      height: originalSize.height,
    });
  } else {
    // todo fix
    // images part of the template will likely be duplicated.
    const imageFetch = await (await fetch(fabricImage.getSrc())).arrayBuffer();
    pdfDoc.image(imageFetch, -fabricImage.width / 2, -fabricImage.height / 2, {
      width: originalSize.width,
      height: originalSize.height,
    });
  }
  pdfDoc.restore();
};

const addObjectsToPdf = async (objs: FabricObject[], pdfDoc: any) => {
  for (const object of objs) {
    if (!object.visible || object['zaparoo-no-print']) {
      continue;
    }
    if (object instanceof Path) {
      addPathToPdf(object, pdfDoc);
    }
    if (object instanceof Rect) {
      addRectToPdf(object, pdfDoc);
    }
    if (object instanceof FabricText) {
      await addFabricTextToPdf(object, pdfDoc);
    }
    if (object instanceof FabricImage) {
      await addImageToPdf(object, pdfDoc);
    }
  }
};

// const addGroupToPdf = async (
//   group: Group,
//   pdfDoc: any,
// ) => {
//   pdfDoc.save();
//   transformPdf(group, pdfDoc);
//   const objs = group.getObjects();
//   await addObjectsToPdf(objs, pdfDoc);
//   pdfDoc.restore();
// };

const makeCardRegion = (
  box: box,
  templateMedia: MediaDefinition,
  pdfDoc: any,
): any =>
  pdfDoc.roundedRect(box.x, box.y, box.width, box.height, templateMedia.rx / 4);

export const addCanvasToPdfPage = async (
  canvas: StaticCanvas,
  pdfDoc: any,
  box: box,
  needsRotation: boolean,
  template: templateTypeV2,
  asRaster: boolean,
  printOutlines: boolean,
) => {
  // translate to position.
  // skip background color, but draw the clip region
  const { media: templateMedia } = template;
  if (!template.printableAreas && printOutlines) {
    // if there are no printable areas, draw the outline of the card
    makeCardRegion(box, templateMedia, pdfDoc);
    pdfDoc.lineWidth(templateMedia.strokeWidth / 10);
    pdfDoc.stroke(templateMedia.stroke);
  }

  pdfDoc.save();
  makeCardRegion(box, templateMedia, pdfDoc).clip();
  // 0.24 is a scale factor between px and points to keep the 300dpi
  pdfDoc.transform(0.24, 0, 0, 0.24, box.x, box.y);
  if (needsRotation) {
    pdfDoc.transform(1, 0, 0, 1, box.width / 2 / 0.24, box.height / 2 / 0.24);
    pdfDoc.rotate(90);
    pdfDoc.transform(1, 0, 0, 1, -box.height / 2 / 0.24, -box.width / 2 / 0.24);
  }

  if (asRaster) {
    const canvasClone = await canvas.clone([]);
    canvasClone.viewportTransform = canvas.viewportTransform.slice() as TMat2D;
    canvasClone.getObjects().forEach((object: FabricObject) => {
      if (object['zaparoo-no-print']) {
        object.visible = false;
      }
    });
    const imageFetch = await (
      await fetch(canvasClone.toDataURL())
    ).arrayBuffer();
    pdfDoc.image(imageFetch, 0, 0, {
      width: (needsRotation ? box.height : box.width) / 0.24,
      height: (needsRotation ? box.width : box.height) / 0.24,
    });
  } else {
    await addObjectsToPdf(canvas.getObjects(), pdfDoc);
  }

  pdfDoc.restore();
};
