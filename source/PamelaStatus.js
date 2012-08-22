enyo.kind( {
  kind:  "enyo.Control",
  name:  "HslLocks.PamelaStatus",
  classes: 'enyo-fit',
  style: "text-align: center; margin-top: 140px; margin-bottom: 35px;",

  published: {
    url: "http://heatsynclabs.org:1337/data.php"
  },

  components: [
    {
      kind:  "Scroller",
      name:  "pamelaScroller",
      classes: 'enyo-fit',
      touch: true,
      thumb: true,
      components: [
        {
          name: "peopleList"
        }
      ]
    }
  ],

  create: function() {
    this.inherited(arguments);

    this.pamelaItems = [];

    this.pamelaAjax = new enyo.Ajax( { url: this.url } );
    this.updateFromPamela();
    setInterval( enyo.bind(this, this.updateFromPamela), 30000 );
  },

  urlChanged: function() {
    this.inherited(arguments);
    this.rebuild();
  },

  updateFromPamela: function() {
    this.pamelaAjax.response( enyo.bind(this,
      function(inRequest, inResponse) {
        this.rebuild(inResponse);
      }
    ));
    this.pamelaAjax.go();
  },

  rebuild: function( data ) {
    this.$.peopleList.destroyComponents();

    if( !data ) {
      this.pamelaItems[i] = this.$.peopleList.createComponent({content: "No one... :("} );
    } else {
      for( var i = 0; i < data.length; i++) {
        if( !/^\./.exec(data[i]) ) {
          this.pamelaItems.push( this.$.peopleList.createComponent({content: data[i]} ) );
        }
      }
    }

    this.render();
  }
});
