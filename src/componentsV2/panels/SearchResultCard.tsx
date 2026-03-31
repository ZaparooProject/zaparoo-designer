import { Button, CircularProgress, Tooltip } from '@mui/material';
import { useRef, type DragEventHandler, type MouseEvent } from 'react';
import type { SearchResult } from '../../../netlify/apiProviders/types.mts';
import { DRAG_MIME_GAME_OBJECT } from '../../constants/dragDrop';
import './SearchPanel.css';

type SearchResultCardProps = {
  gameEntry: SearchResult;
  imgSource: {
    thumb: string;
    url: string;
  };
  description?: string;
  children?: JSX.Element;
  useFull?: boolean;
  loading?: boolean;
  tooltipOpen: boolean;
  onTooltipOpen: () => void;
  onTooltipClose: () => void;
  addImage: (
    e: MouseEvent<HTMLImageElement>,
    url: string,
    game: SearchResult,
  ) => void;
};

export const SearchResultCard = ({
  gameEntry,
  imgSource,
  children,
  addImage,
  description,
  useFull = false,
  loading = false,
  tooltipOpen,
  onTooltipOpen,
  onTooltipClose,
}: SearchResultCardProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const handleDragStart: DragEventHandler<HTMLDivElement> = (event) => {
    const dataObject = JSON.stringify(gameEntry);
    event.dataTransfer.setData(DRAG_MIME_GAME_OBJECT, dataObject);
    event.dataTransfer.setData('text/uri-list', dataObject);
    event.dataTransfer.setData('text/plain', dataObject);
    event.dataTransfer.effectAllowed = 'copy';
    if (imgRef.current) {
      const offsetX = Math.max(0, imgRef.current.width / 2);
      const offsetY = Math.max(0, imgRef.current.height / 2);
      event.dataTransfer.setDragImage(imgRef.current, offsetX, offsetY);
    }
  };

  return (
    <div className="searchResult" draggable onDragStart={handleDragStart}>
      <Tooltip
        title={description}
        placement="top"
        open={tooltipOpen}
        onOpen={onTooltipOpen}
        onClose={onTooltipClose}
      >
        <Button sx={{ backgroundColor: 'transparent', padding: 0 }}>
          <div className="searchResultImageWrapper">
            <img
              ref={imgRef}
              src={useFull ? imgSource.url : imgSource.thumb}
              onClick={(e) => addImage(e, imgSource.url, gameEntry)}
              style={{ cursor: 'pointer' }}
            />
            {loading && (
              <div className="searchResultLoadingOverlay">
                <CircularProgress color="secondary" size={32} />
              </div>
            )}
          </div>
        </Button>
      </Tooltip>
      {children}
    </div>
  );
};
