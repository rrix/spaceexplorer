enyo.kind( {
  name: "HslLocks.LoginPopup",
  kind: "onyx.Popup",
  centered: true,
  fit: true,
  scrim: true,
  floating: true,
  classes: "loginPopup",

  components: [
    {
      content: "If you need a login to the HeatSyncLabs system, please contact @rrrrrrrix."
    },
    {
      style: "width: 95%",
      kind: "onyx.InputDecorator",
      components: [
        {
          fit: true,
          kind: "onyx.Input",
          name: "userInput",
          placeholder: "Username"
        }
      ]
    },
    {
      style: "width: 95%",
      kind: "onyx.InputDecorator",
      components: [
        {
          fit: true,
          kind: "onyx.Input",
          name: "passwordInput",
          placeholder: "Password"
        }
      ]
    },
    {
      style: "width: 95%",
      kind: "onyx.InputDecorator",
      components: [
        {
          fit: true,
          kind: "onyx.Input",
          name: "urlInput",
          placeholder: "Server URL"
        }
      ]
    },
    {
      kind: "onyx.Button",
      style: "width: 100%",
      content: "Save",
      onclick: "saveData"
    }
  ],

  events: {
    onLoginChanged: ""
  },

  saveData: function() {
    enyo.log("clicK");
    values = [];
    values.push(this.$.userInput.hasNode().value);
    values.push(this.$.passwordInput.hasNode().value);
    values.push(this.$.urlInput.hasNode().value);

    localStorage.setItem("hsllock_loginData", values.join("|") );
    this.hide();
    this.doLoginChanged();
  }
});
