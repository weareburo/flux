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
            if (this.model.get('source_service') == null) false;

            this.model.on('change', this.change, this);

//            this.template = _.template(_tpl[this.model.get('source_service')]);
            this.template = _.template(_tpl['item']);
        },
        change:function() {
            this.$el.toggleClass("active");
            if (this.model.get('open') && this.model.get('type') == 'video') {
                setTimeout($.proxy(this.video, this), 1000);
            }
            if (!this.model.get('open') && this.model.get('type') == 'video') {
                setTimeout($.proxy(this.closeVideo, this), 1000);
            }
            
        },
        video:function () {
            console.log($(this.el).html())
            var $content = this.$el.find('.content');
            $content.find('img').replaceWith('<iframe id="video" title="" width="'+$content.data('width')+'" height="'+$content.data('height')+'" src="'+$content.data('video')+'" frameborder="0" allowfullscreen></iframe>');
        },
        closeVideo:function () {
            var $content = this.$el.find('.content');
            $content.find('iframe').replaceWith('<img width="'+$content.data('width')+'" height="'+$content.data('height')+'" src="'+$content.data('img')+'" />');
        },

        getTile:function() {
            if (this.t == undefined) {
                this.el = this.render();
                this.t = new Tiles.Tile(this.id, this.el);
                this.$el = this.t.$el;
            }
            return this.t;
        },
        render: function(){
            
            var tmb = this.model.get("thumbnail");
            tmb.w = 250;
            tmb.h = 250;
            this.model.set("thumbnail", tmb);

            // this.model.set('tumbnail.w', 100);
            // this.model.set('tumbnail.h', 100);            
            return this.template(this.model.toJSON());
        }
	});

    return Tile;

});
