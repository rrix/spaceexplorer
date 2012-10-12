/* vim: set foldmethod=marker foldlevel=0: */
enyo.kind({
  name: "SpaceAPI.Main",
  kind: "FittableRows",
  classes: "enyo-fit",

  published: {
    lastSpace: ""
  },

  components:[ // {{{1
    {
      kind: "Signals"
    },
    {
      kind: "SpaceAPI.Spaces",
      name: "spaces",
      onSpacesFetched: "spacesFetched"
    },
    {
      name: "geolocation",
      kind: "rok.geolocation",
      watch: false,
      timeout: 30000,
      maximumAge: 3000,
      enableHighAccuracy: false,
      onSuccess: "locationFetched",
      onError: "locationFetchFailed"
    },
    {
      kind: "Panels",
      name: "panel",
      style: 'height: 100%',
      arrangerKind: "PushPopArranger",
      layoutKind: "FittableRowsLayout",
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
          name: "spaceInfo",
          style: "height: 100%"
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
  // }}}1

  create: function() {
    this.inherited(arguments);
    this.lastSpace = localStorage.getItem("lastSpace");
    if (this.lastSpace) {
      this.careAboutFetch = true;
      this.fetchAndOpenSpace(this.lastSpace);
      setTimeout(enyo.bind(this.$.spaces, this.$.spaces.go), 3000); // Load main area after 10 seconds
    } else {
      this.$.spaces.go();
    }
  },

  // Geolocation {{{1
  locationFetched: function(inSender, inPosition) {
    this.coords = {x: inPosition.coords.latitude,
                   y: inPosition.coords.longitude};

    this.geolocated = true;
  },

  locationFetchFailed: function(inSender, inError) {
    enyo.log(inError.message);
    this.coords = {x: 0, y: 0};
    this.geolocated = true;
  },
  // }}}1 

  // Sorting and setting up scroller list {{{1
  spacesFetched: function( inSender ) {
    if( this.geolocated ) {
      this.$.spaces.sort( enyo.bind(this, function(a,b) {
        try {
          aToC = this.distanceFormula({x: a.lat, y: a.lon},
                                      {x: this.coords.x, y: this.coords.y});
          bToC = this.distanceFormula({x: this.coords.x, y: this.coords.y},
                                      {x: b.lat, y: b.lon});

          if(bToC > aToC)
            return -1;
          if(bToC < aToC)
            return 1;

        } catch(e) {
          return 0;
        }
      } ));

      this.$.loadingScrim.addStyles("display: none");

      this.$.dataScroller.setCount( this.$.spaces.spaceCount);
      this.$.dataScroller.reset();

      this.$.spaceInfo.spacesFetched();

    } else {
      // We don't have a location yet, wait 1 second and fire again
      setTimeout(enyo.bind(this, "spacesFetched"), 1000);
    }
  },

  distanceFormula: function(a,b) {
    return Math.sqrt( Math.pow((a.x-b.x),2) + Math.pow((a.y-b.y),2));
  },

  setupScrollerItem: function( inSender, inEvent ) {
    var url = this.$.spaces.directoryData[inEvent.index];
    var space = this.$.spaces.spaceStatuses[url];

    if( space ) {
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
        console.log(e);
        if(space.logo) {
          inSender.$.icon.setSrc( space.logo );
        }
      }

      inSender.$.spaceName.setContent( space.space );

      inSender.$.item.space = space;
    }
  },
  // }}}1

  spaceSelected: function(inSender, inEvent) {
    var url = this.$.spaces.directoryData[inEvent.index];
    var space = this.$.spaces.spaceStatuses[url];

    this.openSpace(null, {response: space, url: url});
  },

  fetchAndOpenSpace: function( space ) {
    this.$.spaces.onSpaceFetched = "openSpace";
    this.fetch =true;

    this.$.spaces.fetchSpace( space );
  },

  openSpace: function(sender, data ){
    if(this.fetch || sender != this.$.spaces) {
      var space = data.response;
      var url   = data.url;

      this.$.loadingScrim.addStyles("display: none");
      this.$.spaceInfo.url = url;
      this.$.spaceInfo.setSpace( space );
      this.$.spaceInfo.update();
      this.setLastSpace(url);

      this.$.panel.next();
      this.$.spaces.onSpaceFetched = "";
      this.fetch = false;
    }
  },

  setLastSpace: function(newSpace) {
    localStorage.setItem("lastSpace", newSpace);
    this.inherited(arguments);
  }
});
