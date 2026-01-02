import { type MutableRefObject, type SyntheticEvent, useState } from 'react';
import { Tabs, Tab, Typography, IconButton, Drawer } from '@mui/material';
import { type SearchResult } from '../../netlify/apiProviders/types.mts';
import { type Canvas } from 'fabric';
import CloseIcon from '@mui/icons-material/Close';
import { LogoTabs } from './LogosTabs';
import { ControllerDisplay } from './ControllerDisplay';
import { ImageDrawerDisplay } from './ImageDrawerDisplay';
import './GameResourcesDisplay.css';

type GameResourcesDisplayProps = {
  drawerState: boolean;
  setDrawerState: React.Dispatch<boolean>;
  game: Partial<SearchResult>;
  canvasRef: MutableRefObject<Canvas | null>;
};

export function GameResourcesDisplay({
  game,
  canvasRef,
  drawerState,
  setDrawerState,
}: GameResourcesDisplayProps) {
  const [value, setValue] = useState(game.cover ? 'cover' : 'logos');
  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    // The modal has zindex 1300;
    <Drawer anchor="bottom" open={drawerState} style={{ zIndex: 1300 }}>
      <div className="horizontalStack tabs">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {game.cover && <Tab label="Covers" value="covers" />}
          {game.platforms && <Tab label="Platforms" value="platforms" />}
          <Tab label="Logos" value="logos" />
          {game.involved_companies && (
            <Tab label="Companies" value="companies" />
          )}
          {game.screenshots && <Tab label="Screenshots" value="screens" />}
          {game.artworks && <Tab label="Art" value="art" />}
          {game.name && <Tab label="Game meta" value="meta" />}
          <Tab label="Controllers" value="controllers" />
        </Tabs>
        <IconButton onClick={() => setDrawerState(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      {value !== 'logos' && value !== 'controllers' && (
        <div className="horizontalStack resourceListArea">
          {value === 'covers' && game.cover && (
            <ImageDrawerDisplay
              canvasRef={canvasRef}
              imageResult={game.cover}
            />
          )}
          {value === 'art' &&
            game.artworks &&
            game.artworks.map((artwork) => (
              <ImageDrawerDisplay
                key={artwork.id}
                canvasRef={canvasRef}
                imageResult={artwork}
              />
            ))}
          {value === 'screens' &&
            game.screenshots &&
            game.screenshots.map((screen) => (
              <ImageDrawerDisplay
                key={screen.id}
                canvasRef={canvasRef}
                imageResult={screen}
              />
            ))}
          {value === 'platforms' &&
            game.platforms &&
            game.platforms.map(
              (platform) =>
                platform.logos &&
                platform.logos.map((logo) => (
                  <ImageDrawerDisplay
                    key={logo.id}
                    canvasRef={canvasRef}
                    imageResult={logo}
                  />
                )),
            )}
          {value === 'companies' &&
            game.involved_companies &&
            game.involved_companies.map(
              (company) =>
                company.company.logo && (
                  <ImageDrawerDisplay
                    key={company.id}
                    canvasRef={canvasRef}
                    imageResult={company.company.logo}
                  />
                ),
            )}
          {value === 'meta' && (
            <div className="metaResources">
              {game.name && [
                <Typography variant="h3">Name</Typography>,
                <Typography>{game.name}</Typography>,
              ]}
              {game.summary && [
                <Typography variant="h3">Summary</Typography>,
                <Typography>{game.summary}</Typography>,
              ]}
              {game.storyline && [
                <Typography variant="h3">Storyline</Typography>,
                <Typography>{game.storyline}</Typography>,
              ]}
            </div>
          )}
        </div>
      )}
      {value === 'controllers' && <ControllerDisplay canvasRef={canvasRef} />}
      {value === 'logos' && <LogoTabs canvasRef={canvasRef} />}
    </Drawer>
  );
}
