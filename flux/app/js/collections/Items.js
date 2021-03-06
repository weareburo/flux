define([
  'jquery', 'underscore', 'backbone',
  'models/Item'
], function($, _, Backbone, Item){
  var ItemsCollection = Backbone.Collection.extend({
      model: Item,
      total:0,
      page:0,
      initialize : function(models, options) {
//          this.fetch();
      },
      parse:function(res) {
          console.log(res.data);
          this.total = res.count;
          this.limit = res.limit;
          this.page++;
          if(this.total/this.page < this.limit) this.page=0;
          return res.data;
      },
      url : function() {
          return '/feed?page='+this.page;
      }
  });
  return ItemsCollection;
});