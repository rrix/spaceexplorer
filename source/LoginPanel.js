enyo.kind( {
  name: "HslLocks.LoginPopup",
  kind: "onyx.Popup",
  centered: true,
  modal: true,
  floating: true,

  components: [
    { kind: "onyx.InputDecorator", components: [
      { kind: "onyx.Input",
        name: "userInput",
        placeholder: "Username" },
    ]},
    { kind: "onyx.InputDecorator", components: [
      { kind: "onyx.Input",
        name: "passwordInput",
        placeholder: "Password" },
    ]},
    { kind: "onyx.Button",
      content: "Save",
      onclick: "saveData" }
  ],

  saveData: function() {
    enyo.log("clicK");
    values = new Array();
    values.push(this.$.userInput.hasNode().value);
    values.push(this.$.passwordInput.hasNode().value);

    localStorage.setItem("hsllock_loginData", values.join("|") );
    this.hide();
  }
});
