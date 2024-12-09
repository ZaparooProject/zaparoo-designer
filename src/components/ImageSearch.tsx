import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import Checkbox from '@mui/material/Checkbox';

import {
  useState,
  type MouseEvent,
  useTransition,
  useEffect,
  useRef,
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
  const [isRomHacks /* , setIsRomHacks */] = useState<boolean>(true);
  const [searching, setSearching] = useState<boolean>(false);
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

  const addImage = async (e: MouseEvent<HTMLImageElement>, url: string) => {
    const target = e.target as HTMLImageElement;
    getImage(url, target.src).then((file) => {
      startTransition(() => {
        setTimeout(() => setOpen(false), 250);
        setFiles([...files, file]);
      });
    });
  };

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
    <div className="horizontalStack disclaimer">
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
      <div className="searchModal">
        <div className="verticalStack">
          <div className="horizontalStack searchHeader">
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
              onKeyDown={(e: any) =>
                e.key === 'Enter' && executeSearchWithReset(e)
              }
            />
            <PlatformDropdown setPlatform={setPlatform} platform={platform} />
            {/* <Typography display="flex" alignItems="center">
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
            </Typography> */}
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
          <div className="searchResultsContainer horizontalStack">
            {disclaimer}
            {gameEntries.map((gameEntry: SearchResult) => (
              <>
                {gameEntry.id !== openGameId && (
                  <div className="searchResult" key={gameEntry.id}>
                    <Button>
                      <img
                        src={gameEntry.cover.thumb}
                        onClick={(e) => addImage(e, gameEntry.cover.url)}
                        style={{ cursor: 'pointer' }}
                      />
                    </Button>
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
                  </div>
                )}
                {gameEntry.id === openGameId && (
                  <div
                    className="searchResultSub verticalStack"
                    id={`sub-${openGameId}`}
                    key={gameEntry.id}
                  >
                    <div className="title">
                      {gameEntry.name}{' '}
                      {gameEntry.platforms
                        ?.map((p) => p.abbreviation)
                        .join(' - ')}
                    </div>
                    <div className="horizontalStack searchResultsContainer">
                      <div className="searchResult">
                        <Button>
                          <img
                            src={gameEntry.cover.thumb}
                            onClick={(e) => addImage(e, gameEntry.cover.url)}
                            style={{ cursor: 'pointer' }}
                          />
                        </Button>
                      </div>
                      {gameEntry.artworks?.map((art) => (
                        <div className="searchResult" key={art.id}>
                          <Button>
                            <img
                              src={art.thumb}
                              onClick={(e) => addImage(e, art.url)}
                              style={{ cursor: 'pointer' }}
                            />
                          </Button>
                        </div>
                      ))}
                      {gameEntry.screenshots?.map((screenshot) => (
                        <div className="searchResult" key={screenshot.id}>
                          <Button>
                            <img
                              src={screenshot.thumb}
                              onClick={(e) => addImage(e, screenshot.url)}
                              style={{ cursor: 'pointer' }}
                            />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ))}
            {new Array(gameEntries.length % 4).fill(0).map(() => (
              <div className="searchResult" />
            ))}
            {hasMore && (
              <div className="loader" ref={ref}>
                <CircularProgress color="secondary" size={24} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
