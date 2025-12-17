import {
  Group,
  Color,
  Gradient,
  type Canvas,
  type StaticCanvas,
  FabricImage,
} from 'fabric';

/**
 * Search in the canvas objects particular ones marked as placeholders
 * @param canvas
 * @param name
 * @returns
 */
const getNamedPlaceholder = (
  canvas: Canvas | Group | StaticCanvas,
  name: string,
) => canvas.getObjects().find((obj) => obj['zaparoo-placeholder'] === name);
export const getPlaceholderMain = (canvas: Canvas | Group | StaticCanvas) =>
  getNamedPlaceholder(canvas, 'main');
export const getPlaceholderPlatformLogo = (
  canvas: Canvas | Group | StaticCanvas,
) => getNamedPlaceholder(canvas, 'platform_logo');
export const getPlaceholderScreenshot = (
  canvas: Canvas | Group | StaticCanvas,
) => getNamedPlaceholder(canvas, 'screenshot');

export const getMainImage = (canvas: Canvas | Group | StaticCanvas) =>
  canvas
    .getObjects('image')
    .find(
      (fabricImage) => (fabricImage as FabricImage).resourceType === 'main',
    ) as FabricImage;

/**
 * extract and normalizes to hex format colors in the objects
 * remove opacity from colors and sets it on the objects
 * @param group
 */
// TODO: supports gradients and objects with different opacity
export const extractUniqueColorsFromGroup = (group: Group): string[] => {
  const colors: string[] = [];
  group.forEachObject((object) => {
    if (!object.visible) {
      return;
    }
    (['stroke', 'fill'] as const).forEach((property) => {
      if (
        object[property] &&
        object[property] !== 'transparent' &&
        !(object[property] as Gradient<'linear'>).colorStops
      ) {
        const colorInstance = new Color(object[property] as string);
        const hexValue = `#${colorInstance.toHex()}`;
        const opacity = colorInstance.getAlpha();
        object[property] = hexValue;
        object.set({
          [property]: hexValue,
          [`original_${property}`]: hexValue,
        });
        object.opacity = opacity;
        if (!colors.includes(hexValue)) {
          colors.push(hexValue);
        }
      }
    });
  });
  return colors;
};
