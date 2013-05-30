// // Filename: router.js
// define([
//   'jquery',
//   'underscore',
//   'backbone',
//   'models/item/ItemModel',
//   'collections/items/ItemsCollection',
// 
//   'views/home/HomeView',
//   'views/footer/FooterView'
// ], function($, _, Backbone, ItemModel, ItemsCollection, HomeView, FooterView) {
//   
//   var AppRouter = Backbone.Router.extend({
//     routes: {
//       // Default
//       '*actions': 'home'
//     }
//   });
//   
//   var initialize = function(){
// 
//     var app_router = new AppRouter;
//     app_router.on('route:home', function (actions) {
//         var homeView = new HomeView();
//        // homeView.render();
//     });
//     var footerView = new FooterView();
// 
//     Backbone.history.start();
//   };
//   return { 
//     initialize: initialize
//   };
// });
// 
// 
// 
// 
define([
  // Application.
  "app"
],

function(app) {
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },
    index: function() {
        
    }
  });

  return Router;

});
