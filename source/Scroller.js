enyo.kind({
  kind: "List",
  name: "SpaceAPI.Scroller",

  events: {
    onSpaceSelected: ""
  },

  components: [
    {
      name: "item",
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
          fit:  true,
          classes: "spaceName"
        }
      ]
    }
  ],

  created: function() {
    this.inherited(arguments);

    this.reset();
  },

  itemTapped: function( inSender, inEvent ) {
    this.doSpaceSelected(inEvent);
  }

});
