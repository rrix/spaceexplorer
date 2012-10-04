/* vim: set foldmethod=marker foldlevel=0: */
enyo.kind({
  name: "HslLocks.Main",
  layoutKind: "FittableRowsLayout",

  published: {
    spaceAPIEndpoint: "http://intranet.heatsynclabs.org/~access/cgi-bin/spaceapi.rb",
    space: {}
  },

  components: [ // {{{1
    {
      kind: "HslLocks.Buttons",
      onclick: "lockGroupClick",
      name: "lockGroup"
    },
    {
      name: 'loginButton',
      kind: "onyx.Button",
      content: "Log in",
      onclick: "showPopup",
      onLoginChanged: "loadLoginData"
    },
    {
      kind: "onyx.Popup", name: "scrim", autoDismiss: false, modal: true, centered: true,
      components: [
        {tag: "h1", content: "Please Wait"}
      ]
    },
    {
      kind: "HslLocks.LoginPopup",
      name: "loginPopup",
      onLoginChanged: "loadLoginData"
    }
  ],
  // }}}1

  rendered: function() {
    this.inherited(arguments);

    this.loadLoginData();

    // Blocking timer to prevent people from busting the server jamming on
    // buttons
    this.jamLock = true;

    // This refreshes the screen every 30 seconds
    if(!this.intervalID) {
      this.intervalID = setInterval( enyo.bind(this, this.getCurrentStatus), 30000);
    }
  },

  // OAC Functionality {{{1
  // This checks our OAC login.
  validateData: function(url, username, password, callback) {
    var loginCheck = new enyo.Ajax( { url: url } );
    loginCheck.response( enyo.bind(this, function(inSender, inResponse) {
      if( inResponse.login == 'okay' ) {
        callback(true, url, username, password);
      } else {
        callback(false, url, username, password);
      }
    }));

    loginCheck.go({ cmd: "check-login", user: username, pass: password });
  },

  // This loads our login data from localStorage
  loadLoginData: function() {
    // Pull login data from HTML5 localStorage, open the popup if it doesn't
    // exist.
    this.domain = /http:\/\/((.*).(com|org|net))/.exec(this.spaceAPIEndpoint)[1];

    var loginData = localStorage.getItem("hsllock_loginData_" + this.domain);
    if(loginData) {
      loginData              = loginData.split("|");
      this.username          = loginData[0];
      this.password          = loginData[1];
      this.spaceAPIEndpoint  = loginData[2];
      this.showButtons();
    } else {
      // User is not logged in, hide the lock/unlock buttons
      this.hideButtons();
    }

    this.statusAjaxEndpoint = new enyo.Ajax({ url: this.spaceAPIEndpoint});
    this.statusAjaxEndpoint.response(this, enyo.bind(this, "loadSpaceApiResponse"));

    this.statusAjaxEndpoint.go();
  },

  loadSpaceApiResponse: function(inSender, inResponse) {
    if (inResponse.apis && inResponse.apis.oac ) {
      this.oacUrl = inResponse.apis.oac.url;
    } else {
      this.oacUrl = undefined;
    }
    this.spaceAPIData = inResponse;

    this.statusRetrieved(inSender||this, inResponse);
  },

  // FIXME: needs a better name.
  sendToLock: function() {
    this.$.scrim.show();
    this.currentStatus = this.$.lockGroup.value;
    this.lockAjaxEndpoint = new enyo.Ajax({url: this.oacUrl});
    this.lockAjaxEndpoint.go({user: this.username, pass: this.password, cmd: this.$.lockGroup.value});
    this.lockAjaxEndpoint.handleAs = "text";
    this.jamLock = false;

    // This is a band-aid, yay band-aids
    // Basically, there's a delay between when OAC unlocks and when it
    // admits it's unlocked. This will help make that less noticeable.
    setTimeout( enyo.bind(this,this.getCurrentStatus), 10000);
  },
  // }}}1

  hideButtons: function() {
    if(this.$.lockGroup) 
      this.$.lockGroup.setShowing(false);
  },

  showButtons: function() {
    if(this.$.lockGroup) 
      this.$.lockGroup.setShowing(true);
  },

  // Status retrieval {{{1
  getCurrentStatus: function() {
    // FIXME: Move this to create somehow
    this.statusAjaxEndpoint = new enyo.Ajax({ url: this.spaceAPIEndpoint});

    // FIXME BUG: This is cleared after every successful get
    this.statusAjaxEndpoint.response(this, "statusRetrieved");

    this.statusAjaxEndpoint.go();
  },

  statusRetrieved: function(inRequest, inResponse) {
    var lockStatus = inResponse.open ? "0" : "1";

    this.currentStatus = lockStatus;

    this.jamLock = true;
    this.updateColor();

    this.$.scrim.hide();
  }, // }}}1

  updateColor: function() {
    if(this.currentStatus == "1"){
      this.$.lockGroup.locked();
      this.owner.updateColor(false);
    } else {
      this.$.lockGroup.unlocked();
      this.owner.updateColor(true);
    }
  },

  lockGroupClick: function(inSender, e) {
    if( this.$.lockGroup.value == "toggle" )
    {
      this.$.lockGroup.value = "u";
      this.sendToLock();
      enyo.job(
        "toggleOff",
        enyo.bind( this, function() {
          this.$.lockGroup.value = "l";
          this.sendToLock();
        }),
        30000 );
    } else if(this.jamLock) {
      this.sendToLock();
    }
  },

  showPopup: function() {
    this.$.loginPopup.show();
  },

  setSpace: function(newdata) {
    this.loadSpaceApiResponse(undefined, newdata);
    this.inherited(arguments);
  }

});
