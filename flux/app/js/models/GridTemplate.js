define([
  'underscore',
  'backbone',
  'libs/singly'
], function(_, Backbone) {
  
  var GridTemplate = Backbone.Model.extend({
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
      }
  });
  return GridTemplate;

});
