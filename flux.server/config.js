module.exports = {
	sessionSecret: 'fluxilux',
	clientId:'1277a7ebcb3bc8cf0c1e4ff11f9c4131',
	clientSecret:'19e9c684c9638f954b6a29aabc065109',
	port: Number(process.env.PORT || 8080),
	uri: 'http://localhost:8080', // Without trailing /
    mongodb: 'mongodb://localhost/flux',
    socketio: {
        level: 2
    },
    singly: {
        // services:['youtube', 'facebook', 'twitter', 'tumblr', 'instagram' ],
        // types:['videos', 'photos','news', 'statuses'],
        services:{
            tumblr:'tumblr/posts',
            instagram:'instagram/feed',
            youtube:'youtube/uploads',
            //facebook:'instagram/feed',
            // twitter:'instagram/feed',
            // tumblr:'instagram/feed',
        },
        types:['photos'],
        limit:100
    },
	environment: (process.env.NODE_ENV !== 'production') ? 'development' : 'production',
	selenium : {
		testtimeout : 60000
	}
};

if (module.exports.environment == 'production') {
	module.exports.port = process.env.PORT || 80; // Joyent SmartMachine uses process.env.PORT
    module.exports.uri = 'http://localhost:'+module.exports.port;
}
