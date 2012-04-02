enyo.kind( {
  name: "HslLocks.LoginPopup",
  kind: "onyx.Popup",
  centered: true,
  modal: true,
  floating: true,

  components: [
    { kind: "onyx.Input",
      name: "userInput",
      placeholder: "Username" },
    { kind: "onyx.Input",
      name: "passwordInput",
      placeholder: "Password" },
    { kind: "onyx.Button",
      content: "Save",
      onclick: "saveData" }
  ],

  saveData: function() {

  }
});
