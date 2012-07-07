enyo.kind({
  kind:    "List",
  name:    "SpaceAPI.Scroller",

  onSetupItem: "setupItem",
  count: 100,
  components: [
    {
      classes: "item",
      ontap:   "itemTapped",
      components: [
        {
          content: "Item"
        }
      ]
    }
  ]
});
