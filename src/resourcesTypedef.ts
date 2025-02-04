import { type Group, type SerializedGroupProps } from 'fabric';
import type { Authors } from './templateAuthors';

export type templateLayer = {
  url: string;
  /* how large the overlay is */
  layerWidth: number;
  layerHeight: number;
  /* parse the layer as a group rather than raster */
  isSvg: boolean;
  parsed?: Promise<SerializedGroupProps | HTMLImageElement>;
  hidePrint?: boolean;
};

export type templateOverlay = templateLayer & {
  /* percentage width where the overlaye transparent area begins */
  x: number;
  /* percentage height where the overlaye transparent area begins */
  y: number;
  /* percentage width that is transparent */
  width: number;
  /* percentage height that is transparent */
  height: number;
  strategy?: 'fit' | 'cover'
};

export enum EditType {
  image = 'image',
  color = 'color',
}

export type ResourceArray = {
  label: string;
  value: string;
}

export type EditResource = {
  type: EditType;
  data: ResourceArray[];
}

export type layoutOrientation = 'horizontal' | 'vertical';

export type TemplateEdit = {
  /* id of the svg Rect placeholder that represent the area of the edit */
  id: string;
  /* one of the valid edit types */
  resource: EditResource;
}

export type MediaDefinition = {
  width: number;
  height: number;
  rx: number;
  ry: number;
  strokeWidth: number;
  stroke: string;
  fill: string;
  label: string;
}

export type PrintableArea = {
  width: number;
  height: number;
  x: number;
  y: number;
}

export type templateTypeV2 = {
  canEdit?: boolean;
  parsed?: Promise<Group>;
  version: number;
  layout: layoutOrientation;
  url: string;
  label: string;
  /* a reference to the author data */
  author: Authors;
  media: MediaDefinition;
  printableAreas?: PrintableArea[],
  key: string;
};