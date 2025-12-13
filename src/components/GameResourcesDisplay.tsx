import { type SyntheticEvent, useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { type SearchResult, type ResultImage } from '../../netlify/apiProviders/types.mts';
import { util } from 'fabric';
import './GameResourcesDisplay.css';

type GameResourcesDisplayProps = {
  game: Partial<SearchResult>;
}

type ImageDrawerDisplayProps = {
  onClick?: () => void;
  imageResult: ResultImage
}

const ImageDrawerDisplay = ({ imageResult }: ImageDrawerDisplayProps) => {

  const scale = util.findScaleToFit(imageResult, { width: 400, height: 250 });

  return (<div className='imageResourceDisplayContainer'>
    <img
      width={imageResult.width * scale}
      height={imageResult.height * scale}
      className='imageResourceDisplay'
      src={imageResult.url}
      loading='lazy'
    />
  </div>);
}

export function GameResourcesDisplay({ game }: GameResourcesDisplayProps) {
  const [value, setValue] = useState('covers');

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: '400px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {game.cover && <Tab label="Covers" value="covers" />}
          {game.platforms && <Tab label="Platforms" value="platforms" />}
          {game.involved_companies && <Tab label="Companies" value="companies" />}
          {game.screenshots && <Tab label="Screenshots" value="screens" />}
          {game.artworks && <Tab label="Art" value="art" />}
          <Tab label="Game meta" value="meta" />
        </Tabs>
      </Box>
      <div className="resourceListArea" >
        {value === "covers" && game.cover && <ImageDrawerDisplay imageResult={game.cover} />}
        {value === "art" && game.artworks && game.artworks.map((artwork) => <ImageDrawerDisplay imageResult={artwork} />)}
        {value === "screens" && game.screenshots && game.screenshots.map((screen) => <ImageDrawerDisplay imageResult={screen} />)}
        {value === "platforms" && game.platforms && game.platforms.map((platform) => platform.logos && platform.logos.map(logo => (<ImageDrawerDisplay imageResult={logo} />)))}
        {value === "companies" && game.involved_companies && game.involved_companies.map((company) => company.company.logo && (<ImageDrawerDisplay imageResult={company.company.logo} />))}
        {value === "meta" && <div className='metaResources'>
          {game.name && [<Typography variant="h3">Name</Typography>, <Typography>{game.name}</Typography>]}
          {game.summary && [<Typography variant="h3">Summary</Typography>, <Typography>{game.summary}</Typography>]}
          {game.storyline && [<Typography variant="h3">Storyline</Typography>, <Typography>{game.storyline}</Typography>]}
        </div>}
      </div>
    </Box>
  );
}