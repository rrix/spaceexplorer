enyo.kind({
  kind: "enyo.Component",
  name: "SpaceAPI.Spaces",

  published: {
    directory: "http://openspace.slopjong.de/directory.json",
    directoryData: {},
    state:    "idle",
    spaceStatuses: {},
    spaceCount: 0
  },

  events: {
    onDirectoryFetched: "",
    onSpaceFetched: "",
    onSpacesFetched: "",
    onFetchError: ""
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
    this.directoryData = inResponse;

    this.doDirectoryFetched( inResponse );
    this.fetchSpaces( inResponse );
  },

  directoryFetchFailure: function( inSender, inResponse ) {
    this.state = "directoryFetchFailed";
    doFetchError();
  },

  fetchSpaces: function( directoryJson ) {
    delete directoryJson['originator'];

    // FIXME: http://stackoverflow.com/questions/5223/length-of-javascript-object-ie-associative-array
    var size = function(obj) {
      var size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };

    this.spaceCount = size(directoryJson);

    this.state = "spacesFetch";

    for( space in directoryJson ) {
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

      spaceFetch.response( this, "spaceFetched"      );
      spaceFetch.error(    this, "spaceFetchFailure" );
      spaceFetch.go();
    }
  },

  spaceFetched: function( inSender, inResponse ) {
    var fail = false;

    if( typeof(inResponse) == "object" ) {
      this.spaceStatuses[inSender.url] = inResponse;
      this.doSpaceFetched({url: inSender.url, response: inResponse});
    } else {
      fail = true;
    }

    this.fetchedSpaceCount++;
    if( this.fetchedSpaceCount == this.spaceCount ) {
      this.state = "spacesFetched";
      this.doSpacesFetched();
    }

    if(fail) {
      inSender.fail(inResponse);
    }
  },

  spaceFetchFailure: function(inSender, inResponse) {
    this.spaceStatuses[inSender.url] = {error: "Fetch returned undefined"};
    this.doFetchError(inSender, inSender.url);
  }
});
