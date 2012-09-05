enyo.kind({
  name: "SpaceAPI.SpaceInfo",
  fit: true,
  layoutKind: "FittableRowsLayout",

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
    if( space ) {
      this.$.toolbarText.setContent( space.space );
    }
    this.inherited(arguments);
  },

  goBack: function() {
    this.parent.previous();
  }

});
