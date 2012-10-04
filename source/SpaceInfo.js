/* vim: set foldmethod=marker foldlevel=0: */
enyo.kind({
  name: "SpaceAPI.SpaceInfo",
  fit: true,
  layoutKind: "FittableRowsLayout",

  published: {
    space: {}
  },

  components: [ // {{{1
    {
      kind: "onyx.Toolbar",
      name: "toolbar",

      components: [
        {
          name: "toolbarText"
        }
      ]
    },
    {
      name: 'containerDiv'
    },
    {
      kind: "onyx.Toolbar",
      name: "controlBar",

      components: [
        {
          name:    "returnButton",
          kind:    "onyx.Button",
          content: "Return to Space list",
          onclick: "goBack",
          style:   "float: right;"
        }
      ]
    }
  ],
  // }}}1
  
  rendered: function() {
    this.inherited(arguments);
    this.update();
  },

  update: function() {
    var space = this.space;
    if( space.space ) {
      this.$.toolbarText.setContent( space.space );
      if(!this.$.containerDiv.children.length && space.apis) {
        if(space.apis.oac) {
          this.$.containerDiv.createComponent( {
            kind: 'HslLocks.Main',
            name: 'lockSystem',
            spaceAPIEndpoint: this.url,
            fit: true
          }, {owner: this});
          this.$.lockSystem.setSpace( space );
        } if(space.apis.pamela) {
          this.$.containerDiv.createComponent( {
            kind: 'HslLocks.PamelaStatus',
            name: 'pamela',
            url:  space.apis.pamela.url
          }, {owner: this});
        }
      }

      this.updateColor(space.open);
      this.$.containerDiv.render();
    }
  },

  goBack: function() {
    this.parent.previous();
  },

  setSpace: function(data) {
    this.space = data;
    this.$.containerDiv.destroyClientControls();
    this.update();
  },

  /*
   * This function handles updating the UI based on the currentStatus
   */
  updateColor: function(isOpen) {
    if(!isOpen){
      this.addClass("closedSpace");
      this.removeClass("openSpace");
    } else {
      this.addClass("openSpace");
      this.removeClass("closedSpace");
    }
  }

});
