enyo.kind({
  kind: "enyo.Control",
  name:  "HslLocks.Buttons",
  classes: "buttonWrap",
  layoutKind: "FittableRowsLayout",

  components: [
    {
      kind:  "onyx.RadioGroup",
      components: [
        {
          name:     "lockedButton",
          content:  "Locked",
          classes:  "onyx-affirmative hsltogglebuttons",
          value:    "lock",
          onclick:  "emitLockedClick"
        },
        {
          name:     "unlockedButton",
          content:  "Unlocked",
          classes:  "onyx-negative hsltogglebuttons",
          value:    "unlock",
          onclick:  "emitUnlockedClick"
        }
      ]
    },
    {
      kind: "onyx.Button",
      name: "quickToggle",
      content: "Open for 30 seconds",
      classes: "hsltogglebuttons single-center-button",
      value: "toggle",
      onclick: "emitToggleClick"
    }
  ],

  /*
   * Unlock button clicked
   */
  emitUnlockedClick: function() {
    this.unlocked();
    this.emitClick();
  },

  /*
   * Lock button clicked
   */
  emitLockedClick: function() {
    this.locked();
    this.emitClick();
  },

  /*
   * Toggle button clicked
   */
  emitToggleClick: function() {
    this.value = "toggle";
    this.emitClick();
  },

  emitClick: function() {
    this.bubble("click");
  },

  /*
   * Call to set buttongroup to locked
   */
  locked: function() {
    this.$.lockedButton.tap();
    this.$.quickToggle.removeClass( "hidden-button" );
    this.render();
    this.value = "l";
  },

  /*
   * Call to set buttongroup to unlocked
   */
  unlocked: function() {
    this.$.unlockedButton.tap();
    this.$.quickToggle.addClass( "hidden-button" );
    this.render();
    this.value = "u";
  }
});
