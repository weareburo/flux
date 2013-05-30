define([
  'jquery', 'underscore', 'backbone', 'tilejs',
  'views/tile',
  'models/Item', 'models/GridTemplate', 
  'collections/Items'
  
], function($, _, Backbone, tilejs, 
    Tile, 
    ItemModel, GridTemplate, 
    ItemsCollection){

  var Grid = Backbone.View.extend({

    el: "#page",
    _isRendered:false,
    _isFetching:true,
    events: {
        'click .grid section':'toggleItem',
        'scroll #grid': 'loadMore',

    },

    loadMore:function () {
        console.log('loadMore');
    },

    setTemplate:function(e) {
        $('.layoutTpl li.active').removeClass('active');
        $(e.currentTarget).addClass('active');
        this.drawGrid();
    },
    initialize:function() {

        $("body").on('click', ".grid section", $.proxy(this.toggleItem, this));
        $(window).on('scroll', ".grid", $.proxy(this.onScrollHandler, this));
        $("#grid").on( "scroll", $.proxy(this.onScrollHandler, this));
        
        var updateLayout = _.debounce($.proxy(this.debounce, this), 500);
        window.addEventListener("resize", updateLayout, false);

        // 
        this.collection = new ItemsCollection();
        this.gridTpl = new GridTemplate();
        
        this.setUpGrid();
        
        
        this.listenTo(this.collection, 'add', this.addOne);
//        this.listenTo(this.collection, 'reset', this.addOne);
        this.listenTo(this.collection, 'sync', this.render);
        this.collection.fetch();// .done($.proxy(this.onFetch, this));
        
//        this.collection.fetch({ success : $.proxy(this.render, this), dataType: "jsonp" });
//        this.render();
        
//        $(document).on('keydown', this.keydown);
//        $(document).on('keyup', this.keyup);
    },
    addOne:function(e) {
//        if (e == 'sync') this.render();
        console.log('add one ' + e);
    },
    reset:function(e) {
        console.log('reset ' + e);
    },
    keyup:function() {
        var next = $('.expanded').next();
        next.trigger('click');
        // $('.grid').removeClass('expanded')
        
    },
    setUpGrid:function() {
        var el = document.getElementById('grid');
        this.grid = new Tiles.Grid(el);
        this.grid.resizeColumns = function() {
            return this.template.numCols;
        };
        this.grid.createTile = $.proxy(this.createTile, this);
//            var tile = new Tiles.Tile(tileId, $('#grid>section:eq('+Number(tileId-1)+')'));
    },
    createTile:function (tileId) {
        var model = this.collection.at(tileId);

        var tile = new Tile({id:tileId, model:model});
        return tile.getTile();
    },
    toggleItem:function(e) {
        
        if ($(e.currentTarget).hasClass('open')) {
            $('.grid').removeClass('expanded')
            $(e.currentTarget).removeClass('expanded')
            $(e.currentTarget)
                .removeClass('open')
                .attr('style', $(e.currentTarget).data('style'))
        } else {
            $('.grid').addClass('expanded');
            $(e.currentTarget).addClass('expanded') 
            $(e.currentTarget)
                .data('style', $(e.currentTarget).attr('style'))
                .addClass('open')
                .css({
                    height:$('body').innerHeight()-50,
                    width:'100%',
                    left:'0',
                    top:$('.grid').scrollTop(),
                    zIndex:10
                });
        }
        
//        $('.item.open').removeClass('open');
    },
    
    onScrollHandler: function(e) {
        if (this._isFetching) return;
        var $g =  $('#grid')
        if (($g.get(0).scrollHeight - $g.scrollTop())<=  $g.height()) {
            this.isFetching = true;
            this.collection.fetch({update: true, remove: false});
        }
    },
    render: function(){
        if (!this._isRendered) this.drawGrid();
        else this.updateGrid();
    }, 
    debounce:function () {
        this.grid.resize();
        this.grid.redraw(true);
    },
    updateGrid:function() {
        var list = [];
        for (var i = 0; i <=this.collection.length-1; i++) {
            list.push(i);
        }
        this.grid.updateTiles(list);
        this.grid.redraw(true);
        this._isFetching = false;
    },
    drawGrid:function() {        
//        var tpl = this.gridTpl.get('template')[$('.layoutTpl li.active').index()];
        var tpl = this.gridTpl.get('template')[0];
        this.grid.template = Tiles.Template.fromJSON(tpl);
        this.grid.isDirty = true;
        this.grid.resize();
        this.updateGrid();
        this._isRendered = true;
    }
  });

  return Grid;

});