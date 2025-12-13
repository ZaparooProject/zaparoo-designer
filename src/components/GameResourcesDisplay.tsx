import { type SyntheticEvent, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

export function GameResourcesDisplay() {
  const [value, setValue] = useState('covers');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: '400px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Covers" value="covers"/>
          <Tab label="Logos" value="logos" />
          <Tab label="Screenshots" value="screens" />
          <Tab label="Art" value="art" />
          <Tab label="Game meta" value="meta" />
        </Tabs>
      </Box>
      <Box>
        {value === "covers" && "HELLO"}
      </Box>
    </Box>
  );
}