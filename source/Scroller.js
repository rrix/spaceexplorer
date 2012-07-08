enyo.kind({
  kind: "List",
  name: "SpaceAPI.Scroller",
  touch: true,

  events: {
    onSpaceSelected: ""
  },

  components: [
    {
      classes: "item",
      ontap:   "itemTapped",
      layoutKind: "FittableColumnsLayout",
      components: [
        {
          kind: "enyo.Image",
          name: "icon",
          style: "height: 100px; width: 100px"
        },
        {
          name: "spaceName",
          classes: "spaceName"
        }
      ]
    }
  ],

  created: function() {
    this.inherited(arguments);

    this.reset();
  },

  itemTapped: function( inSender ) {
    enyo.log( inSender);
  }

});
