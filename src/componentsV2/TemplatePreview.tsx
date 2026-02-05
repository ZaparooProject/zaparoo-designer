import './labelEditor.css';
import './templatePreview.css';
import { useAppDataContext } from '../contexts/appData';
import { IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
          <IconButton
            aria-label="Add file"
            color="secondary"
            onClick={addEmptyCard}
            size="small"
          >
            <AddCircleOutlineIcon />
          </IconButton>
          <Typography color="secondary">
            Click here to add a new file
          </Typography>
        </div>
      </div>
      {inputElement}
    </>
  );
};
