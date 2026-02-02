import { Alert } from '@mui/material';

export const RequireEditing = () => {
  return (
    <Alert style={{ width: '100%', boxSizing: 'border-box' }} severity="error">
      This panel requires you to edit a card.
    </Alert>
  );
};

export const RequireCards = () => {
  return (
    <Alert style={{ width: '100%', boxSizing: 'border-box' }} severity="error">
      Please create a card to use this panel
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
