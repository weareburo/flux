var config = require('./config.js');
var express = require('express');

var querystring = require('querystring');
var request = require('request');
var sprintf = require('sprintf').sprintf;
var partials = require('express-partials');

var mongoose = require('mongoose');
mongoose.connect(config.mongodb);


var hostBaseUrl = (process.env.HOST || 'http://localhost:' + config.port);
var apiBaseUrl = process.env.SINGLY_API_HOST || 'https://api.singly.com';

// Create an HTTP server
var app = express();

// Require and initialize the singly module
var expressSingly = require('express-singly')(app, config.clientId, config.clientSecret,
hostBaseUrl, hostBaseUrl + '/callback');

// Setup for the express web framework
app.configure(function() {
  // Use ejs instead of jade because HTML is easy
  app.set('view engine', 'ejs');
  app.set('views', __dirname+'/../flux/app');
  app.use(function(req, res, next){
    res.locals.inspect = require('util').inspect;
    next();
  });

  app.use(partials());
  app.use(express.logger());
  app.use(express['static'](__dirname+'/../flux/app'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: config.sessionSecret
  }));
  expressSingly.configuration();
  app.use(app.router);
});

expressSingly.routes();

var Singly = require('./modules/singly');


var itemModel = mongoose.model('Item', {
    date: Date, // OK
    dateFormat: String,
    author: { // OK
      name: String,
      id: String,
      url: String,
      photo: String,
    },
    recipients: Array,
    title: String,
    message: String, // OK
    tags: String,
    picture: {
      url: String,
      height: Number,
      width: Number
    },
    thumbnail: {
      url: String,
      height: Number,
      width: Number
    },
    link: {
      url: String,
      title: String,
      description: String
    },
    type: String,
    popularity: Number,
    source_service: String        
});


// We want exceptions and stracktraces in development
app.configure('development', function() {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

var skip    = 0;
var limit   = 10;    

app.get('/', function(req, res) {
    // Render out views/index.ejs, passing in the session
    itemModel.find().sort({date:-1}).skip(skip).limit(limit).execFind(
        function (arr,data) {
            res.render('index', {
                session: req.session, 
                items:data,
                layout: skip?false:true
            });
        }
    );
});

app.get('/feed', function(req, res) {
    // Render out views/index.ejs, passing in the session
    var url = require('url');
    var url_parts   = url.parse(req.url, true);
    var query       = url_parts.query;
    var skip        = 0;
    var limit        = 10;
    
    if (query.page != undefined) skip = query.page;
console.log(skip);
    
    var count = itemModel.count(function(err, c) {
        itemModel.find().sort({date:-1}).skip(skip*limit).limit(limit).execFind(
            function (arr,data) {
                res.json({count:c,limit:limit,data:data});
            }
        );
    });
});


app.get('/consume', function(req, res) {
    var s = new Singly();
    var feed = s.consumeFeeds();
    res.render('consume', {
        session: req.session,
        feed:feed
    });
});

app.get('/connector', function(req, res) {
    var url = require('url');
    var url_parts   = url.parse(req.url, true);
    var query       = url_parts.query;
    var token = null;
    
    if (req.session.accessToken!= undefined) token = req.session.accessToken;
    if (query.token != undefined) token = query.token;

    if (token != null) {
        var s = new Singly(req.session.accessToken);
        var feed = s.consumeFeeds();
    }
    res.render('connector', {
        session: req.session
    });
});

app.listen(config.port);
console.log(sprintf('Listening at %s using API endpoint %s.', hostBaseUrl, apiBaseUrl));
