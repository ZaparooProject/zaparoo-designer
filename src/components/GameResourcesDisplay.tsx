import { type SyntheticEvent, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { type SearchResult, type ResultImage } from '../../netlify/apiProviders/types.mts';

type GameResourcesDisplayProps = {
  game: Partial<SearchResult>;
}

type ImageDrawerDisplayProps = {
  onClick?: () => void;
  imageResult: ResultImage
}

const rowHeight = 250;

const ImageDrawerDisplay = ({ onClick, imageResult }: ImageDrawerDisplayProps) => {
  
  return (<img
    src={imageResult.thumb}
    height={rowHeight}
    width={Math.round(imageResult.width * rowHeight / imageResult.height)}
    />)
}

export function GameResourcesDisplay({ game }: GameResourcesDisplayProps) {
  const [value, setValue] = useState('covers');

  console.log(game)

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: '400px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {game.cover && <Tab label="Covers" value="covers"/>}
          <Tab label="Logos" value="logos" />
          <Tab label="Screenshots" value="screens" />
          <Tab label="Art" value="art" />
          <Tab label="Game meta" value="meta" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="8px" padding="8px" >
        {value === "covers" && game.cover && <ImageDrawerDisplay imageResult={game.cover} />}
      </Box>
    </Box>
  );
}