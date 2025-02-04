import type { JSX } from 'react';
import { useCallback } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useAppDataContext } from '../contexts/appData';
import type { templateTypeV2 } from '../resourcesTypedef';

type TemplateDropdownProps = {
  id: string;
  template: templateTypeV2 & { key: string };
};

const TemplateDropdown = ({
  id = 'header-dropdown',
  template,
}: TemplateDropdownProps): JSX.Element => {
  const { setTemplate, availableTemplates } = useAppDataContext();
  const toggleTemplate = useCallback(
    async (evt: SelectChangeEvent<string>) => {
      const value = evt.target.value;
      const chosenTemplate = availableTemplates.find(
        (template) => template.key === value,
      );
      setTemplate(chosenTemplate!);
    },
    [setTemplate, availableTemplates],
  );

  const currentKey = template.key;

  return (
    <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={id} htmlFor={`${id}-select`} sx={{ fontWeight: 400 }}>
        Card template
      </InputLabel>
      <Select
        id={`${id}-select`}
        labelId={id}
        label="Card template"
        value={currentKey}
        onChange={toggleTemplate}
        sx={{ fontWeight: 400 }}
      >
        {availableTemplates.map((template) => (
          <MenuItem
            key={template.key}
            value={template.key}
            selected={template.key === currentKey}
            sx={{ fontWeight: 400 }}
          >
            {template.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TemplateDropdown;
