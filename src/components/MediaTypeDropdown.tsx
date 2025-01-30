import type { JSX } from 'react';
import { useCallback } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useAppDataContext } from '../contexts/appData';
import { mediaTargetList } from '../printMediaTypes';

type TemplateDropdownProps = {
  id?: string;
};

const MediaTypeDropdown = ({
  id = 'carousel-dropdown',
}: TemplateDropdownProps): JSX.Element => {
  const { setMediaType, mediaType } = useAppDataContext();
  const toggleMediaType = useCallback(
    async (evt: SelectChangeEvent<string>) => {
      const value = evt.target.value;
      const chosenMediaType = mediaTargetList.find(
        (target) => target.label === value,
      );
      if (chosenMediaType) {
        setMediaType(chosenMediaType);
      }
    },
    [setMediaType],
  );

  const currentKey = mediaType.label;

  return (
    <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={id} htmlFor={`${id}-select`} sx={{ fontWeight: 400 }}>
        Media type
      </InputLabel>
      <Select
        id={`${id}-select`}
        labelId={id}
        label="Media type"
        value={currentKey}
        onChange={toggleMediaType}
        sx={{ fontWeight: 400, minWidth: 250, textAlign: 'left' }}
      >
        {mediaTargetList.map((item, key) => (
          <MenuItem
            key={key}
            value={item.label}
            selected={item.label === currentKey}
            sx={{ fontWeight: 400 }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MediaTypeDropdown;
