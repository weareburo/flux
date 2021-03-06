var config = require('../config.js');
var https = require('https');
var url = require('url');
var normalizer = require('./normalizer');
var _ = require("underscore");
var mongoose = require('mongoose');

// Constructor
function Singly(token) {
    this.token=token;
    this.itemModel = mongoose.model('Item');    
    this.itemModel.remove({}, function(err) { 
       console.log('Items removed') 
    });
    //mongoose.connection.db.executeDbCommand({dropDatabase:1});
    this.options = {
        host: 'api.singly.com',
    }
}
// class methods
Singly.prototype.consumeFeeds = function() {
    var that = this;    
    _.each(config.singly.services, function(path, key){
        console.log(key, path);
        that.poller(
            key, 
            _.extend({path:'/services/'+path+'?limit='+config.singly.limit+'&map=true&access_token='+that.token}, that.options)
        );
    });
};

Singly.prototype.poller = function (service, options) {
    var that = this;
    var tot = 0;
    console.log(options.host+options.path);

    var reqGet = https.get(options, function (res) {
        var content=''; 
        res.on('data', function (chunk) {
            content += chunk;
        });
        res.on('end', function () {
            var feed = JSON.parse(content);
            var o = [];
            _.each(feed, function (item) {
                console.log(item);
                var type;
                if (!_.isUndefined(item.map.oembed)) {
                    type = item.map.oembed.type;
                } else {
                    type = 'video';
                }
                var normalizedItem = normalizer[service+'_'+type](item);
                if (normalizedItem) {
                    var mongoItem = new that.itemModel(normalizedItem)
                        .save(function (err) {
                          if (err) console.log('meow');
                          console.log("saved ITEM " + tot++);
                        });
                    
                }
            });
            console.log('finished ' + tot + ' items saved');
        });
        console.log('all finished');
    });
    reqGet.end();
    reqGet.on('error', function (e) {
        console.error('error');
        console.error(e);
    });
};


// export the class
module.exports = Singly;