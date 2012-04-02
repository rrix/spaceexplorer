enyo.kind( {
  kind: "enyo.Component",
  name: "HslLocks.PamelaStatus",

  components: [
    { kind: "h1",
      content: "Who's in the Space?" },
    { kind: "div",
      name: "peopleDiv" }
  ],

  create: function() {
    this.inherited(arguments);

    this.pamelaAjax = new enyo.Ajax( { url: "http://172.22.110.17/data.php" } );
    this.updateFromPamela();
  }

  updateFromPamela: function() {
    this.pamelaAjax.response( enyo.bind(this, this.updateResponse) );
    this.pamelaAjax.go();
  }

  updateResponse: function(inResponse, inRequest) {
    enyo.log(inResponse);
  }

} );
