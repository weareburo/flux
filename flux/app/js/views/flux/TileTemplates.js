define(function(tilejs){

    var c = [{
      width: 2,
      height: 2,
      probability: 0.15
    }, {
      width: 2,
      height: 1,
      probability: 0.2
    }, {
      width: 1,
      height: 1,
      probability: 0.65
    }];
    var d = [{
      cols: 5,
      tiles: 25,
      rows: [".AABB", "...BB", "CCDD.", "CC...", "EE...", "..FF.", ".GGHH", ".GGII"]
    }, {
      cols: 5,
      tiles: 25,
      rows: [".AABB", "CC.BB", "DDEE.", "DD.FF", ".GG..", "..HH.", "IIHH.", ".JJKK", ".JJLL"]
    }, {
      cols: 5,
      tiles: 25,
      rows: ["...AA", ".BB..", ".BB..", "CC...", "..DD.", "EEDD.", "...FF"]
    }, {
      cols: 5,
      tiles: 25,
      rows: [".AABB", "CC.BB", "DDEE.", "DD.FF", ".GG..", "..HH.", "IIHH.", ".JJKK", ".JJLL"]
    }];
    var a = {},
        b = "col-";


    TileTemplates = {
        get: function(numCols, targetTiles) {
            
            console.log(numCols, targetTiles)
            
            var numRows = Math.ceil(targetTiles / numCols),
                rects = [],
                x, y;

            // create the rects for 1x1 tiles
            for (y = 0; y < numRows; y++) {
                for (x = 0; x < numCols; x++) {
                    rects.push(new Tiles.Rectangle(x, y, 1, 1));
                }
            }

            return new Tiles.Template(rects, numCols, numRows);
        }
    };



    // TileTemplates = {
    //   get: function(k, f) {
    //     var j = [],
    //         g, e, h;
    //     for (g = 0, e = d.length; g < e; g++) {
    //       h = d[g];
    //       if (h.cols === k && h.tiles === f) {
    //         j.push(h)
    //       }
    //     }
    //     if (j.length > 0) {
    //       g = Math.floor(Math.random() * j.length);
    //       return Tiles.Template.fromJSON(j[g].rows)
    //     }
    //     console.log(Tiles)
    //     return Tiles.DiverseTemplates.get(k, f, c)
    //   },
    //   getStreamTemplate: function(h, j, f) {
    //     var e = a[h];
    //     if (e) {
    //       var g = e[b + j];
    //       if (g && g.rects.length <= f) {
    //         return g.copy()
    //       }
    //     }
    //     return null
    //   },
    //   setStreamTemplate: function(g, f) {
    //     var e = a[g];
    //     if (!e) {
    //       e = a[g] = {}
    //     }
    //     e[b + f.numCols] = f.copy()
    //   }
    // }
    
    return TileTemplates;
    
});