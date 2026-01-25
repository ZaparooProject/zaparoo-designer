import { type MutableRefObject, useState } from 'react';
import { Typography } from '@mui/material';
import { type SearchResult } from '../../netlify/apiProviders/types.mts';
import { type Canvas } from 'fabric';
import { LogoTabs } from '../components/LogosTabs';
import { ControllerDisplay } from '../components/ControllerDisplay';
import { ConsoleDisplay } from '../components/ConsoleDisplay';
import { ImageDrawerDisplay } from '../components/ImageDrawerDisplay';
import './GameResourcesPanel.css';

type GameResourcesDisplayProps = {
  drawerState: boolean;
  setDrawerState: React.Dispatch<boolean>;
  game: Partial<SearchResult>;
  canvasRef: MutableRefObject<Canvas | null>;
};

export function GameResourcesPanel({
  game,
  canvasRef,
}: GameResourcesDisplayProps) {
  return;
  <div className="horizontalStack resourceListArea"></div>;
}
