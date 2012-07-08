enyo.kind({
  name: "SpaceAPI.Main",
  kind: "FittableRows",
  classes: "enyo-fit",

  components:[
    {
      kind: "Signals"
    },
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
      kind: "Panels",
      name: "panel",
      style: 'height: 93%',
      arrangerKind: "PageSpinArranger",
      components: [
        {
          kind: "SpaceAPI.Scroller",
          name: "dataScroller",
          onSetupItem: "setupScrollerItem",
          onSpaceSelected: "spaceSelected",
          style: 'height: 100%'
        },
        {
          kind: "SpaceAPI.SpaceInfo",
          name: "spaceInfo"
        }
      ]
    },
    {
      name: "loadingScrim",
      style: "background: black; opacity: 0.5",
      classes: "enyo-fit",
      components: [
        {
          name: "loadingSpinner",
          kind: 'jmtk.Spinner',
          color: "#ffffff",
          diameter: 190,
          shape: "spiral",
          style: "margin: auto auto"
        }
      ]
    }
  ],

  create: function() {
    this.inherited(arguments);

    this.$.spaces.go();
  },

  spacesFetched: function( inSender ) {
    enyo.log(this.$.spaces.spaceStatuses);

    this.$.loadingScrim.addStyles("display: none");

    this.$.dataScroller.setCount( inSender.spaceCount);
    this.$.dataScroller.reset();
  },

  setupScrollerItem: function( inSender, inEvent ) {
    var url = this.$.spaces.directoryData[inEvent.index];
    var space = this.$.spaces.spaceStatuses[url];

    try {
      if( space.open ) {
        inSender.$.item.addClass( "openSpace" );
        inSender.$.item.removeClass( "closedSpace" );
        inSender.$.icon.setSrc( space.icon.open );
      } else {
        inSender.$.item.addClass("closedSpace");
        inSender.$.item.removeClass( "openSpace" );
        inSender.$.icon.setSrc( space.icon.closed );
      }
    } catch(e) {
      inSender.$.icon.setSrc( space.logo );
    }

    inSender.$.spaceName.setContent( space.space );

    inSender.$.item.space = space;
  },

  spaceSelected: function(inSender, inEvent) {
    var url = this.$.spaces.directoryData[inEvent.index];
    var space = this.$.spaces.spaceStatuses[url];

    this.$.spaceInfo.space = space;
    this.$.spaceInfo.update();
    this.$.panel.next();
  }
});
