import { Alert } from '@mui/material';

export const RequireCards = () => {
  return (
    <Alert style={{ width: '100%', boxSizing: 'border-box' }} severity="error">
      Please create a card first, by using Search panel or clicking the sample
      card.
    </Alert>
  );
};

export const RequireSelection = () => {
  return (
    <Alert style={{ width: '100%', boxSizing: 'border-box' }} severity="error">
      Please select one ore more card to proceed.
    </Alert>
  );
};

export const SuggestSelecting = () => {
  return (
    <Alert style={{ width: '100%', boxSizing: 'border-box' }} severity="info">
      To apply to existing cards, select them first.
    </Alert>
  );
};

export const SuggestDrag = () => {
  return (
    <Alert style={{ width: '100%', boxSizing: 'border-box' }} severity="info">
      You can drag a logo from the panel onto one of the cards in view
    </Alert>
  );
};

export const SuggestClick = () => {
  return (
    <Alert style={{ width: '100%', boxSizing: 'border-box' }} severity="info">
      Click a logo or image to add it to the card.
    </Alert>
  );
};

export const NoGameData = () => {
  return (
    <Alert style={{ width: '100%', boxSizing: 'border-box' }} severity="info">
      No game artwork available. Use Search to create a card with game data.
    </Alert>
  );
};
