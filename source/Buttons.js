enyo.kind({
  kind:  "onyx.RadioGroup",
  name:  "HslLocks.Buttons",
  style: "width: 100%",

  components: [
    {name:      "lockedButton",
       content: "Locked",
       class:   "onyx-affirmative",
       value:   "lock",
       style:   "width: 50%; font-size:48px",
       onclick: "emitLockedClick"  },

    {name:      "unlockedButton",
       content: "Unlocked",
       class:   "onyx-negative",
       value:   "unlock",
       style:   "width: 50%; font-size:48px",
       onclick: "emitUnlockedClick"}
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

  emitClick: function() {
    this.bubble("click");
  },

  /*
   * Call to set buttongroup to locked
   */
  locked: function() {
    this.$.lockedButton.tap();
    this.render();
    this.value = "l";
  },

  /*
   * Call to set buttongroup to unlocked
   */
  unlocked: function() {
    this.$.unlockedButton.tap();
    this.render();
    this.value = "u";
  }
});
