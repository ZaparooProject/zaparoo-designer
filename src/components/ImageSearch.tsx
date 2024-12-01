import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import IconButton from '@mui/material/IconButton';
import { useInView } from 'react-intersection-observer';

import './imageSearch.css';
import { fetchGameImages, fetchGameList, getImage } from '../utils/search';
import { Platform } from '../../netlify/data/gamesDbPlatforms';
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
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [platform, setPlatform] = useState<Platform>({
    id: 0,
    name: 'all',
    alias: 'all',
    overview: '',
    icon: '',
    console: '',
  });
  const [, startTransition] = useTransition();
  const timerRef = useRef(0);
  const SEARCH_THROTTLING = 1000;

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.9,
  });

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
    setSearchResults([]);
    setPage(1);
    setSearching(true);
    executeSearch(searchQuery, page, platform, false);
  };

  const executeSearch = (
    searchQuery: string,
    page: number,
    platform: Platform,
    queueResults: boolean = true,
  ) => {
    const now = performance.now();
    if (timerRef.current > now - SEARCH_THROTTLING) {
      return;
    }
    timerRef.current = now;
    fetchGameList(searchQuery, platform, page.toString()).then(
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
      executeSearch(searchQuery, page, platform, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const switchToGameView = (gameId: string) => {
    fetchGameImages(gameId).then((data: any) => {
      setSearchResults(data.images);
    });
  };

  const disclaimer = (
    <div className="horizontalStack disclaimer">
      <Typography>
        Search results and images provided by{' '}
        <a href="https://thegamesdb.net/" target="_blank">
          TheGamesDB
        </a>
      </Typography>
    </div>
  );

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="searchModal">
        <div className="verticalStack">
          <div className="horizontalStack searchHeader">
            <Tooltip
              title={
                searchResults.length > 0
                  ? `Go back to results for ${searchQuery}`
                  : `Close`
              }
            >
              <IconButton
                onClick={() =>
                  searchResults.length ? setSearchResults([]) : setOpen(false)
                }
              >
                {searchResults.length ? <ArrowBackIcon /> : <CloseIcon />}
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
          {searchResults.length === 0 && (
            <div className="searchResultsContainer horizontalStack">
              {disclaimer}
              {gameEntries.map((gameEntry: SearchResult) => (
                <div className="searchResult" key={gameEntry.id}>
                  <Button>
                    <img
                      src={gameEntry.cover?.url}
                      onClick={(e) => addImage(e, gameEntry.cover.url)}
                      style={{ cursor: 'pointer' }}
                    />
                  </Button>
                  <Button
                    className="verticalStack"
                    onClick={() => switchToGameView(gameEntry.id)}
                  >
                    <Typography variant="h6">See more images for</Typography>
                    <Typography variant="h6">
                      {gameEntry.name} -{' '}
                      {gameEntry.platforms
                        ?.map((p) => p.abbreviation)
                        .join(' - ')}
                    </Typography>
                  </Button>
                </div>
              ))}
              {new Array(gameEntries.length % 4).fill(0).map(() => (
                <div className="searchResult" />
              ))}
              {hasMore && searchResults.length === 0 && (
                <div className="loader" ref={ref}>
                  <CircularProgress color="secondary" size={24} />
                </div>
              )}
            </div>
          )}
          {/* {searchResults.length > 0 && (
            <div className="searchResultsContainer horizontalStack">
              {disclaimer}
              {searchResults.map((result) => (
                <Button className="searchResult" key={result.imageUrl}>
                  <img
                    src={result.thumbnailUrl}
                    onClick={(e) => addImage(e, result.imageUrl)}
                    style={{ cursor: 'pointer' }}
                  />
                </Button>
              ))}
              {new Array(searchResults.length % 4).fill(0).map((_, index) => (
                <div className="searchResult" key={index} />
              ))}
            </div>
          )} */}
        </div>
      </div>
    </Modal>
  );
}
