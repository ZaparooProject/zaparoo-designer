import { Alert } from '@mui/material';

export const RequireEditing = () => {
  return (
    <Alert style={{ width: '100%', boxSizing: 'border-box' }} severity="error">
      This panel requires you to edit a card. (Click a card to edit it)
    </Alert>
  );
};

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

export const NotWhileEditing = () => {
  return (
    <Alert
      style={{ width: '100%', boxSizing: 'border-box' }}
      severity="warning"
    >
      You cannot change template while editing a single card.
    </Alert>
  );
};

export const BehindEditor = () => {
  return (
    <Alert style={{ width: '100%', boxSizing: 'border-box' }} severity="info">
      Games added while editing will appear behind the editor.
    </Alert>
  );
};
