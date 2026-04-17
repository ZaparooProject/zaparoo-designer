import { type FabricImage } from 'fabric';

const isPng = (buffer: Uint8Array): boolean => {
  if (!buffer || buffer.length < 8) {
    return false;
  }

  return (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  );
};

export default function isJpg(buffer: Uint8Array) {
  if (!buffer || buffer.length < 3) {
    return false;
  }

  return buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255;
}

/**
 * Detectes if the buffer is of type jpeg or png, if not, takes fabricImage._element and return
 * a converted version of it to png via canvas painting and export.
 * @param buffer
 * @param fabricImage
 */
export const checkTypeOrFallback = async (
  buffer: ArrayBuffer,
  fabricImage: FabricImage,
): Promise<ArrayBuffer> => {
  const headCopy = buffer.slice(0, 8);
  const view = new Uint8Array(headCopy);
  if (isPng(view) || isJpg(view)) {
    return buffer;
  }
  const clip = fabricImage.clipPath;
  fabricImage.clipPath = undefined;

  const buffPromise = (await fabricImage.toBlob({
    left: 0,
    top: 0,
    enableRetinaScaling: false,
    viewportTransform: false,
    withoutTransform: true,
    withoutShadow: true,
  }))!.arrayBuffer();

  fabricImage.clipPath = clip;
  return buffPromise;
};
