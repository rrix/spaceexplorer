enyo.kind({
  kind: "enyo.Component",
  name: "SpaceAPI.Spaces",

  published: {
    directory: "http://chasmcity.sonologic.nl/spacestatusdirectory.php",
  },

  events: {
    onSpaceFetched: "",
    onSpacesFetched: ""
  },

  go: function() {
  }
}
