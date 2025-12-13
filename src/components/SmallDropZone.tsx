import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Typography } from '@mui/material';
import { useFileDropper } from '../hooks/useFileDropper';
import { useFileAdder } from '../hooks/useFileAdder';

import './SmallDropZone.css';
import { useRef } from 'react';

type SmallDropZoneProps = {
  className?: string;
};

export const SmallDropZone = ({ className }: SmallDropZoneProps) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const { onDragOver } = useFileDropper({ elementRef: dropRef });
  const { inputElement, openInputFile } = useFileAdder();
  return (
    <div
      className={`dropzone ${className}`}
      ref={dropRef}
      onDragOver={onDragOver}
    >
      {inputElement}
      <svg width="100%" height="100%" viewBox="0 0 320 320">
        <rect
          rx="40"
          ry="40"
          width="314"
          height="314"
          x="3"
          y="3"
          strokeWidth="6"
          strokeLinecap="round"
          stroke="rgba(255, 255, 254, 0.75)"
          strokeDasharray="40"
          fill="rgba(255, 255, 254, 0.15)"
        />
      </svg>
      <div className="theIcon">
        <AddCircleOutlineIcon
          sx={{ width: '48px', height: '48px', marginBottom: '12px' }}
        />
        <Typography>
          Drag images here
          <br /> or{' '}
          <a onClick={openInputFile} href="#">
            browse
          </a>{' '}
          <br />
          or use copy paste
        </Typography>
      </div>
    </div>
  );
};
