import {
  loadSVGFromURL,
  Group,
  FabricObject,
  Color,
  Gradient,
  type SerializedGroupProps,
} from 'fabric';

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

export const parseSvg = (url: string): Promise<SerializedGroupProps> =>
  loadSVGFromURL(url).then(({ objects }) => {
    const nonNullObjects = objects.filter(
      (objects) => !!objects,
    ) as FabricObject[];
    const group = new Group(nonNullObjects);
    extractUniqueColorsFromGroup(group);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return group.toObject(['original_stroke', 'original_fill', 'id']);
  });