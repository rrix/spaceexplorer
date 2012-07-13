enyo.kind({
  name: "SpaceAPI.SpaceInfo",
  layoutKind: "FittableRowsLayout",

  components: [
    {
      kind: "onyx.Toolbar",
      name: "toolbar",

      components: [
        {
          name: "toolbarText"
        }
      ]
    },
    {
      layoutKind: "FittableColumnsLayout",
      fit:true,

      components: [
        {
          kind: "BingMap",
          name: "bmap",
          showPin: true,
          fit:  true,
          credentials: "AqLEGecLaJ9OSG5VoiKoYxzAHBqdgXU3DR3k3H_Gq-Fi4z-MESB-N-7g4q--Z0bh"
        },
        {
          style: "width: 50%",
          components: [
            {
              name: "spaceName"
            },
            {
              tag: 'a',
              name: "twitterHandle",
              attributes: {href: "http://twitter.com/"}
            },
            {
              name: "status"
            }
          ]
        }
      ]
    },
    {
      kind: "onyx.Toolbar",
      name: "controlBar",

      components: [
        {
          name:    "returnButton",
          kind:    "onyx.Button",
          content: "Return",
          onclick: "goBack",
          style:   "float: right;"
        }
      ]
    }
  ],

  update: function() {
    var space = this.space;
    if( space ) {
      this.$.bmap.setLatitude( space.lat );
      this.$.bmap.setLongitude( space.lon );
      this.$.bmap.createPushpin( space.lat, space.lon );
      this.$.bmap.setZoom( 13 );

      this.$.spaceName.setContent( space.space );
      this.$.status.setContent( space.status );

      this.$.twitterHandle.attributes.href =  "http://twitter.com/" + space.contact.twitter;
      this.$.twitterHandle.setContent( space.contact.twitter );
      this.$.twitterHandle.render();

      this.$.toolbarText.setContent( space.space );
    }
    this.inherited(arguments);
  },

  goBack: function() {
    this.parent.previous();
  }

});
