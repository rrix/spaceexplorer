enyo.kind({
  name: "SpaceAPI.Main",
  kind: "FittableRows",
  classes: "enyo-fit",

  components:[
    {
      kind: "SpaceAPI.Spaces",
      name: "spaces",
      onSpacesFetched: "spacesFetched"
    },
    {
      kind: "onyx.Toolbar",
      content: "SpaceAPI Explorer",
      style: 'height: 7%'
    },
    {
      kind: "SpaceAPI.Scroller",
      name: "dataScroller",
      style: 'height: 93%'
    }
  ],

  create: function() {
    this.inherited(arguments);

    //this.$.spaces.go();
  },

  spacesFetched: function( inSender ) {
    enyo.log(this.$.spaces.spaceStatuses);
  }
});
