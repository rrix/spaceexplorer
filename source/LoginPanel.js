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
      content: "If you need a login to the HeatSyncLabs system, please contact @rrrrrrrix. Leave Server URL blank unless you know what you're doing."
    },
    {
      name: "errorDiv",
      style: "color: red;"
    },
    {
      style: "width: 95%",
      kind: "onyx.InputDecorator",
      components: [
        {
          style: "width: 100%",
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
          style: "width: 100%",
          kind: "onyx.Input",
          name: "passwordInput",
          placeholder: "Password",
          attributes: { type: "password" }
        }
      ]
    },
    {
      style: "width: 95%",
      kind: "onyx.InputDecorator",
      components: [
        {
          style: "width: 100%",
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
      onclick: "checkLogin"
    }
  ],

  events: {
    onLoginChanged: ""
  },

  checkLogin: function(inSender) {
    // Possibly insert default
    if( !this.$.urlInput.hasNode().value ) {
      this.$.urlInput.hasNode().value =  "http://intranet.heatsynclabs.org/~access/cgi-bin/spaceapi.rb";
    }

    var user = this.$.userInput.hasNode().value;
    var password = this.$.passwordInput.hasNode().value;
    var url = this.$.urlInput.hasNode().value;

    this.$.errorDiv.setContent("Logging in...");
    this.parent.validateData(url, user, password, enyo.bind(this, this.saveData));
  },

  saveData: function(usernameCorrect, url, username, password) {

    if(!usernameCorrect) {
      this.$.errorDiv.setContent("Login failed, try again!");
    } else {
      values = [];
      values.push(username);
      values.push(password);
      values.push(url);

      localStorage.setItem("hsllock_loginData", values.join("|") );
      this.hide();
      this.doLoginChanged();
    }
  }
});
