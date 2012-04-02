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
    { kind: "onyx.InputDecorator", components: [
      { kind: "onyx.Input",
        name: "urlInput",
        placeholder: "Server URL" },
    ]},
    { kind: "onyx.Button",
      content: "Save",
      onclick: "saveData" }
  ],

  events: {
    onLoginChanged: ""
  },

  create: function() {
    this.inherited(arguments);

    this.$.urlInput.hasNode().value = this.parent.url ? this.parent.url : "http://intranet.heatsynclabs.org/~access/cgi-bin/access.rb";
  },

  saveData: function() {
    enyo.log("clicK");
    values = new Array();
    values.push(this.$.userInput.hasNode().value);
    values.push(this.$.passwordInput.hasNode().value);
    values.push(this.$.urlInput.hasNode().value);

    localStorage.setItem("hsllock_loginData", values.join("|") );
    this.hide();
    this.doLoginChanged();
  }
});
