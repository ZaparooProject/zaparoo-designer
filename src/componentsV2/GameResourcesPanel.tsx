import { type MutableRefObject } from 'react';
import { Typography } from '@mui/material';
import { type Canvas } from 'fabric';
import { PanelSection } from './PanelSection';
import { SearchResult } from '../../netlify/apiProviders/types.mts';
import { ImagePanelDisplay } from './ImagePanelDisplay';
import './GameResourcesPanel.css';
import { RequireCards, RequireEditing } from './RequireEditing';

type GameResourcesDisplayProps = {
  canvasRef: MutableRefObject<Canvas | null>;
  game: Partial<SearchResult>;
  isEditing: boolean;
  hasCards: boolean;
};

export function GameResourcesPanel({
  canvasRef,
  game,
  isEditing,
  hasCards,
}: GameResourcesDisplayProps) {
  return (
    <PanelSection title="Game resources" className="gameResourcesPanel">
      {isEditing || <RequireEditing />}
      {hasCards || <RequireCards />}
      {game.cover && (
        <PanelSection title="Cover">
          <ImagePanelDisplay canvasRef={canvasRef} imageResult={game.cover} />
        </PanelSection>
      )}
      {game.artworks && (
        <PanelSection title="Artwork" className="sectionNoScroll">
          <div className="resourceListAreaLogos noScroll">
            {game.artworks.map((artwork) => (
              <ImagePanelDisplay
                key={artwork.id}
                canvasRef={canvasRef}
                imageResult={artwork}
              />
            ))}
          </div>
        </PanelSection>
      )}
      {game.screenshots && (
        <PanelSection title="Screenshots">
          <div className="resourceListAreaLogos noScroll">
            {game.screenshots.map((screen) => (
              <ImagePanelDisplay
                key={screen.id}
                canvasRef={canvasRef}
                imageResult={screen}
              />
            ))}
          </div>
        </PanelSection>
      )}
      {game.platforms && (
        <PanelSection title="Platforms">
          <div className="resourceListAreaLogos noScroll">
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
          </div>
        </PanelSection>
      )}
      {game.involved_companies && (
        <PanelSection title="Company logos">
          <div className="resourceListAreaLogos noScroll">
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
          </div>
        </PanelSection>
      )}
      {game.name && (
        <PanelSection title="Informations">
          {game.name && [
            <Typography variant="h3" color="secondary">
              Name
            </Typography>,
            <Typography color="secondary">{game.name}</Typography>,
          ]}
          {game.summary && [
            <Typography variant="h3" color="secondary">
              Summary
            </Typography>,
            <Typography color="secondary">{game.summary}</Typography>,
          ]}
          {game.storyline && [
            <Typography variant="h3" color="secondary">
              Storyline
            </Typography>,
            <Typography color="secondary">{game.storyline}</Typography>,
          ]}
        </PanelSection>
      )}
      {Object.keys(game).length === 0 && (
        <PanelSection title="No card selected">
          <Typography color="secondary">
            Please select a single card to see the specific game resources
          </Typography>
        </PanelSection>
      )}
    </PanelSection>
  );
}

export default GameResourcesPanel;
