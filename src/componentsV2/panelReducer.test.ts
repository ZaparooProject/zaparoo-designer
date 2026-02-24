import { describe, it, expect } from 'vitest';
import {
  panelReducer,
  initialPanelState,
  panels,
  type PanelState,
} from './panelReducer';
import type { CardData } from '../contexts/fileDropper';

const makeCard = (game: Record<string, unknown> = {}): CardData =>
  ({
    file: null,
    game,
    isSelected: false,
    colors: [],
    originalColors: [],
    key: 'test',
  }) as CardData;

describe('panelReducer', () => {
  describe('SELECT_PANEL', () => {
    it('should change the active panel', () => {
      const state = panelReducer(initialPanelState, {
        type: 'SELECT_PANEL',
        panel: panels.Search,
      });
      expect(state.panel).toBe(panels.Search);
    });

    it('should preserve other state when changing panel', () => {
      const custom: PanelState = {
        panel: panels.Edit,
        lastCollectionPanel: panels.Search,
        lastEditingPanel: panels.Resources,
      };
      const state = panelReducer(custom, {
        type: 'SELECT_PANEL',
        panel: panels.Logos,
      });
      expect(state.panel).toBe(panels.Logos);
      expect(state.lastCollectionPanel).toBe(panels.Search);
      expect(state.lastEditingPanel).toBe(panels.Resources);
    });
  });

  describe('ENTER_EDITING', () => {
    it('should save current panel as lastCollectionPanel', () => {
      const state: PanelState = {
        ...initialPanelState,
        panel: panels.Templates,
      };
      const next = panelReducer(state, {
        type: 'ENTER_EDITING',
        editingCard: makeCard(),
      });
      expect(next.lastCollectionPanel).toBe(panels.Templates);
    });

    it('should keep current panel when it exists in editing panels', () => {
      const state: PanelState = {
        ...initialPanelState,
        panel: panels.Search,
      };
      const next = panelReducer(state, {
        type: 'ENTER_EDITING',
        editingCard: makeCard(),
      });
      expect(next.panel).toBe(panels.Search);
    });

    it('should switch to Edit panel when current panel is not in editing panels and card has no game data', () => {
      const state: PanelState = {
        ...initialPanelState,
        panel: panels.Templates,
      };
      const next = panelReducer(state, {
        type: 'ENTER_EDITING',
        editingCard: makeCard(),
      });
      expect(next.panel).toBe(panels.Edit);
    });

    it('should switch to Resources panel when card has game data', () => {
      const state: PanelState = {
        ...initialPanelState,
        panel: panels.Templates,
      };
      const next = panelReducer(state, {
        type: 'ENTER_EDITING',
        editingCard: makeCard({ name: 'Sonic', cover: 'url' }),
      });
      expect(next.panel).toBe(panels.Resources);
    });

    it('should restore lastEditingPanel when one was previously saved', () => {
      const state: PanelState = {
        ...initialPanelState,
        panel: panels.Templates,
        lastEditingPanel: panels.Logos,
      };
      const next = panelReducer(state, {
        type: 'ENTER_EDITING',
        editingCard: makeCard({ name: 'Sonic' }),
      });
      expect(next.panel).toBe(panels.Logos);
    });

    it('should fall back to Edit panel when editingCard is null', () => {
      const state: PanelState = {
        ...initialPanelState,
        panel: panels.Templates,
      };
      const next = panelReducer(state, {
        type: 'ENTER_EDITING',
        editingCard: null,
      });
      expect(next.panel).toBe(panels.Edit);
    });
  });

  describe('LEAVE_EDITING', () => {
    it('should save current panel as lastEditingPanel', () => {
      const state: PanelState = {
        ...initialPanelState,
        panel: panels.Edit,
      };
      const next = panelReducer(state, { type: 'LEAVE_EDITING' });
      expect(next.lastEditingPanel).toBe(panels.Edit);
    });

    it('should keep current panel when it exists in collection panels', () => {
      const state: PanelState = {
        ...initialPanelState,
        panel: panels.Search,
      };
      const next = panelReducer(state, { type: 'LEAVE_EDITING' });
      expect(next.panel).toBe(panels.Search);
    });

    it('should restore lastCollectionPanel when current panel is not in collection panels', () => {
      const state: PanelState = {
        ...initialPanelState,
        panel: panels.Edit,
        lastCollectionPanel: panels.Templates,
      };
      const next = panelReducer(state, { type: 'LEAVE_EDITING' });
      expect(next.panel).toBe(panels.Templates);
    });
  });

  describe('round-trip transitions', () => {
    it('should preserve panel positions across enter/leave cycle', () => {
      let state: PanelState = { ...initialPanelState, panel: panels.Templates };

      // Enter editing — should switch away from Templates
      state = panelReducer(state, {
        type: 'ENTER_EDITING',
        editingCard: makeCard(),
      });
      expect(state.panel).toBe(panels.Edit);
      expect(state.lastCollectionPanel).toBe(panels.Templates);

      // Navigate to Logos while editing
      state = panelReducer(state, {
        type: 'SELECT_PANEL',
        panel: panels.Logos,
      });

      // Leave editing — Logos is in collectionPanels, so it stays
      state = panelReducer(state, { type: 'LEAVE_EDITING' });
      expect(state.panel).toBe(panels.Logos);
      expect(state.lastEditingPanel).toBe(panels.Logos);
    });

    it('should restore collection panel when leaving from an editing-only panel', () => {
      let state: PanelState = { ...initialPanelState, panel: panels.Search };

      // Enter editing on Search (shared panel, stays)
      state = panelReducer(state, {
        type: 'ENTER_EDITING',
        editingCard: makeCard(),
      });
      expect(state.panel).toBe(panels.Search);

      // Navigate to Resources (editing-only)
      state = panelReducer(state, {
        type: 'SELECT_PANEL',
        panel: panels.Resources,
      });

      // Leave editing — Resources not in collectionPanels, restores Search
      state = panelReducer(state, { type: 'LEAVE_EDITING' });
      expect(state.panel).toBe(panels.Search);
    });
  });
});
