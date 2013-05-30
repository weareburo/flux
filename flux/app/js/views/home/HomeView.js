define([
  'jquery', 'underscore', 'backbone',
  'tilejs',
  'models/Item', 'collections/Items'
  
], function($, _, Backbone, tilejs, 
    ItemModel, ItemsCollection){

  var HomeView = Backbone.View.extend({
    el: $("#page"),
    // events:{
    //   "click .item"   : "toggleItem",
    //   "click .layoutTpl li"   : "setTemplate",
    //   'scroll .grid': function() {
    //       console.log('scrolling!');
    //   }
    // },
    gridTpl : [
        [
            " A A A . . . ",
            " A A A B B . ",
            " C C . B B . ",
            " . D D . E E ",
            " . D D F F . ",
            " A A A . . . ",
            " A A A B B . ",
            " C C . B B . ",
            " . D D . E E ",
            " . D D F F . "
        ],[
            " A A A A A A ",
            " B B C C D D ",
            " B B C C D D ",
            " B B C C D D ",
            " A A A A A A ",
            " B B C C D D ",
            " B B C C D D ",
            " B B C C D D ",
            " . . . . . . ",
            " . . . . . . "

        ],[
            " . . . . . . "
        ]
    ],
    
    setTemplate:function(e) {
        $('.layoutTpl li.active').removeClass('active');
        $(e.currentTarget).addClass('active');
        this.drawGrid();
    },
    initialize:function() {

        $("body").on('click', ".grid section", $.proxy(this.toggleItem, this));
        $("body").on('click', ".layoutTpl li", $.proxy(this.setTemplate, this));
        $(window).on('scroll', "#grid", $.proxy(this.onScrollHandler, this));

        this.collection = new ItemsCollection();
        this.listenTo(this.collection, 'change', this.onChange);
        this.collection.fetch().done($.proxy(this.onFetch, this));
        
//        this.collection.fetch({ success : $.proxy(this.render, this), dataType: "jsonp" });
    this.render();
        
//        $(document).on('keydown', this.keydown);
//        $(document).on('keyup', this.keyup);
    },
    onFetch:function(e) {
        
    },
    keyup:function() {
        var next = $('.expanded').next();
        next.trigger('click');
        // $('.grid').removeClass('expanded')
        
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
    
    onScrollHandler: function() {
        console.log('asd');
        if (($(window).scrollTop() + 450) >= $(document).height() - $(window).height()) {
            this.window_scroll_refresh = true;
            if ($(".black_spinner").size() == 0) {
                $("#main .container").append("<div class='black_spinner' style='visibility: hidden;'></div>");
                this.loadMoreSavedStories();
            }
        }
    },
    loadMoreSavedStories:function () {
        
    },
    render: function(){
        
        var data = {
          items: this.collection,
          _: _ 
        };

//        var compiledTemplate = _.template( homeTemplate, data );
//        this.$el.html(homeTemplate);
        
        var el = document.getElementById('grid');
        this.grid = new Tiles.Grid(el);
        this.grid.resizeColumns = function() {
            return this.template.numCols;
        };
        this.grid.createTile = function(tileId) {
            var tile = new Tiles.Tile(tileId, $('#grid>section:eq('+Number(tileId-1)+')'));
            return tile;
        };
        this.drawGrid();
        var updateLayout = _.debounce($.proxy(this.debounce, this), 500);
        window.addEventListener("resize", updateLayout, false);

    }, 
    debounce:function () {
        this.grid.resize();
        this.grid.redraw(true);
    },
    
    
    drawGrid:function() {
//        console.log(this.gridTpl[$('.layoutTpl li.active').index()]);
        
        this.grid.template = Tiles.Template.fromJSON(this.gridTpl[$('.layoutTpl li.active').index()]);
        this.grid.isDirty = true;
        this.grid.resize();

        var list = [];
        for (var i = 1; i <=$('#grid>section').size() ; i++) {
            list.push(i);
        }

        this.grid.updateTiles(list);
        this.grid.redraw(true);
    }
  });

  return HomeView;

});