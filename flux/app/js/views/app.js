define([
    'jquery', 'underscore', 'backbone',
    'views/grid',
    'views/menu'
], function($, _, Backbone, Grid, Menu){

    'use strict';
    var App = Backbone.View.extend({
	    el: '#main',
        initialize: function () {

            var menu = new Menu();
            var grid = new Grid(); // this could be encapsulated in a larger view later on //
        }
	});

  return App;

});
