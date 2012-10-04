enyo.kind( {
  kind:  "enyo.Control",
  name:  "HslLocks.PamelaStatus",
  style: "text-align: center",

  published: {
    url: ""
  },

  components: [
    {
      tag: "h1",
      content: "Who's in the Space?",
      style: 'text-align: center;color: white'
    },
    {
      kind:  "Scroller",
      name:  "pamelaScroller",
      touch: true,
      thumb: true,
      components: [
        {
          name: "peopleList",
          style: "height: 100%"
        }
      ]
    }
  ],

  create: function() {
    this.inherited(arguments);

    this.urlChanged();
  },

  urlChanged: function() {
    this.inherited(arguments);
    if( this.url && this.url.length ) {
      this.pamelaItems = [];

      this.pamelaAjax = new enyo.Ajax( { url: this.url } );
      this.updateFromPamela();
      setInterval( enyo.bind(this, this.updateFromPamela), 30000 );

      this.rebuild();
    }
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
    if( this.controls.length > 0 && this.pamelaItems ) {
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
  }
});
