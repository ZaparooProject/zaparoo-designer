import {
  Autocomplete,
  CircularProgress,
  Tab,
  TextField,
  Tabs,
  Typography,
} from '@mui/material';
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type MutableRefObject,
  type SyntheticEvent,
} from 'react';
import { type Canvas } from 'fabric';
import { useInView } from 'react-intersection-observer';
import type { SearchResult } from '../../../netlify/apiProviders/types.mts';
import { useFileDropperContext } from '../../contexts/fileDropper';
import { PanelSection } from './PanelSection';
import {
  fetchSteamAutocomplete,
  fetchSteamGridsByGameId,
  fetchSteamLogosByGameId,
  type SteamAutocompleteGame,
} from '../../utils/search';
import { SearchResultCard } from './SearchResultCard';
import { applySearchResultToCards } from './searchResultActions';
import './SteamPanel.css';
import './HardwareResourcesPanel.css';

const MIN_QUERY_LENGTH = 2;
const SEARCH_DEBOUNCE_MS = 500;

type SteamAssetTab = 'images' | 'logos';

type SteamAssetState = {
  entries: SearchResult[];
  page: number;
  total: number;
  hasMore: boolean;
  isLoading: boolean;
};

const INITIAL_ASSET_STATE: SteamAssetState = {
  entries: [],
  page: 1,
  total: 0,
  hasMore: false,
  isLoading: false,
};

export default function SteamPanel({
  editingCanvasRef,
  isEditing = false,
  onSelectGame,
}: {
  editingCanvasRef?: MutableRefObject<Canvas | null>;
  isEditing?: boolean;
  onSelectGame?: () => void;
}) {
  const { addFiles, editingCard, cards, swapGameAtIndex } =
    useFileDropperContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] =
    useState<SteamAutocompleteGame | null>(null);
  const [options, setOptions] = useState<SteamAutocompleteGame[]>([]);
  const [gridState, setGridState] =
    useState<SteamAssetState>(INITIAL_ASSET_STATE);
  const [logoState, setLogoState] =
    useState<SteamAssetState>(INITIAL_ASSET_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingGameId, setLoadingGameId] = useState<string | null>(null);
  const [tooltipGameId, setTooltipGameId] = useState<string | null>(null);
  const [hasLoadedQuery, setHasLoadedQuery] = useState(false);
  const [tabValue, setTabValue] = useState('images');
  const deferredQuery = useDeferredValue(searchQuery.trim());
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const gridStateRef = useRef(gridState);
  const logoStateRef = useRef(logoState);
  const requestIdsRef = useRef<Record<SteamAssetTab, number>>({
    images: 0,
    logos: 0,
  });
  const { ref: loaderRef, inView } = useInView({
    threshold: 0.9,
  });

  useEffect(() => {
    gridStateRef.current = gridState;
  }, [gridState]);

  useEffect(() => {
    logoStateRef.current = logoState;
  }, [logoState]);

  const handleTabChange = (_event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const getAssetSetter = (assetType: SteamAssetTab) =>
    assetType === 'logos' ? setLogoState : setGridState;

  const getAssetState = (assetType: SteamAssetTab) =>
    assetType === 'logos' ? logoStateRef.current : gridStateRef.current;

  const loadAssetPage = useCallback(
    (
      assetType: SteamAssetTab,
      game: SteamAutocompleteGame,
      page: number,
      {
        reset = false,
        signal,
      }: {
        reset?: boolean;
        signal?: AbortSignal;
      } = {},
    ) => {
      const setAssetState = getAssetSetter(assetType);
      const fetchAssets =
        assetType === 'logos'
          ? fetchSteamLogosByGameId
          : fetchSteamGridsByGameId;
      const requestId = requestIdsRef.current[assetType] + 1;
      requestIdsRef.current[assetType] = requestId;

      setAssetState((prev) =>
        reset
          ? { ...INITIAL_ASSET_STATE, isLoading: true }
          : { ...prev, isLoading: true },
      );

      void fetchAssets(game.id, game.name, { page, signal })
        .then(({ games, count, hasMore }) => {
          if (requestIdsRef.current[assetType] !== requestId) {
            return;
          }

          setAssetState((prev) => {
            const entries = reset ? games : [...prev.entries, ...games];
            return {
              entries,
              total: count,
              hasMore,
              isLoading: false,
              page: hasMore ? page + 1 : page,
            };
          });
        })
        .catch((err) => {
          if (requestIdsRef.current[assetType] !== requestId) {
            return;
          }

          if (err instanceof DOMException && err.name === 'AbortError') {
            setAssetState((prev) => ({ ...prev, isLoading: false }));
            return;
          }

          console.error(err);
          setAssetState((prev) => ({ ...prev, isLoading: false }));
        });
    },
    [],
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => setTooltipGameId(null);
    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => container.removeEventListener('scroll', handleScroll);
  }, [gridState.entries.length, logoState.entries.length, tabValue]);

  useEffect(() => {
    if (deferredQuery.length < MIN_QUERY_LENGTH) {
      setOptions([]);
      setIsLoading(false);
      setHasLoadedQuery(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      setIsLoading(true);
      void fetchSteamAutocomplete(deferredQuery, controller.signal)
        .then((results) => {
          setOptions(results);
          setHasLoadedQuery(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [deferredQuery]);

  useEffect(() => {
    if (!selectedGame) {
      setGridState(INITIAL_ASSET_STATE);
      setLogoState(INITIAL_ASSET_STATE);
      setTooltipGameId(null);
      return;
    }

    const controller = new AbortController();
    setTooltipGameId(null);
    loadAssetPage('images', selectedGame, 0, {
      reset: true,
      signal: controller.signal,
    });
    loadAssetPage('logos', selectedGame, 0, {
      reset: true,
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, [loadAssetPage, selectedGame]);

  useEffect(() => {
    if (!inView || !selectedGame) {
      return;
    }

    const assetType = tabValue === 'logos' ? 'logos' : 'images';
    const assetState = getAssetState(assetType);

    if (!assetState.hasMore || assetState.isLoading) {
      return;
    }

    const controller = new AbortController();
    loadAssetPage(assetType, selectedGame, assetState.page, {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, [inView, loadAssetPage, selectedGame, tabValue]);

  const activeAssetState = tabValue === 'logos' ? logoState : gridState;
  const visibleEntries = activeAssetState.entries;
  const isLoadingAssets =
    activeAssetState.isLoading && visibleEntries.length === 0;

  const addImage = (
    e: MouseEvent<HTMLImageElement>,
    url: string,
    game: SearchResult,
  ) => {
    const target = e.target as HTMLImageElement;
    setLoadingGameId(game.id);
    void applySearchResultToCards({
      addFiles,
      cards: cards.current,
      editingCard: isEditing ? editingCard : null,
      editingCanvas: editingCanvasRef?.current ?? null,
      game,
      onSelectGame,
      previewSrc: target.src,
      swapGameAtIndex,
      url,
    }).finally(() => {
      setLoadingGameId(null);
    });
  };

  return (
    <PanelSection title="SteamGrid search" className="steamPanel">
      <Autocomplete
        className="steamAutocomplete"
        options={options}
        loading={isLoading}
        value={selectedGame}
        inputValue={searchQuery}
        filterOptions={(x) => x}
        onInputChange={(_event, value) => setSearchQuery(value)}
        onChange={(_event, value) => setSelectedGame(value)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        noOptionsText={
          deferredQuery.length < MIN_QUERY_LENGTH
            ? 'Type at least 2 characters'
            : 'No SteamGridDB matches'
        }
        renderInput={(params) => (
          <TextField
            {...params}
            color="primary"
            className="textField"
            size="small"
            autoComplete="off"
            label="SteamGridDB game"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="secondary" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Typography color="secondary">{option.name}</Typography>
            </li>
          );
        }}
      />
      <div className="horizontalStack tabs steamTabs">
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Images" value="images" />
          <Tab label="Logos" value="logos" />
        </Tabs>
      </div>
      {isLoadingAssets && (
        <div className="steamLoading">
          <CircularProgress color="secondary" size={24} />
        </div>
      )}
      {!isLoadingAssets && visibleEntries.length > 0 && (
        <div
          className="searchResultsContainer horizontalStack"
          ref={scrollContainerRef}
        >
          {visibleEntries.map((gameEntry) => (
            <SearchResultCard
              key={`steam-${tabValue}-${gameEntry.id}`}
              description={gameEntry.summary}
              gameEntry={gameEntry}
              imgSource={gameEntry.cover}
              addImage={addImage}
              loading={loadingGameId === gameEntry.id}
              tooltipOpen={tooltipGameId === gameEntry.id}
              onTooltipOpen={() => setTooltipGameId(gameEntry.id)}
              onTooltipClose={() => setTooltipGameId(null)}
            />
          ))}
          {activeAssetState.hasMore && (
            <div className="loader" ref={loaderRef}>
              <CircularProgress color="secondary" size={24} />
            </div>
          )}
        </div>
      )}
      {!isLoadingAssets && selectedGame && visibleEntries.length === 0 && (
        <Typography
          variant="body2"
          color="secondary"
          className="steamSelectedGame"
        >
          No {tabValue === 'logos' ? 'logos' : 'images'} found for this game.
        </Typography>
      )}
      {!selectedGame && hasLoadedQuery && options.length > 0 && (
        <Typography
          variant="body2"
          color="secondary"
          className="steamSelectedGame"
        >
          Pick a SteamGridDB match from the dropdown.
        </Typography>
      )}
    </PanelSection>
  );
}
