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
      kind: 'HslLocks.Main',
      name: 'lockSystem',
      spaceAPIEndpoint: this.url,
      fit: true
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

  update: function() {
    var space = this.space;
    if( space.space ) {
      console.log();
      this.$.toolbarText.setContent( space.space );
      this.$.lockSystem.spaceAPIEndpoint = this.url;
      this.$.lockSystem.setSpace( space );
      this.$.lockSystem.render();
    }
    this.inherited(arguments);
  },

  goBack: function() {
    this.parent.previous();
  },

  setSpace: function(data) {
    this.space = data;
    this.update();
  }

});
