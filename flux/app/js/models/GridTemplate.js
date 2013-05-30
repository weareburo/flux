define([
  'underscore',
  'backbone',
  'libs/singly'
], function(_, Backbone) {
  
  var GridTemplate = Backbone.Model.extend({
      defaults: {
          template : [
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
        ]
      }

  });
  return GridTemplate;

});
