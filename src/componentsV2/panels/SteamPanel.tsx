import {
  Alert,
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useDeferredValue, useEffect, useState } from 'react';
import { PanelSection } from './PanelSection';
import {
  fetchSteamAutocomplete,
  type SteamAutocompleteGame,
} from '../../utils/search';
import './SteamPanel.css';

const MIN_QUERY_LENGTH = 2;
const SEARCH_DEBOUNCE_MS = 250;

export default function SteamPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] =
    useState<SteamAutocompleteGame | null>(null);
  const [options, setOptions] = useState<SteamAutocompleteGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
              <div>
                <Typography color="secondary">{option.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  ID {option.id}
                </Typography>
              </div>
            </li>
          );
        }}
      />
      {selectedGame && (
        <Alert severity="info" sx={{ width: '100%', boxSizing: 'border-box' }}>
          Selected: {selectedGame.name} (ID {selectedGame.id})
        </Alert>
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
