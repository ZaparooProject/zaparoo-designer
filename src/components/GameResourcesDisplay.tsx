import { type MutableRefObject, type SyntheticEvent, useState } from 'react';
import { Tabs, Tab, Typography, IconButton, Drawer } from '@mui/material';
import {
  type SearchResult,
  type ResultImage,
} from '../../netlify/apiProviders/types.mts';
import { util, type Canvas, FabricImage } from 'fabric';
import CloseIcon from '@mui/icons-material/Close';
import controllers from '../controllers';
import { staticLogos } from '../logos';

import './GameResourcesDisplay.css';

type GameResourcesDisplayProps = {
  drawerState: boolean;
  setDrawerState: React.Dispatch<boolean>;
  game: Partial<SearchResult>;
  canvasRef: MutableRefObject<Canvas | null>;
};

type ImageDrawerDisplayProps = {
  canvasRef: MutableRefObject<Canvas | null>;
  imageResult: Pick<ResultImage, 'url' | 'width' | 'height'>;
};

const ImageDrawerDisplay = ({
  imageResult,
  canvasRef,
}: ImageDrawerDisplayProps) => {
  const scale = util.findScaleToFit(imageResult, { width: 400, height: 250 });
  const onClick = () => {
    util.loadImage(imageResult.url).then((img) => {
      if (!canvasRef.current) {
        return;
      }
      const image = new FabricImage(img);
      const scale = util.findScaleToFit(image, canvasRef.current);
      image.scale(scale);
      canvasRef.current.add(image);
      canvasRef.current.centerObject(image);
    });
  };

  return (
    <div onClick={onClick} className="imageResourceDisplayContainer">
      <img
        width={imageResult.width * scale}
        height={imageResult.height * scale}
        className="imageResourceDisplay"
        src={imageResult.url}
        loading="lazy"
      />
    </div>
  );
};

export function GameResourcesDisplay({
  game,
  canvasRef,
  drawerState,
  setDrawerState,
}: GameResourcesDisplayProps) {
  const [value, setValue] = useState('covers');
  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    // The modal has zindex 1300;
    <Drawer anchor="bottom" open={drawerState} style={{ zIndex: 1500 }}>
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
          <Tab label="Game meta" value="meta" />
          <Tab label="Controllers" value="controllers" />
        </Tabs>
        <IconButton onClick={() => setDrawerState(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className="horizontalStack resourceListArea">
        {value === 'covers' && game.cover && (
          <ImageDrawerDisplay canvasRef={canvasRef} imageResult={game.cover} />
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
        {value === 'controllers' &&
          controllers.map((controller) => (
            <ImageDrawerDisplay
              key={controller.name}
              canvasRef={canvasRef}
              imageResult={{ url: controller.url, width: 400, height: 400 }}
            />
          ))}
        {value === 'logos' &&
          staticLogos.map((logo) => (
            <ImageDrawerDisplay
              key={logo.name}
              canvasRef={canvasRef}
              imageResult={{ url: logo.url, width: 400, height: 400 }}
            />
          ))}
      </div>
    </Drawer>
  );
}
