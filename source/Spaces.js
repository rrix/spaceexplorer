enyo.kind({
  kind: "enyo.Component",
  name: "SpaceAPI.Spaces",

  published: {
    directory: "http://openspace.slopjong.de/directory.json",
    directoryData: [],
    spaceCount: 0,
    spaceStatuses: {},
    state:    "idle"
  },

  events: {
    onDirectoryFetched: "",
    onFetchError: "",
    onSpaceFetched: "",
    onSpacesFetched: ""
  },

  fetchedSpaceCount: 0,

  go: function() {
    var directoryFetch = new enyo.Ajax( { url: this.directory } );
    directoryFetch.go();
    this.state = "directoryFetch";

    directoryFetch.response( this, "directoryFetched"      );
    directoryFetch.error(    this, "directoryFetchFailure" );
  },

  directoryFetched: function( inSender, inResponse ) {
    this.state = "directoryFetched";
    this.directoryData = [];

    for( var idx in inResponse ) {
      this.directoryData.push(inResponse[idx]);
    }

    this.doDirectoryFetched( inResponse );
    this.fetchSpaces( inResponse );
  },

  directoryFetchFailure: function( inSender, inResponse ) {
    this.state = "directoryFetchFailed";
    doFetchError();
  },

  size: function() {
    return this.directoryData.length;
  },

  fetchSpaces: function( directoryJson ) {
    delete directoryJson.originator;

    this.spaceCount = this.size();

    this.state = "spacesFetch";

    for( var space in directoryJson ) {
      // Filter originator being added to emitted events
      var url = directoryJson[space];
      if( typeof( url ) == "string" ) {
        // FIXME: techinc has a bad SSL cert
        if( url.match(/techinc.nl/) )
        {
          url.replace("https", "http");
          directoryJson[url] = directoryJson[space];
          delete directoryJson[space];
        }
        this.fetchSpace( url );
      }
    }
  },

  fetchSpace: function( spaceURL ) {
    if( typeof( spaceURL ) == "string") {
      var spaceFetch = new enyo.Ajax( { url: spaceURL } );
      this.state = "spaceFetch";

      spaceFetch.response(  this, "spaceFetched" );
      spaceFetch.error( this, "spaceFetchFailed" );
      spaceFetch.go();
    }
  },

  spaceFetched: function( inSender, inResponse ) {
    var fail = false;

    if( typeof(inResponse) == "object" ) {
      this.spaceStatuses[inSender.url] = inResponse;
      this.doSpaceFetched({url: inSender.url, response: inResponse});

      this.fetchedSpaceCount++;
      enyo.log( "Fetched " + inSender.url);
      enyo.log( this.size() );
    } else {
      this.spaceFetchFailed(inSender);
    }

    if( this.fetchedSpaceCount == this.spaceCount ) {
      this.state = "spacesFetched";
      this.doSpacesFetched();
    }
  },

  spaceFetchFailed: function(inSender) {
    enyo.log( "Failed to fetch " + inSender.url);

    var idx = this.directoryData.indexOf(inSender.url);
    this.directoryData.splice(idx, 1);
    this.spaceCount = this.size();

    this.doFetchError(inSender, inSender.url);

    if( this.fetchedSpaceCount == this.spaceCount ) {
      this.state = "spacesFetched";
      this.doSpacesFetched();
    }
  }
});
