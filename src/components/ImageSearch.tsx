import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

import {
  useState,
  type MouseEvent,
  useTransition,
  useEffect,
  useRef,
  Fragment,
  useCallback,
} from 'react';
import { useFileDropperContext } from '../contexts/fileDropper';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import { boxShadow } from '../constants';
import CloseIcon from '@mui/icons-material/Close';

import IconButton from '@mui/material/IconButton';
import { useInView } from 'react-intersection-observer';

import './imageSearch.css';
import { fetchGameList, getImage } from '../utils/search';
import { PlatformResult } from '../../netlify/apiProviders/types.mts';
import { PlatformDropdown } from './PlatformDropdown';
import { SearchResult } from '../../netlify/apiProviders/types.mts';
import { Snackbar } from '@mui/material';

const SearchResultView = ({
  thumb,
  url,
  name,
  children,
  addImage,
}: {
  thumb: string;
  url: string;
  name: string;
  children?: JSX.Element;
  addImage: (
    e: MouseEvent<HTMLImageElement>,
    url: string,
    name: string,
  ) => void;
}) => (
  <div className="searchResult">
    <Button style={{ backgroundColor: 'transparent' }}>
      <img
        src={thumb}
        onClick={(e) => addImage(e, url, name)}
        style={{ cursor: 'pointer' }}
      />
    </Button>
    {children}
  </div>
);

export default function ImageSearch({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { files, setFiles } = useFileDropperContext();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [gameEntries, setGameEntries] = useState<SearchResult[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isRomHacks, setIsRomHacks] = useState<boolean>(true);
  const [searching, setSearching] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<string>('');
  const [platform, setPlatform] = useState<PlatformResult>({
    id: 0,
    name: 'All',
    abbreviation: 'All',
  });
  const [openGameId, setOpenGameId] = useState<SearchResult['id']>('0');
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
    (e: MouseEvent<HTMLImageElement>, url: string, name: string) => {
      const target = e.target as HTMLImageElement;
      setOpenSnackbar(`Adding ${name}`);
      getImage(url, target.src).then((file) => {
        startTransition(() => {
          setFiles([...files, file]);
          setTimeout(() => setOpenSnackbar(''), 1000);
        });
      });
    },
    [files, setFiles],
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

  const disclaimer = (
    <div className="horizontalStack disclaimer" key="disclaimer">
      <Typography>
        Search results and images provided by{' '}
        <a href="https://www.igdb.com/" target="_blank">
          IGDB
        </a>
      </Typography>
    </div>
  );

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <>
        <div className="searchModal">
          <div className="verticalStack">
            <div className="horizontalStack searchHeader" key="search-header">
              <Tooltip title="Close">
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
              <TextField
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
              <PlatformDropdown setPlatform={setPlatform} platform={platform} />
              <Typography display="flex" alignItems="center">
                <Checkbox
                  color="secondary"
                  checked={isRomHacks}
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    const isSelectedCheckbox = (e.target as HTMLInputElement)
                      .checked;
                    setIsRomHacks(isSelectedCheckbox);
                  }}
                />
                Fanmade
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{
                  boxShadow,
                  fontSize: '0.9375rem',
                  textTransform: 'none',
                  height: '44px',
                }}
                onClick={executeSearchWithReset}
              >
                {searching ? (
                  <CircularProgress color="secondary" size={24} />
                ) : (
                  <p>Search</p>
                )}
              </Button>
            </div>
            <div
              className="searchResultsContainer horizontalStack"
              key="container"
            >
              {disclaimer}
              {gameEntries.map((gameEntry: SearchResult) => (
                <Fragment key={`game-${gameEntry.id}`}>
                  {gameEntry.id !== openGameId && (
                    <SearchResultView
                      name={gameEntry.name}
                      thumb={gameEntry.cover.thumb}
                      url={gameEntry.cover.url}
                      addImage={addImage}
                    >
                      <Button
                        className="verticalStack"
                        onClick={() =>
                          gameEntry.extra_images > 0 &&
                          setOpenGameId(gameEntry.id)
                        }
                      >
                        {gameEntry.extra_images > 0 && (
                          <Typography variant="h6">
                            See {gameEntry.extra_images} more images for
                          </Typography>
                        )}
                        <Typography variant="h6">
                          {gameEntry.name} -{' '}
                          {gameEntry.platforms
                            ?.map((p) => p.abbreviation)
                            .join(' - ')}
                        </Typography>
                      </Button>
                    </SearchResultView>
                  )}
                  {gameEntry.id === openGameId && (
                    <div
                      className="searchResultSub verticalStack"
                      id={`sub-${openGameId}`}
                    >
                      <div className="title">
                        {gameEntry.name}{' '}
                        {gameEntry.platforms
                          ?.map((p) => p.abbreviation)
                          .join(' - ')}
                      </div>
                      <div className="horizontalStack searchResultsContainer">
                        <SearchResultView
                          name={gameEntry.name}
                          thumb={gameEntry.cover.thumb}
                          url={gameEntry.cover.url}
                          addImage={addImage}
                        />
                        {gameEntry.artworks?.map((art) => (
                          <SearchResultView
                            key={`art-${art.id}`}
                            name={gameEntry.name}
                            thumb={art.thumb}
                            url={art.url}
                            addImage={addImage}
                          />
                        ))}
                        {gameEntry.screenshots?.map((screenshot) => (
                          <SearchResultView
                            key={`screen-${screenshot.id}`}
                            name={gameEntry.name}
                            thumb={screenshot.thumb}
                            url={screenshot.url}
                            addImage={addImage}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </Fragment>
              ))}
              {new Array(gameEntries.length % 4).fill(0).map((_, index) => (
                <div className="searchResult" key={`filler-${index}`} />
              ))}
              {hasMore && (
                <div className="loader" ref={ref}>
                  <CircularProgress color="secondary" size={24} />
                </div>
              )}
            </div>
          </div>
        </div>
        <Snackbar
          color="primary"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openSnackbar !== ''}
          message={openSnackbar}
          key="top-center"
        />
      </>
    </Modal>
  );
}
