define([
    'jquery', 'underscore', 'backbone',
    'views/home/HomeView',
    'views/menu'
], function($, _, Backbone, Home, Menu){

    'use strict';
    var Menu = Backbone.View.extend({
	    el: '#nav',
        events: {
          "click": "click"
        },

        initialize: function () {
        },
        click:function() {
            this.$el.toggleClass("active")
        }
	});

  return Menu;

});
