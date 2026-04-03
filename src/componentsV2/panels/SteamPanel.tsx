import {
  Autocomplete,
  CircularProgress,
  Tab,
  TextField,
  Tabs,
  Typography,
} from '@mui/material';
import {
  useDeferredValue,
  useEffect,
  useState,
  type MouseEvent,
  type MutableRefObject,
  type SyntheticEvent,
} from 'react';
import { type Canvas } from 'fabric';
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
  const [gridEntries, setGridEntries] = useState<SearchResult[]>([]);
  const [logoEntries, setLogoEntries] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [loadingGameId, setLoadingGameId] = useState<string | null>(null);
  const [tooltipGameId, setTooltipGameId] = useState<string | null>(null);
  const [hasLoadedQuery, setHasLoadedQuery] = useState(false);
  const [tabValue, setTabValue] = useState('images');
  const deferredQuery = useDeferredValue(searchQuery.trim());

  const handleTabChange = (_event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

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
      setGridEntries([]);
      setLogoEntries([]);
      return;
    }

    const controller = new AbortController();
    setIsLoadingAssets(true);

    void Promise.all([
      fetchSteamGridsByGameId(
        selectedGame.id,
        selectedGame.name,
        controller.signal,
      ),
      fetchSteamLogosByGameId(
        selectedGame.id,
        selectedGame.name,
        controller.signal,
      ),
    ])
      .then(([gridResults, logoResults]) => {
        setGridEntries(gridResults.games);
        setLogoEntries(logoResults.games);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        console.error(err);
      })
      .finally(() => {
        setIsLoadingAssets(false);
      });

    return () => {
      controller.abort();
    };
  }, [selectedGame]);

  const visibleEntries = tabValue === 'logos' ? logoEntries : gridEntries;

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
        <div className="searchResultsContainer horizontalStack">
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
