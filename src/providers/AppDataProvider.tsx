import { useState, useMemo, useCallback, useEffect } from 'react';
import type { FC, JSX, ReactNode } from 'react';
import {
  type contextType,
  defaultContextValue,
  AppDataContext,
} from '../contexts/appData.ts';
import { templates } from '../cardsTemplates.ts';

type AppDataContextProps = {
  children: JSX.Element | JSX.Element[] | ReactNode;
};

export const AppDataContextProvider: FC<AppDataContextProps> = ({
  children,
}) => {
  const [isIdle, setIsIdle] = useState<contextType['isIdle']>(
    defaultContextValue.isIdle,
  );
  const [template, setTemplate] = useState<contextType['template']>(
    defaultContextValue.template,
  );
  const [printerTemplate, setPrinterTemplate] = useState<
    contextType['printerTemplate']
  >(defaultContextValue.printerTemplate);
  const [printerTemplateKey, setPrinterTemplateKey] = useState<
    contextType['printerTemplateKey']
  >(defaultContextValue.printerTemplateKey);
  const [printOptions, setPrintOptions] = useState<contextType['printOptions']>(
    defaultContextValue.printOptions,
  );
  const [mediaType, _setMediaType] = useState<contextType['mediaType']>(
    defaultContextValue.mediaType,
  );
  const [availableTemplates, setAvailableTemplates] = useState<
    contextType['availableTemplates']
  >(defaultContextValue.availableTemplates);

  useEffect(() => {
    const serializedOptions = localStorage.getItem('printOptions');
    if (serializedOptions) {
      setPrintOptions(JSON.parse(serializedOptions));
    }
  }, []);

  const mergePrintOptions = useCallback(
    (partialOptions: Partial<contextType['printOptions']>) => {
      const newOptions = { ...printOptions, ...partialOptions };
      localStorage.setItem('printOptions', JSON.stringify(newOptions));
      setPrintOptions(newOptions);
    },
    [printOptions, setPrintOptions],
  );

  const setMediaType = useCallback((mediaType: contextType['mediaType']) => {
    _setMediaType(mediaType);
    setAvailableTemplates(
      Object.entries(templates)
        .map(([key, value]) => ({ ...value, key, media : mediaType }))
        .filter((t) => t.compatibleMedia.includes(mediaType)),
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      template,
      printerTemplate,
      printerTemplateKey,
      printOptions,
      isIdle,
      mediaType,
      availableTemplates,
      setTemplate,
      setPrinterTemplate,
      setPrinterTemplateKey,
      setPrintOptions: mergePrintOptions,
      setIsIdle,
      setMediaType,
    }),
    [
      template,
      printerTemplate,
      printerTemplateKey,
      printOptions,
      isIdle,
      mediaType,
      availableTemplates,
      mergePrintOptions,
      setMediaType,
    ],
  );

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
};
