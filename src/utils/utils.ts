import { templateType, templateTypeV2 } from "../resourcesTypedef";

export const colorsDiffer = (colorsA: string[], colorsB: string[]): boolean =>
  colorsA.some((color, index) => colorsB[index] !== color);

export const noop = () => {};

export const downloadBlob = (blob: Blob, name: string): void => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
  link.remove();
  setTimeout(() => {
    URL.revokeObjectURL(link.href)
  }, 500);
}

export const fromMMtoPxAt72DPI = (mm: number): number => mm / 25.4 * 72;

export const isTemplateV2 = (t: templateType | templateTypeV2): t is templateTypeV2 => (t as templateTypeV2).version === 2;