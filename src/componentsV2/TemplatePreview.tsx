import './labelEditor.css';
import './templatePreview.css';
import { useAppDataContext } from '../contexts/appData';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { useFileAdder } from '../hooks/useFileAdder';
import { useFileDropperContext } from '../contexts/fileDropper';
import { useCallback } from 'react';

export const TemplatePreview = ({
  hasCards,
  editingIsRequired,
}: {
  hasCards: boolean;
  editingIsRequired: boolean;
}) => {
  const { template } = useAppDataContext();
  const { addFiles } = useFileDropperContext();

  const addEmptyCard = useCallback(() => {
    addFiles([null], []);
  }, [addFiles]);

  const { inputElement, openInputFile } = useFileAdder();

  const className =
    template.layout === 'horizontal' ? 'horizontal' : 'vertical';
  const className2 = editingIsRequired && !hasCards ? 'flash-card' : '';
  return (
    <>
      <div className={`labelContainer ${className} ${className2}`}>
        <label className="canvasLabel" onClick={openInputFile}>
          <img src={template.preview} />
        </label>
        <div className="previewFooter">
          <Button
            aria-label="Add file"
            color="secondary"
            onClick={addEmptyCard}
            size="small"
          >
            <AddCircleOutlineIcon />
            Add empty card
          </Button>
          <Button
            aria-label="Add file"
            color="secondary"
            onClick={openInputFile}
            size="small"
          >
            <UploadFileIcon />
            Upload a file
          </Button>
        </div>
      </div>
      {inputElement}
    </>
  );
};
