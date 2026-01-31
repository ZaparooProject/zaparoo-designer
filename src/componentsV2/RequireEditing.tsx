import { Alert } from '@mui/material';

export const RequireEditing = () => {
  return (
    <Alert style={{ width: '100%', boxSizing: 'border-box' }} severity="error">
      This panel requires you to select one card for editing.
    </Alert>
  );
};

export const RequireCards = () => {
  return (
    <Alert style={{ width: '100%', boxSizing: 'border-box' }} severity="error">
      Please create a card before
    </Alert>
  );
};

export const RequireSelection = () => {
  return (
    <Alert style={{ width: '100%', boxSizing: 'border-box' }} severity="error">
      Please select one ore more card before.
    </Alert>
  );
};
