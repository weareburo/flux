define([
  'jquery', 'underscore', 'backbone',
  'models/Item'
], function($, _, Backbone, Item){
  var ItemsCollection = Backbone.Collection.extend({
      model: Item,
      initialize : function(models, options) {
//          this.fetch();
      },
      url : '/feed'
  });
  return ItemsCollection;
});