import {
  Button,
  TextField,
  Typography,
  Checkbox,
  CircularProgress,
  Tooltip,
} from '@mui/material';

import {
  useState,
  type MouseEvent,
  useTransition,
  useEffect,
  useRef,
  Fragment,
  useCallback,
  DragEventHandler,
} from 'react';
import { useFileDropperContext } from '../../contexts/fileDropper';

import { boxShadow } from '../../constants';
import { DRAG_MIME_GAME_OBJECT } from '../../constants/dragDrop';
import { useInView } from 'react-intersection-observer';

import './SearchPanel.css';
import { fetchGameList, getImage } from '../../utils/search';
import { PlatformResult } from '../../../netlify/apiProviders/types.mts';
// import { PlatformDropdown } from './PlatformDropdown';
import type { SearchResult } from '../../../netlify/apiProviders/types.mts';
import { PanelSection } from './PanelSection';
import SearchIcon from '@mui/icons-material/Search';
import { BehindEditor } from './RequireEditing';

const SearchResultView = ({
  gameEntry,
  imgSource,
  children,
  addImage,
  description,
  useFull = false,
}: {
  useFull?: boolean;
  gameEntry: SearchResult;
  imgSource: {
    thumb: string;
    url: string;
  };
  description?: string;
  children?: JSX.Element;
  addImage: (
    e: MouseEvent<HTMLImageElement>,
    url: string,
    game: SearchResult,
  ) => void;
}) => {
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

  // console.log(gameEntry);
  return (
    <div className="searchResult" draggable onDragStart={handleDragStart}>
      <Tooltip title={description} placement="top">
        <Button sx={{ backgroundColor: 'transparent', padding: 0 }}>
          <img
            ref={imgRef}
            src={useFull ? imgSource.url : imgSource.thumb}
            onClick={(e) => addImage(e, imgSource.url, gameEntry)}
            style={{ cursor: 'pointer' }}
          />
        </Button>
      </Tooltip>
      {children}
    </div>
  );
};

export default function ImageSearchPanel({
  isEditing = false,
}: {
  isEditing: boolean;
}) {
  const { addFiles } = useFileDropperContext();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [gameEntries, setGameEntries] = useState<SearchResult[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isRomHacks, setIsRomHacks] = useState<boolean>(true);
  const [searching, setSearching] = useState<boolean>(false);
  const [platform] = useState<PlatformResult>({
    id: 0,
    name: 'All',
    abbreviation: 'All',
  });
  const [openGameId] = useState<SearchResult['id']>('0');
  const [, startTransition] = useTransition();
  const timerRef = useRef(0);
  const SEARCH_THROTTLING = 1000;

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.9,
  });

  useEffect(() => {
    document.getElementById(`sub-${openGameId}`)?.scrollIntoView(true);
  }, [openGameId]);

  useEffect(() => {
    setPage(1);
    setHasMore(false);
  }, [platform, isRomHacks]);

  const addImage = useCallback(
    (e: MouseEvent<HTMLImageElement>, url: string, game: SearchResult) => {
      const target = e.target as HTMLImageElement;
      getImage(url, target.src).then((file) => {
        startTransition(() => {
          addFiles([file], [game]);
        });
      });
    },
    [addFiles],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const executeSearchWithReset = (e: any) => {
    e.preventDefault();
    setPage(1);
    setSearching(true);
    executeSearch(searchQuery, 1, platform, isRomHacks, false);
  };

  const executeSearch = (
    searchQuery: string,
    page: number,
    platform: PlatformResult,
    isRomHacks: boolean,
    queueResults: boolean = true,
  ) => {
    const now = performance.now();
    if (timerRef.current > now - SEARCH_THROTTLING) {
      return;
    }
    timerRef.current = now;
    fetchGameList(searchQuery, platform, page.toString(), isRomHacks).then(
      ({ games, hasMore }) => {
        if (queueResults) {
          setGameEntries([...gameEntries, ...games]);
        } else {
          setGameEntries(games);
        }
        if (hasMore) {
          setPage(page + 1);
        }
        setHasMore(hasMore);
        setSearching(false);
      },
    );
  };

  useEffect(() => {
    if (inView) {
      executeSearch(searchQuery, page, platform, isRomHacks, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  // const disclaimer = (
  //   <div className="horizontalStack disclaimer" key="disclaimer">
  //     <Typography color="secondary">
  //       Search results and images provided by{' '}
  //       <a href="https://www.igdb.com/" target="_blank">
  //         IGDB
  //       </a>
  //     </Typography>
  //   </div>
  // );

  return (
    <PanelSection title="Search" className="searchPanel">
      {isEditing && <BehindEditor />}
      <div className="horizontalStack searchHeader" key="search-header">
        <TextField
          color="primary"
          className="textField"
          size="small"
          autoComplete="off"
          label="Game name"
          value={searchQuery}
          onChange={(evt) => setSearchQuery(evt.target.value)}
          style={{ fontWeight: 400, fontSize: 14 }}
          onKeyDown={(e: any) => {
            e.key === 'Enter' && executeSearchWithReset(e);
          }}
        />
        <Button
          variant="contained"
          size="small"
          sx={{
            boxShadow,
            fontSize: '0.9375rem',
            height: '44px',
            minWidth: '44px',
          }}
          onClick={executeSearchWithReset}
        >
          {searching ? (
            <CircularProgress color="secondary" size={24} />
          ) : (
            <SearchIcon width="24" height="24" />
          )}
        </Button>
      </div>
      <div className="horizontalStack">
        {/* <PlatformDropdown setPlatform={setPlatform} platform={platform} /> */}
        <Typography display="flex" alignItems="center" color="secondary">
          <Checkbox
            color="secondary"
            checked={isRomHacks}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              const isSelectedCheckbox = (e.target as HTMLInputElement).checked;
              setIsRomHacks(isSelectedCheckbox);
            }}
          />
          Fanmade
        </Typography>
      </div>
      <div className="searchResultsContainer horizontalStack" key="container">
        {/* {disclaimer} */}
        {gameEntries.map((gameEntry: SearchResult) => (
          <Fragment key={`game-${gameEntry.id}`}>
            {gameEntry.id !== openGameId && (
              <SearchResultView
                description={`${gameEntry.name} - ${gameEntry.platforms
                  ?.map((p) => p.abbreviation)
                  .join(', ')}`}
                gameEntry={gameEntry}
                imgSource={gameEntry.cover}
                addImage={addImage}
              >
                <Typography variant="h6" color="secondary">
                  + {gameEntry.extra_images} images
                </Typography>
              </SearchResultView>
            )}
          </Fragment>
        ))}
        {hasMore && (
          <div className="loader" ref={ref}>
            <CircularProgress color="secondary" size={24} />
          </div>
        )}
      </div>
    </PanelSection>
  );
}
