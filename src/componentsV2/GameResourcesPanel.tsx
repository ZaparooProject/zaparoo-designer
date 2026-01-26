import { type MutableRefObject } from 'react';
import { Typography } from '@mui/material';
import { type Canvas } from 'fabric';
import { PanelSection } from './PanelSection';
import { SearchResult } from '../../netlify/apiProviders/types.mts';
import { ImagePanelDisplay } from './ImagePanelDisplay';

type GameResourcesDisplayProps = {
  canvasRef: MutableRefObject<Canvas | null>;
  game: Partial<SearchResult>;
};

export function GameResourcesPanel({
  canvasRef,
  game,
}: GameResourcesDisplayProps) {
  return (
    <>
      {game.cover && (
        <PanelSection title="Cover">
          <ImagePanelDisplay canvasRef={canvasRef} imageResult={game.cover} />
        </PanelSection>
      )}
      {game.artworks && (
        <PanelSection title="Artwork">
          {game.artworks.map((artwork) => (
            <ImagePanelDisplay
              key={artwork.id}
              canvasRef={canvasRef}
              imageResult={artwork}
            />
          ))}
        </PanelSection>
      )}
      {game.screenshots && (
        <PanelSection title="Screenshots">
          {game.screenshots.map((screen) => (
            <ImagePanelDisplay
              key={screen.id}
              canvasRef={canvasRef}
              imageResult={screen}
            />
          ))}
        </PanelSection>
      )}
      {game.platforms && (
        <PanelSection title="Platforms">
          {game.platforms.map(
            (platform) =>
              platform.logos &&
              platform.logos.map((logo) => (
                <ImagePanelDisplay
                  key={logo.id}
                  canvasRef={canvasRef}
                  imageResult={logo}
                />
              )),
          )}
        </PanelSection>
      )}
      {game.involved_companies && (
        <PanelSection title="Screenshots">
          {game.involved_companies.map(
            (company) =>
              company.company.logo && (
                <ImagePanelDisplay
                  key={company.id}
                  canvasRef={canvasRef}
                  imageResult={company.company.logo}
                />
              ),
          )}
        </PanelSection>
      )}
      <PanelSection title="Informations">
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
      </PanelSection>
    </>
  );
}
