define([
    'jquery', 'underscore', 'backbone', 'tilejs',
    'templates/itemsTemplates'
], function($, _, Backbone, tilejs, _tpl){

    'use strict';

    var Tile = Backbone.View.extend({
        // tagName: "", 
        events: {
          "click": "click"
        },
        t:undefined,
        initialize: function () {
            this.template = _.template(_tpl[this.model.get('source_service')]);
        },

        click:function() {
            this.$el.toggleClass("active")
        },

        getTile:function() {
            if (this.t == undefined) {
                this.t = new Tiles.Tile(this.id, this.render());
            }
            return this.t;
        },
        render: function(){
            console.log(this.model.toJSON())
            var that = this;
            return this.template(this.model.toJSON())
        }
	});

    return Tile;

});
