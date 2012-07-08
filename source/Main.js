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
      style: 'height: 93%',
      touch: true,
      onSetupItem: "setupScrollerItem"
    }
  ],

  create: function() {
    this.inherited(arguments);

    this.$.spaces.go();
  },

  spacesFetched: function( inSender ) {
    enyo.log(this.$.spaces.spaceStatuses);

    this.$.dataScroller.setCount( inSender.spaceCount);
    this.$.dataScroller.reset();
  },

  setupScrollerItem: function( inSender, inEvent ) {
    var url = this.$.spaces.directoryData[inEvent.index];
    var space = this.$.spaces.spaceStatuses[url];

    try {
      if( space.open ) {
        inSender.$.icon.setSrc( space.icon.open );
      } else {
        inSender.$.icon.setSrc( space.icon.closed );
      }

    } catch(e) {
      inSender.$.icon.setSrc( space.logo );
    }

    try {
      inSender.$.spaceName.setContent( space.space );
    } catch(e) {
      inSender.$.spaceName.setContent( "Somewhere Over t3h Rainbow" );
    }

  }
});
