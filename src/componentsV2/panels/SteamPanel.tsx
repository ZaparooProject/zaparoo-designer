import {
  Alert,
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useDeferredValue, useEffect, useState, type MouseEvent } from 'react';
import type { SearchResult } from '../../../netlify/apiProviders/types.mts';
import { useFileDropperContext } from '../../contexts/fileDropper';
import { PanelSection } from './PanelSection';
import {
  fetchSteamAutocomplete,
  fetchSteamGridsByGameId,
  getImage,
  type SteamAutocompleteGame,
} from '../../utils/search';
import { SearchResultCard } from './SearchResultCard';
import './SteamPanel.css';

const MIN_QUERY_LENGTH = 2;
const SEARCH_DEBOUNCE_MS = 250;

export default function SteamPanel({
  isEditing = false,
  onSelectGame,
}: {
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGrids, setIsLoadingGrids] = useState(false);
  const [loadingGameId, setLoadingGameId] = useState<string | null>(null);
  const [tooltipGameId, setTooltipGameId] = useState<string | null>(null);
  const [hasLoadedQuery, setHasLoadedQuery] = useState(false);
  const deferredQuery = useDeferredValue(searchQuery.trim());

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
      return;
    }

    const controller = new AbortController();
    setIsLoadingGrids(true);

    void fetchSteamGridsByGameId(
      selectedGame.id,
      selectedGame.name,
      controller.signal,
    )
      .then(({ games }) => {
        setGridEntries(games);
        console.log(games);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        console.error(err);
      })
      .finally(() => {
        setIsLoadingGrids(false);
      });

    return () => {
      controller.abort();
    };
  }, [selectedGame]);

  const addImage = (
    e: MouseEvent<HTMLImageElement>,
    url: string,
    game: SearchResult,
  ) => {
    const target = e.target as HTMLImageElement;
    setLoadingGameId(game.id);
    if (isEditing && editingCard) {
      const editingIndex = cards.current.indexOf(editingCard);
      if (editingIndex === -1) {
        setLoadingGameId(null);
        return;
      }
      getImage(url, target.src).then((file) => {
        swapGameAtIndex(file, game, editingIndex);
        onSelectGame?.();
        setLoadingGameId(null);
      });
    } else {
      getImage(url, target.src).then((file) => {
        addFiles([file], [game]);
        setLoadingGameId(null);
      });
    }
  };

  return (
    <PanelSection title="Steam" className="steamPanel">
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
            helperText="Autocomplete suggestions from SteamGridDB."
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
      {selectedGame && (
        <Alert severity="info" sx={{ width: '100%', boxSizing: 'border-box' }}>
          Selected: {selectedGame.name}
        </Alert>
      )}
      {isLoadingGrids && (
        <div className="steamLoading">
          <CircularProgress color="secondary" size={24} />
        </div>
      )}
      {!isLoadingGrids && gridEntries.length > 0 && (
        <div className="searchResultsContainer horizontalStack">
          {gridEntries.map(
            (gameEntry) =>
              console.log(gameEntry) || (
                <SearchResultCard
                  key={`steam-grid-${gameEntry.id}`}
                  description={gameEntry.summary}
                  gameEntry={gameEntry}
                  imgSource={gameEntry.cover}
                  addImage={addImage}
                  loading={loadingGameId === gameEntry.id}
                  tooltipOpen={tooltipGameId === gameEntry.id}
                  onTooltipOpen={() => setTooltipGameId(gameEntry.id)}
                  onTooltipClose={() => setTooltipGameId(null)}
                />
              ),
          )}
        </div>
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
