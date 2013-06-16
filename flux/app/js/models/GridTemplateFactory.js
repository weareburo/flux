define(function(_, Backbone) {
  var TemplateFactory = {
      defaults: {
          template : [
            [".AABB", "...BB", "CCDD.", "CC...", "EE...", "..FF.", ".GGHH", ".GGII"]
              // [
              //     " A A A .  . ",
              //     " A A A B  . ",
              //     " C C . B  . ",
              //     " . D D .  E ",
              //     " . D D F  . ",
              //     " A A A .  . ",
              //     " A A A B  . ",
              //     " C C . B  . ",
              //     " . D D .  E ",
              //     " . D D F  . "
              // ],[           
              //     " A A A A  A ",
              //     " B B C C  D ",
              //     " B B C C  D ",
              //     " B B C C  D ",
              //     " A A A A  A ",
              //     " B B C C  D ",
              //     " B B C C  D ",
              //     " B B C C  D ",
              //     " . . . .  . ",
              //     " . . . .  . "
              // 
              // ],[
              //     " . . . . . . "
              // ]
        ]
      },
      get: function(numCols, targetTiles) {
          
          
//          return Tiles.Template.fromJSON([".AABB", "...BB", "CCDD.", "CC...", "EE...", "..FF.", ".GGHH", ".GGII"]);
          
          
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
  return TemplateFactory;

});
