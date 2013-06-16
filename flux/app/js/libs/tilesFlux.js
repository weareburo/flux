(function() {
  FluxGrid = function(view, collection) {
    Tiles.Grid.call(this, null);

    this.$view = view;
    this.collection = e;

    this.cellSizeMin = this.getSizeMin();
    this.cellPadding = 5;
    this.appendDelayIncrement = 0;
    this.priorityPageSize = 25;
    this.storyUrlsByImageSize = [];





    this.mode = Modernizr.localstorage ? window.localStorage.getItem("gridMode") : PulseApp.Environment.GridMode.MAGAZINE;
    this.pinchStartMode = this.mode;
    this.templateFactory = (this.mode === PulseApp.Environment.GridMode.MAGAZINE) ? PulseApp.Views.PulseTileTemplates : Tiles.UniformTemplates;



    this.enablePrioritization = false;
    this.holdToSave = true




  };
  FluxGrid.prototype = new Tiles.Grid();
  FluxGrid.constructor = FluxGrid;
  var c = PulseApp.Environment.GridMode;


  FluxGrid.prototype.getSizeMin = function() {
    return 200;
  }
  FluxGrid.prototype.getContentWidth = function() {
    var d = this.$el.width(),
        e = (PulseApp.Environment.ScrollBarWidth) ? PulseApp.Environment.ScrollBarWidth : 0;
    d -= e;
    return d
  };
  FluxGrid.prototype.resize = function() {
    this.cellSizeMin = this.getSizeMin();
    Tiles.Grid.prototype.resize.call(this)
  };
  FluxGrid.prototype.resizeColumns = function() {
    var d = Tiles.Grid.prototype.resizeColumns.call(this);
    if (this.mode === PulseApp.Environment.GridMode.UNIFORM_SMALL) {
      d++
    }
    return d
  };
  FluxGrid.prototype.setMode = function(e) {
    var d = this.mode;
    if (d !== e) {
      this.mode = e;
      window.localStorage.setItem("gridMode", this.mode);
      PulseApp.GridSetting = this.mode;
      this.template = null;
      $("#header-layout-toggle").removeClass(PulseApp.Environment.GridMode.MAGAZINE).removeClass(PulseApp.Environment.GridMode.UNIFORM_NORMAL).removeClass(PulseApp.Environment.GridMode.UNIFORM_SMALL).addClass(this.mode);
      this.templateFactory = (e === PulseApp.Environment.GridMode.MAGAZINE) ? PulseApp.Views.PulseTileTemplates : Tiles.UniformTemplates;
      if (d === PulseApp.Environment.GridMode.UNIFORM_SMALL || e === PulseApp.Environment.GridMode.UNIFORM_SMALL) {
        this.resize()
      }
    }
  };
  FluxGrid.prototype.ensureTemplate = function(e) {
    if (this.template && this.template.rects.length >= (e + this.numCols)) {
      this.template = null
    }
    if (!this.template || this.template.numCols !== this.numCols) {
      var f = Backbone.history.fragment,
          d = PulseApp.Views.PulseTileTemplates;
      if (f && f.indexOf("/") < 0) {
        f += "/all"
      }
      if (this.mode === PulseApp.Environment.GridMode.MAGAZINE) {
        this.template = d.getStreamTemplate(f, this.numCols, e)
      }
      if (!this.template) {
        this.template = this.createTemplate(this.numCols, e);
        if (this.mode === PulseApp.Environment.GridMode.MAGAZINE) {
          d.setStreamTemplate(f, this.template)
        }
      }
      this.isDirty = true
    }
    Tiles.Grid.prototype.ensureTemplate.call(this, e)
  };
  FluxGrid.prototype.onDomInsertion = function() {
    var d = this,
        k = 0,
        j = 300,
        e = 8,
        m = 0.25;
    PINCH_THROTTLE_WAIT = 16, scalePinch = _.throttle(function(n, o) {
      if (+new Date - k >= j) {
        $("#tile-grid-changing").toggle(d.mode !== o)
      }
      var p = (n.scale < 1) ? 1 - ((1 - n.scale) * m) : 1 + Math.min(e, n.scale) / e * m;
      d.$el.css("scale", p)
    }, PINCH_THROTTLE_WAIT), onPinch = function(n) {
      var p = n.cancelled ? 1 : n.scale,
          o;
      switch (d.pinchStartMode) {
      case PulseApp.Environment.GridMode.MAGAZINE:
        o = (p < 0.5) ? PulseApp.Environment.GridMode.UNIFORM_NORMAL : PulseApp.Environment.GridMode.MAGAZINE;
        break;
      case PulseApp.Environment.GridMode.UNIFORM_NORMAL:
        o = (p < 0.5) ? PulseApp.Environment.GridMode.UNIFORM_SMALL : (p < 2) ? PulseApp.Environment.GridMode.UNIFORM_NORMAL : PulseApp.Environment.GridMode.MAGAZINE;
        break;
      case PulseApp.Environment.GridMode.UNIFORM_SMALL:
        o = (p > 2) ? PulseApp.Environment.GridMode.UNIFORM_NORMAL : PulseApp.Environment.GridMode.UNIFORM_SMALL;
        break
      }
      if (n.cancelled || n.type === "pinchend") {
        d.$el.animate({
          scale: 1
        }, 500);
        $("#tile-grid-changing").hide();
        if (d.mode !== o) {
          d.setMode(o);
          d.redraw(true)
        }
      } else {
        scalePinch(n, o)
      }
    };
    var g = false,
        l = null,
        f = function() {
        $("#hold-tile").fadeOut("fast", function() {
          $(this).remove()
        })
        },
        h = function() {
        var v = 50,
            u = $("#hold-tile"),
            n = u.offset(),
            y = u.width(),
            w = u.height(),
            z = $("#left-nav-saved"),
            A = z.height(),
            r = z.offset(),
            B = Math.floor(r.top + (A - (v * (w / y))) / 2) + 2,
            x = r.left + 152 + (v / 2),
            E = n.left + (y / 2) - x,
            D = n.top + (w / 2) - B,
            o = Math.sqrt(E * E + D * D),
            p = 1000 / 1000,
            q = Math.max(700, o / p);
        u.animate({
          top: B,
          left: x,
          width: v,
          height: v * (w / y),
          opacity: 0.1
        }, {
          duration: q,
          complete: function() {
            f();
            var F = z.find(".icon-star");
            F.addClass("selected");
            setTimeout(function() {
              F.removeClass("selected")
            }, 1000)
          },
          easing: "easeInOutExpo"
        });
        var t = u.data("tile-id"),
            C = _.find(d.collection.models, function(F) {
            return F.getUrl() === t
          });
        if (C) {
          PulseApp.SavedStories.addRemove({
            model: C,
            action: "save"
          })
        }
        };
    this.$view.on({
      gesturestart: function(n) {
        g = false
      },
      pinchstart: function(n) {
        k = +new Date;
        d.pinchStartMode = d.mode;
        onPinch(n)
      },
      pinchmove: function(n) {
        onPinch(n)
      },
      pinchend: function(n) {
        onPinch(n)
      },
      holdstart: function(r) {
        if (!d.holdToSave || r.pointerType !== "touch") {
          return
        }
        var q = d.locateTile(r.x, r.y);
        if (q) {
          var p = q.$el.clone(),
              o = q.$el.offset(),
              n = $(document.createElement("div")).addClass("hold-overlay").on("contextmenu", function() {
              return false
            });
          p.find(".story-tile-byline").remove();
          p.attr("id", "hold-tile").data("tile-id", q.id).append(n).css({
            position: "fixed",
            left: o.left - 10,
            top: o.top - 10,
            width: q.$el.width() + 15,
            height: q.$el.height() + 15
          }).appendTo(this);
          l = setTimeout(h, 500);
          g = true
        }
      },
      contextmenu: function(n) {
        if (g) {
          n.preventDefault()
        }
      },
      holdend: function(n) {
        if (n.cancelled && l) {
          f();
          clearTimeout(l)
        }
        l = null
      },
      tap: $.proxy(this.onStoryTap, this)
    });
    $("#header-layout-toggle").addClass(this.mode).show();
    $("#header-layout-smart").on("click", function() {
      d.setMode(PulseApp.Environment.GridMode.MAGAZINE);
      d.redraw(true)
    });
    $("#header-layout-grid").on("click", function() {
      d.setMode(PulseApp.Environment.GridMode.UNIFORM_NORMAL);
      d.redraw(true)
    });
    $("#header-layout-zoom").on("click", function() {
      d.setMode(PulseApp.Environment.GridMode.UNIFORM_SMALL);
      d.redraw(true)
    })
  };
  FluxGrid.prototype.onRemove = function() {
    $("#header-layout-toggle").hide().removeClass(this.mode);
    $("#header-layout-smart").off("click");
    $("#header-layout-grid").off("click");
    $("#header-layout-zoom").off("click")
  };
  FluxGrid.prototype.locateTile = function(f, e) {
    var d = this.$el.offset(),
        j = f - d.left + this.$el.scrollLeft(),
        h = e - d.top + this.$el.scrollTop();
    var g = _.find(this.tiles, function(k) {
      return (j >= k.left && j < k.left + k.width && h >= k.top && h < k.top + k.height)
    });
    return g
  };
  FluxGrid.prototype.onStoryTap = function(h) {
    var k = $("#new-content-info"),
        f = h.x,
        e = h.y,
        l, g, d, j;
    if (k.length > 0) {
      l = k.offset();
      if (f >= l.left && f < l.left + k.outerWidth(false) && e >= l.top && e < l.top + k.outerHeight(false)) {
        k.trigger("pulse.grid.loadnew");
        return
      }
    }
    g = this.locateTile(f, e);
    if (g) {
      d = _.find(this.collection.models, function(m) {
        return m.getUrl() === g.id
      });
      if (d) {
        _gaq.push(["_trackEvent", "Stream_View", "story_tile_click"]);
        j = new PulseApp.Views.Reading({
          model: d
        }, {
          collection: this.collection,
          position: "center"
        });
        j.setUpViews()
      }
    }
    h.preventDefault()
  };
  FluxGrid.sortRectsByPriority = function(e, d) {
    var g = e.width * e.height,
        f = d.width * d.height;
    if (g > f) {
      return -1
    }
    if (g < f) {
      return 1
    }
    if (e.y < d.y) {
      return -1
    }
    if (e.y > d.y) {
      return 1
    }
    if (e.x < d.x) {
      return -1
    }
    if (e.x > d.x) {
      return 1
    }
    return 0
  };
  FluxGrid.prototype.sortStoriesByImageSize = function(q, n) {
    var e = _.indexOf(this.collection, q),
        k = _.indexOf(this.collection, n),
        h = Math.floor(e / this.priorityPageSize),
        m = Math.floor(k / this.priorityPageSize);
    if (h < m) {
      return -1
    }
    if (h > m) {
      return 1
    }
    var p = q.get("textOnly"),
        j = n.get("textOnly");
    if (!p && j) {
      return -1
    }
    if (p && !j) {
      return 1
    }
    if (!p && !j) {
      var l = q.get("tileImageWidth") || 0,
          o = q.get("tileImageHeight") || 0,
          r = Math.min(l, o),
          u = n.get("tileImageWidth") || 0,
          g = n.get("tileImageHeight") || 0,
          f = Math.min(u, g);
      if (r > f) {
        return -1
      }
      if (r < f) {
        return 1
      }
      var d = l * o,
          t = u * g;
      if (d > t) {
        return -1
      }
      if (d < t) {
        return 1
      }
    }
    if (e < k) {
      return -1
    }
    if (e > k) {
      return 1
    }
    return 0
  };
  FluxGrid.prototype.createTile = function(e) {
    var f = _.find(this.collection.models, function(g) {
      return g.getUrl() === e
    });
    if (!f) {
      pulse.console.log("Missing story: " + e);
      return null
    }
    var d = new PulseApp.Views.Story({
      model: f
    }, {
      collection: this.collection
    });
    return new PulseApp.Views.PulseTile(e, d.$el)
  };
  FluxGrid.prototype.shouldRedraw = function() {
    if (!this.collection) {
      return false
    }
    return Tiles.Grid.prototype.shouldRedraw.call(this)
  };
  FluxGrid.prototype.redraw = function(d, f) {
    if (this.shouldRedraw()) {
      if (this.enablePrioritization) {
        var e = this.collection.models.slice(0);
        if (this.mode === PulseApp.Environment.GridMode.MAGAZINE) {
          e.sort($.proxy(this.sortStoriesByImageSize, this))
        }
        this.storyUrlsByImageSize = _.map(e, function(g) {
          return g.getUrl()
        })
      }
      this.$el.removeClass(PulseApp.Environment.GridMode.MAGAZINE).removeClass(PulseApp.Environment.GridMode.UNIFORM_NORMAL).removeClass(PulseApp.Environment.GridMode.UNIFORM_SMALL).addClass(this.mode)
    }
    Tiles.Grid.prototype.redraw.call(this, d, f)
  };
  FluxGrid.prototype.prioritizePage = function(f, e) {
    if (!this.enablePrioritization) {
      return
    }
    f.sort(FluxGrid.sortRectsByPriority);
    var d = a(f),
        g = this;
    e.sort(function(k, j) {
      var h = _.indexOf(g.storyUrlsByImageSize, k.id),
          n = _.indexOf(g.storyUrlsByImageSize, j.id),
          o = d[h],
          p = d[n];
      if (o < p) {
        return -1
      }
      if (o > p) {
        return 1
      }
      var m = _.indexOf(g.collection, k),
          l = _.indexOf(g.collection, j);
      if (m < l) {
        return -1
      }
      if (m > l) {
        return 1
      }
      return 0
    })
  };

  function a(e) {
    var h = [],
        g = 0,
        l = 0,
        f, d, k, j;
    for (f = 0, d = e.length; f < d; f++) {
      k = e[f];
      j = k.width * k.height;
      if (j !== g) {
        l++;
        g = j
      }
      h[f] = l
    }
    return h
  }
  FluxGrid.prototype.getAppendDelay = function(g, j, e, f, h, d) {
    return _.indexOf(j, g) * this.appendDelayIncrement
  }
})();
