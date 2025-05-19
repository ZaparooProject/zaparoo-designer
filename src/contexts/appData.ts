import { createContext, useContext } from 'react';
import {
  defaultTemplate,
  templates,
} from '../cardsTemplates';
import type { MediaDefinition, templateTypeV2 } from '../resourcesTypedef';
import {
  type PrintTemplate,
  defaultPrinterTemplate,
  defaultPrinterTemplateKey,
} from '../printTemplates';
import { noop } from '../utils/utils';

export type PrintOptions = {
  imageType: 'raster' | 'vector';
  printerTemplateKey: string;
  cutMarks: 'crop' | 'cut' | 'none',
  fileType: 'pdf' | 'zip';
};

export type contextType = {
  isIdle: boolean;
  originalColors: string[];
  customColors: string[];
  template: templateTypeV2;
  availableTemplates: (templateTypeV2)[];
  mediaType: MediaDefinition;
  printerTemplate: PrintTemplate;
  printerTemplateKey: string;
  printOptions: PrintOptions;
  setPrintOptions: (options: Partial<PrintOptions>) => void;
  setOriginalColors: (colors: string[]) => void;
  setCustomColors: (colors: string[]) => void;
  setTemplate: (template: templateTypeV2) => void;
  setPrinterTemplate: (template: PrintTemplate) => void;
  setPrinterTemplateKey: (templateKey: string) => void;
  setIsIdle: (value: boolean) => void;
  setMediaType: (value: MediaDefinition) => void;
};

export const defaultContextValue: contextType = {
  isIdle: false,
  setIsIdle: noop,
  originalColors: [],
  customColors: [],
  availableTemplates: Object.entries(templates).map(([key, value]) => ({ ...value, key, media : defaultTemplate.compatibleMedia[0] })).filter((t) => t.compatibleMedia.includes(defaultTemplate.compatibleMedia[0])),
  mediaType: defaultTemplate.compatibleMedia[0],
  template: defaultTemplate,
  printerTemplate: defaultPrinterTemplate,
  printerTemplateKey: defaultPrinterTemplateKey,
  printOptions: {
    imageType: 'raster',
    fileType: 'pdf',
    cutMarks: 'none',
    printerTemplateKey: defaultPrinterTemplateKey,
  },
  setPrintOptions: noop,
  setOriginalColors: noop,
  setCustomColors: noop,
  setTemplate: noop,
  setPrinterTemplate: noop,
  setPrinterTemplateKey: noop,
  setMediaType: noop,
};

export const AppDataContext = createContext<contextType>(defaultContextValue);

export const useAppDataContext = () => useContext(AppDataContext);
