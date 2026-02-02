import './labelEditor.css';
import './templatePreview.css';
import { useAppDataContext } from '../contexts/appData';
import { Typography } from '@mui/material';
import { useFileAdder } from '../hooks/useFileAdder';

export const TemplatePreview = () => {
  const { template } = useAppDataContext();
  const { inputElement, openInputFile } = useFileAdder();

  const className =
    template.layout === 'horizontal' ? 'horizontal' : 'vertical';
  return (
    <>
      <div className={`labelContainer ${className}`}>
        <label className="canvasLabel" onClick={openInputFile}>
          <img src={template.preview} />
        </label>
        <div className="previewFooter">
          <Typography color="secondary">
            Click here to add a new file
          </Typography>
        </div>
      </div>
      {inputElement}
    </>
  );
};
