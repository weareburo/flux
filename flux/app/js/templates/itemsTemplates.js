define(function(require){
    var tumblr = require('text!templates/items/tumblr.html');
    var instagram = require('text!templates/items/instagram.html');
    var item = require('text!templates/items/item.html');    
    var youtube = require('text!templates/items/youtube.html');

    return {
        tumblr: tumblr,
        item: item,        
        instagram: instagram,
        youtube: youtube,
    }
}); 
