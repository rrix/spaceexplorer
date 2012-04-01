enyo.kind({
  kind: "onyx.RadioGroup",
  name: "HslLocks.Buttons",
  components: [
    {name: "lockedButton",   content: "Locked",   class: "onyx-affirmative", value: "lock",   style:"font-size:48px", onclick: "emitLockedClick"  },
    {name: "unlockedButton", content: "Unlocked", class: "onyx-negative",    value: "unlock", style:"font-size:48px", onclick: "emitUnlockedClick"}
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
    this.$.lockedButton.active   = true;
    this.$.unlockedButton.active = false;
    this.value = "l";
  },

  /*
   * Call to set buttongroup to unlocked
   */
  unlocked: function() {
    this.$.lockedButton.active   = false;
    this.$.unlockedButton.active = true;
    this.value = "u";
  }
});
