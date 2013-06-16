define([
  'underscore',
  'backbone',
  'libs/singly'
], function(_, Backbone) {
  
  var ItemModel = Backbone.Model.extend({
      initialize : function(models, options) {
          
      },
      defaults: {
          open: false, // OK
          date: null, // OK
          dateFormat: null,
          author: { // OK
            name: null,
            id: null,
            url: null,
            photo: null,
          },
          recipients: null,
          title: '',
          message: null, // OK
          tags: null,
          picture: {
            url: null,
            height: null,
            width: null
          },
          thumbnail: {
            url: null,
            height: null,
            width: null,
            w:100,
            h:100
          },
          link: {
            url: null,
            title: null,
            description: null
          },
          type: null,
          popularity: null,
          source_service: null        
        }
  });
  return ItemModel;

});
