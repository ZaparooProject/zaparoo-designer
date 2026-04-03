import type { CardData } from '../contexts/fileDropper';

export const enum panels {
  'Search',
  'Steam',
  'Resources',
  'Logos',
  'Templates',
  'FilesUtils',
  'Consoles',
  'Controllers',
  'Edit',
}

export const requireSelectionPanel = [panels.Templates];
export const editingPanels = [
  panels.Search,
  panels.Steam,
  panels.Resources,
  panels.Logos,
  panels.Consoles,
  panels.Edit,
];
export const collectionPanels = [
  panels.Search,
  panels.Steam,
  panels.Templates,
  panels.Logos,
  panels.Consoles,
  panels.FilesUtils,
];

export type PanelState = {
  panel: panels;
  lastCollectionPanel: panels;
  lastEditingPanel: panels | null;
};

export type PanelAction =
  | { type: 'SELECT_PANEL'; panel: panels }
  | { type: 'ENTER_EDITING'; editingCard: CardData | null }
  | { type: 'LEAVE_EDITING' };

export const initialPanelState: PanelState = {
  panel: panels.Templates,
  lastCollectionPanel: panels.Templates,
  lastEditingPanel: null,
};

export function panelReducer(
  state: PanelState,
  action: PanelAction,
): PanelState {
  switch (action.type) {
    case 'SELECT_PANEL':
      return { ...state, panel: action.panel };
    case 'ENTER_EDITING': {
      const next = { ...state, lastCollectionPanel: state.panel };
      if (editingPanels.includes(state.panel)) return next;
      const hasGameData =
        action.editingCard && Object.keys(action.editingCard.game).length > 0;
      return {
        ...next,
        panel:
          state.lastEditingPanel ??
          (hasGameData ? panels.Resources : panels.Edit),
      };
    }
    case 'LEAVE_EDITING': {
      const next = { ...state, lastEditingPanel: state.panel };
      if (collectionPanels.includes(state.panel)) return next;
      return { ...next, panel: state.lastCollectionPanel };
    }
  }
}
