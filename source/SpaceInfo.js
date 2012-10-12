/* vim: set foldmethod=marker foldlevel=0: */
enyo.kind({
  name: "SpaceAPI.SpaceInfo",
  fit: true,
  layoutKind: "FittableRowsLayout",

  published: {
    space: {}
  },

  components: [ // {{{1
    {
      kind: "onyx.Toolbar",
      name: "toolbar",

      components: [
        {
          name: "toolbarText",
          style: "float: left"
        },
        {
          name: 'scrollProgress',
          kind: "onyx.RatingLevel",
          style: "height: 16px; float: right;",
          minimum:0,
          maximum: 5,
          value: 2,
          editable: false
        }
      ]
    },
    {
      name: 'containerDiv',
      kind: 'Panels',
      arrangerKind: 'CarouselArranger',
      fit: true
    },
    {
      kind: "onyx.Toolbar",
      name: "controlBar",

      components: [
        {
          name:    "returnButton",
          kind:    "onyx.Button",
          content: "Return to Space list",
          onclick: "goBack",
          style:   "float: right;",
          disabled: true
        }
      ]
    }
  ],
  // }}}1
  
  create: function() {
    this.inherited(arguments);
  },
  
  rendered: function() {
    this.inherited(arguments);
    this.update();
  },

  update: function() {
    var space = this.space;
    if( space.space ) {
      this.$.toolbarText.setContent( space.space );
      // FIXME: Re-structure this section
      if( !this.$.containerDiv.children.length ) {
        var tab0 = this.createSpaceInfoComponent(space);
        if( tab0 ) {
          this.$.containerDiv.createComponent(tab0, {owner: this});
        }

        if( space.apis ) {
          var tab1 = {
            name: "tab1",
            components: []
          };
          if(space.apis.oac) {
            tab1.components.push( {
              kind: 'HslLocks.Main',
              name: 'lockSystem',
              spaceAPIEndpoint: this.url,
              fit: true
            } );
          } if(space.apis.pamela) {
            tab1.components.push( {
              kind: 'HslLocks.PamelaStatus',
              name: 'pamela',
              url:  space.apis.pamela.url,
              fit:  true
            });
          }
          if(tab1.components.length) {
            this.$.containerDiv.createComponent(tab1, {owner: this});
            if( this.$.lockSystem ) {
              this.$.lockSystem.setSpace( space );
            }
          }
        }

        this.updateColor(space.open);
        this.$.containerDiv.render();

    console.log(this);

    this.$.bmap.setLatitude( space.lat );
    this.$.bmap.setLongitude( space.lon );
    this.$.bmap.createPushpin( space.lat, space.lon );
    this.$.bmap.setZoom( 13 );
      }
    }
  },

  createSpaceInfoComponent: function(inSpace) {
    console.log("Creating component block for:");
    console.log(inSpace);

    var component = {
      kind: 'Control',
      layoutKind: 'FittableRowsLayout',
      components: []
    };

    if(inSpace.space) { // {{{1 First row
      var innerComponent = {
        layoutKind: 'FittableColumnsLayout',
        components: [
          {
            kind: 'Image',
            src:  inSpace.logo,
            style: 'height: 75px; width:  auto'
          }
        ]
      };

      if( inSpace.open ) {
        innerComponent.components.push({
          tag: 'h2',
          fit: true,
          style: 'line-height: 75px',
          content: "We're open! :)"
        });
      } else {
        innerComponent.components.push({
          tag: 'h2',
          fit: true,
          style: 'line-height: 75px',
          content: "We're closed! :("
        });
      }

      component.components.push(innerComponent);
    } // 1}}}

    if( inSpace.lat && inSpace.lon ) { // {{{1 Mapping information
      var innerComponent2 = {
        kind: 'enyo.BingMap',
        name: 'bmap',
        latitude: inSpace.lat,
        longitde: inSpace.lon,
        zoom: 10,
        credentials: "AqLEGecLaJ9OSG5VoiKoYxzAHBqdgXU3DR3k3H_Gq-Fi4z-MESB-N-7g4q--Z0bh",
        fit: true,
        showPin: true
      };

      component.components.push(innerComponent2);
    } // 1}}}

    console.log(component);
    return component;
  },

  goBack: function() {
    this.parent.previous();
  },

  setSpace: function(data) {
    this.space = data;
    this.$.containerDiv.destroyClientControls();
    this.update();
  },

  spacesFetched: function() {
    this.$.returnButton.disabled = false;
    this.$.returnButton.hasNode().disabled = false;
  },

  /*
   * This function handles updating the UI based on the currentStatus
   */
  updateColor: function(isOpen) {
    if(!isOpen){
      this.addClass("closedSpace");
      this.removeClass("openSpace");
    } else {
      this.addClass("openSpace");
      this.removeClass("closedSpace");
    }
  }

});
