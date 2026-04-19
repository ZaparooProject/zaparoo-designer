import { FabricImage, type FabricObject, type StaticCanvas } from 'fabric';
import type { CardData } from '../contexts/fileDropper';
import type { SearchResult } from '../../netlify/apiProviders/types.mts';
import { templates } from '../cardsTemplates';

const findTemplateByKey = (key: string) =>
  Object.values(templates).find((t) => t.key === key);

export const FABRIC_CUSTOM_PROPS = [
  'selectable',
  'evented',
  'resourceFor',
  'id',
  'original_fill',
  'original_stroke',
  'resourceType',
  'zaparoo-user-layer',
  'zaparoo-placeholder',
  'zaparoo-fill-strategy',
];

const SESSION_VERSION = 1;

const imageElementToDataURL = (
  img: HTMLImageElement | HTMLCanvasElement | null | undefined,
): string | null => {
  if (!img) return null;
  try {
    const width =
      img instanceof HTMLImageElement ? img.naturalWidth : img.width;
    const height =
      img instanceof HTMLImageElement ? img.naturalHeight : img.height;
    if (!width || !height) return null;
    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0);
    return offscreen.toDataURL('image/png');
  } catch {
    return null;
  }
};

const shouldInlineSrc = (src: string): boolean =>
  !src.startsWith('data:');

const collectInlineableImagesOnCanvas = (
  canvas: StaticCanvas,
): Map<string, string> => {
  const srcMap = new Map<string, string>();
  const visit = (obj: FabricObject): void => {
    if (obj instanceof FabricImage) {
      const src = obj.getSrc?.();
      if (typeof src === 'string' && shouldInlineSrc(src) && !srcMap.has(src)) {
        const dataUrl = imageElementToDataURL(obj.getElement() as HTMLImageElement);
        if (dataUrl) srcMap.set(src, dataUrl);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nested = (obj as any)._objects as FabricObject[] | undefined;
    if (Array.isArray(nested)) nested.forEach(visit);
  };
  canvas.getObjects().forEach(visit);
  return srcMap;
};

const replaceImageSrcInJSON = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any,
  srcMap: Map<string, string>,
): void => {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    node.forEach((n) => replaceImageSrcInJSON(n, srcMap));
    return;
  }
  if (typeof node.src === 'string' && shouldInlineSrc(node.src)) {
    const replacement = srcMap.get(node.src);
    if (replacement) node.src = replacement;
  }
  for (const key of Object.keys(node)) {
    const value = node[key];
    if (value && typeof value === 'object') replaceImageSrcInJSON(value, srcMap);
  }
};

type SerializedCard = {
  key: string;
  colors: string[];
  originalColors: string[];
  templateKey: string | undefined;
  game: Partial<SearchResult>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  canvasJSON: Record<string, any> | null;
  canvasWidth: number | null;
  canvasHeight: number | null;
  canvasViewportTransform: number[] | null;
};

type SessionFile = {
  version: number;
  savedAt: string;
  cards: SerializedCard[];
};

export const serializeSession = (cards: CardData[]): string => {
  const serialized: SessionFile = {
    version: SESSION_VERSION,
    savedAt: new Date().toISOString(),
    cards: cards.map((card) => {
      const canvasJSON = card.canvas
        ? card.canvas.toObject(FABRIC_CUSTOM_PROPS)
        : null;
      if (canvasJSON && card.canvas) {
        const srcMap = collectInlineableImagesOnCanvas(card.canvas);
        if (srcMap.size > 0) {
          replaceImageSrcInJSON(canvasJSON, srcMap);
        }
      }
      return {
        key: card.key,
        colors: [...card.colors],
        originalColors: [...card.originalColors],
        templateKey: card.template?.key,
        game: card.game,
        canvasJSON,
        canvasWidth: card.canvas?.getWidth() ?? null,
        canvasHeight: card.canvas?.getHeight() ?? null,
        canvasViewportTransform: card.canvas
          ? [...card.canvas.viewportTransform]
          : null,
      };
    }),
  };
  return JSON.stringify(serialized);
};

export const deserializeSession = (json: string): CardData[] => {
  const session: SessionFile = JSON.parse(json);
  if (!session.version || !session.cards) {
    throw new Error('Invalid session file');
  }

  return session.cards.map((saved) => {
    const template = saved.templateKey
      ? findTemplateByKey(saved.templateKey)
      : undefined;

    return {
      file: null,
      game: saved.game,
      canvas: undefined,
      canvasJSON: saved.canvasJSON ?? undefined,
      canvasWidth: saved.canvasWidth ?? undefined,
      canvasHeight: saved.canvasHeight ?? undefined,
      canvasViewportTransform: saved.canvasViewportTransform ?? undefined,
      template,
      isSelected: false,
      colors: saved.colors,
      originalColors: saved.originalColors,
      key: saved.key,
    };
  });
};

export const downloadSession = (cards: CardData[]) => {
  const json = serializeSession(cards);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `zaparoo-session-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const loadSessionFromFile = (): Promise<CardData[]> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }
      file
        .text()
        .then((text) => resolve(deserializeSession(text)))
        .catch(reject);
    };
    input.click();
  });
};
