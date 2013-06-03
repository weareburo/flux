define(function(require){
    var tumblr = require('text!templates/items/tumblr.html');
    var instagram = require('text!templates/items/instagram.html');
    var youtube = require('text!templates/items/youtube.html');

    return {
        tumblr: tumblr,
        instagram: instagram,
        youtube: youtube,
    }
}); 
