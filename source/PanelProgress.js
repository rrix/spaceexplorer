enyo.kind({
  kind: 'Control',
  name: 'PanelProgress',

  published: {
    panel: ""
  },

  setPanel: function(inPanel) {
    this.panel = inPanel;

    // FIXME: Set up event listeners and suchthings.
  }
});
