import type { JSX } from 'react';
import { useCallback, useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { type PlatformResult } from '../../netlify/apiProviders/types.mjs';
import { platformPromise, platformsData } from '../utils/search';

type PlatformDropdownProps = {
  setPlatform: (p: PlatformResult) => void;
  platform: PlatformResult;
};

export const PlatformDropdown = ({
  setPlatform,
  platform,
}: PlatformDropdownProps): JSX.Element => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    platformPromise.then(() => setReady(true));
  }, [ready]);
  const togglePlatform = useCallback(
    async (evt: SelectChangeEvent<string>) => {
      const value = evt.target.value;
      setPlatform(platformsData.find((p) => p.id.toString() === value)!);
    },
    [setPlatform],
  );
  return (
    <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="platform-select" sx={{ fontWeight: 400 }}>
        Platform
      </InputLabel>
      <Select
        labelId="platform-select"
        value={platform.id.toString()}
        label="Platform"
        onChange={togglePlatform}
        sx={{ fontWeight: 400 }}
      >
        {platformsData.map((aPlatform) => (
          <MenuItem
            key={aPlatform.id}
            value={aPlatform.id.toString()}
            selected={aPlatform.id === platform.id}
            sx={{ fontWeight: 400 }}
          >
            {aPlatform.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PlatformDropdown;
