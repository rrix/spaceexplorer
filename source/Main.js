enyo.kind({
  name: "SpaceAPI.Main",
  fit: true,
  components:[
    {
      kind: "SpaceAPI.Spaces",
      name: "spaces",
      onSpacesFetched: "spacesFetched"
    }
  ],

  create: function() {
    this.inherited(arguments);

    this.$.spaces.go();
  },

  spacesFetched: function( inSender ) {
    enyo.log(this.$.spaces.spaceStatuses);
  }
});
