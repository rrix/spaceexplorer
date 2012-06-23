enyo.kind( {
  kind: "enyo.Control",
  name: "HslLocks.PamelaStatus",
  style: "text-align: center",
  published: {
    url: "http://172.22.110.17/data.php"
  }

  components: [
    { kind: "enyo.Scroller",
      components: [
        { tag: "h1",
          content: "Who's in the Space?" },
        { tag: "div",
          name: "peopleUl" }
      ]
    }
  ],

  create: function() {
    this.inherited(arguments);

    this.pamelaItems = [];

    this.pamelaAjax = new enyo.Ajax( { url: this.url } );
    this.updateFromPamela();
  },

  updateFromPamela: function() {
    this.pamelaAjax.response( enyo.bind(this, this.updateResponse) );
    this.pamelaAjax.go();
  },

  updateResponse: function(inRequest, inResponse) {
    this.rebuild(inResponse);
  },

  rebuild: function( data ) {
    this.$.peopleUl.destroyComponents();

    if( !data ) {
      this.pamelaItems[i] = this.$.peopleUl.createComponent({tag: "p", content: "No one... :("} );
    } else {
      for( var i = 0; i < data.length; i++) {
        if( !/^\./.exec(data[i]) ) {
          this.pamelaItems[i] = this.$.peopleUl.createComponent({tag: "p", content: data[i]} );
        }
      }
    }

    this.fit = true;
    this.render();
    setTimeout( enyo.bind(this, this.updateFromPamela), 30000 );
  }
});
