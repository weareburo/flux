var baseUrl, date4sorting, dateFormat, filterFacebook, get, normalize, normalizeFacebook, normalizeInstagram, normalizeTumblr, normalizeTwitter, normalizeYoutube;

baseUrl = 'https://api.singly.com/';

get = function(url, options) {
  if (options == null) {
    options = {};
  }
  if (options.access_token == null) {
    options.access_token = encodeURIComponent(DemoApp.Config.accessToken);
  }
  options.limit = options.limit || 100;
  options.dedup = true;
  console.log(baseUrl + url, options);
  return $.getJSON(baseUrl + url, options);
};

dateFormat = "D.MM.YYYY";

date4sorting = "YYYYMMDDHHmmss";

filterFacebook = function(item) {
  var ok;
  ok = true;
  if ((item.data.status_type != null) && item.data.status_type === 'approved_friend') {
    ok = false;
  }
  if ((item.data.story != null) && item.data.story.indexOf('is going to an event') !== -1) {
    ok = false;
  }
  return ok;
};

normalizeFacebook = function(item) {
  var result, tempMoment, _ref, _ref1;
  result = {};
  if (item.data == undefined) return;
  
  
//  if (item.data.created_time != null) {
    // tempMoment = moment.unix(item.data.created_time);
    // result.date = tempMoment.format(dateFormat);
    // result.date4sorting = parseInt(tempMoment.format(date4sorting));
//  }
  if (item.data.from != null) {
    result.author = {
      name: item.data.from.name,
      id: item.data.from.id
    };
  }
  if (((_ref = item.data.to) != null ? _ref.data : void 0) != null) {
    result.recipients = item.data.to.data;
  }
  if (item.data.story != null) {
    result.title = item.data.story;
  }
  if (item.data.message != null) {
    result.message = item.data.message;
  }
  if (item.data.picture != null) {
    result.picture = {
      url: item.data.picture,
      height: item.data.height != null ? item.data.height : void 0,
      width: item.data.width != null ? item.data.width : void 0
    };
  }
  if (item.oembed.thumbnail_url != null) {
    result.thumbnail = {
      url: item.oembed.thumbnail_url,
      width: item.oembed.thumbnail_width != null ? item.oembed.thumbnail_width : void 0,
      height: item.oembed.thumbnail_height != null ? item.oembed.thumbnail_height : void 0
    };
  }
  if (item.data.link != null) {
    result.link = {
      url: item.data.link,
      title: item.data.name != null ? item.data.name : void 0
    };
  }
  if (item.oembed.type != null) {
    result.type = item.oembed.type;
  }
  if (((_ref1 = item.data.likes) != null ? _ref1.count : void 0) != null) {
    result.popularity = item.data.likes.count;
  }
  result.source_service = item.oembed.source_name;
  return result;
};

normalizeTwitter = function(item) {
  var dateFormatTwitter, result, tempMoment, _ref, _ref1, _ref2;
  result = {};
  dateFormatTwitter = 'ddd MMM DD HH:mm:ss ZZ YYYY';
  if (item.data.created_at != null) {
    tempMoment = moment(item.data.created_at, dateFormatTwitter);
    result.date = tempMoment.format(dateFormat);
    result.date4sorting = parseInt(tempMoment.format(date4sorting));
  }
  if (item.data.user != null) {
    result.author = {
      name: item.data.user.name,
      id: item.data.user.id,
      url: "https://twitter.com/" + item.data.user.screen_name,
      thumbnail: {
        url: item.data.user.profile_image_url
      }
    };
  }
  if (((_ref = item.data.entities) != null ? _ref.user_mentions : void 0) != null) {
    result.recipients = item.data.entities.user_mentions;
  }
  if (item.data.text != null) {
    result.message = item.data.text;
  }
  if ((((_ref1 = item.data.entities) != null ? _ref1.hashtags : void 0) != null) && item.data.entities.hashtags !== []) {
    result.tags = item.data.entities.hashtags;
  }
  if ((((_ref2 = item.data.entities) != null ? _ref2.media : void 0) != null) && item.data.entities.media !== []) {
    result.picture = {
      url: item.data.entities.media[0].media_url,
      width: item.data.entities.media[0].sizes.large.w,
      height: item.data.entities.media[0].sizes.large.h
    };
  }
  if (item.oembed.thumbnail_url != null) {
    result.thumbnail = {
      url: item.oembed.thumbnail_url,
      width: item.oembed.thumbnail_width != null ? item.oembed.thumbnail_width : void 0,
      height: item.oembed.thumbnail_height != null ? item.oembed.thumbnail_height : void 0
    };
  } else if (item.oembed.type === 'photo') {
    result.picture = {
      url: item.oembed.url,
      width: item.oembed.width != null ? item.oembed.width : void 0,
      height: item.oembed.height != null ? item.oembed.height : void 0
    };
  }
  if (item.oembed.url != null) {
    result.link = {
      url: item.oembed.url,
      title: item.oembed.title != null ? item.oembed.title : void 0,
      description: item.oembed.description != null ? item.oembed.description : void 0
    };
  }
  if (item.oembed.type != null) {
    result.type = item.oembed.type;
  }
  if (item.data.retweet_count != null) {
    result.popularity = item.data.retweet_count;
  }
  result.source_service = item.oembed.source_name;
  return result;
};

normalizeTumblr = function(item) {
  var result, tempMoment, thumb_index;
  result = {};
  if (item.data.timestamp != null) {
    tempMoment = moment.unix(item.data.timestamp);
    result.date = tempMoment.format(dateFormat);
    result.date4sorting = parseInt(tempMoment.format(date4sorting));
  }
  if (item.data.blog_name != null) {
    result.author = {
      name: item.data.blog_name,
      url: "http://" + item.data.blog_name + ".tumblr.com",
      thumbnail: {
        url: '/images/user_blue.png'
      }
    };
  }
  if (item.data.title != null) {
    result.title = item.data.title;
  }
  if (item.data.description != null) {
    result.message = item.data.description;
  }
  if ((item.data.tags != null) && item.data.tags) {
    result.tags = item.data.tags;
  }
  if ((item.data.url != null) || (item.data.post_url != null)) {
    result.link = {
      url: item.data.url || item.data.post_url,
      title: item.data.title != null ? item.data.title : void 0,
      description: (item.oembed.description != null ? (item.data.description != null) || item.oembed.description : void 0) ? item.data.description : void 0
    };
  }
  if (item.data.photos != null) {
    result.picture = {
      url: item.data.photos[0].alt_sizes[0].url,
      width: item.data.photos[0].alt_sizes[0].width,
      height: item.data.photos[0].alt_sizes[0].height
    };
    thumb_index = item.data.photos[0].alt_sizes.length - 1;
    result.thumbnail = {
      url: item.data.photos[0].alt_sizes[thumb_index].url,
      width: item.data.photos[0].alt_sizes[thumb_index].width,
      height: item.data.photos[0].alt_sizes[thumb_index].height
    };
  }
  if (item.oembed.type != null) {
    result.type = item.oembed.type;
  }
  if (item.data.note_count != null) {
    result.popularity = item.data.note_count;
  }
  result.source_service = item.oembed.source_name;
  return result;
};

normalizeInstagram = function(item) {
  var result, tempMoment, _ref, _ref1, _ref2;
  result = {};
  if (item.data.created_time != null) {
    tempMoment = moment.unix(item.data.created_time);
    result.date = tempMoment.format(dateFormat);
    result.date4sorting = parseInt(tempMoment.format(date4sorting));
  }
  if (((_ref = item.data.user) != null ? _ref.username : void 0) != null) {
    result.author = {
      name: item.data.user.full_name,
      id: item.data.user.id,
      url: "http://instagram.com/" + item.data.user.username + "/",
      thumbnail: {
        url: item.data.user.profile_picture
      }
    };
  }
  if (((_ref1 = item.data.caption) != null ? _ref1.text : void 0) != null) {
    result.title = item.data.caption.text;
  }
  if (item.data.tags != null) {
    result.tags = item.data.tags;
  }
  if (item.data.images != null) {
    result.picture = {
      url: item.data.images.standard_resolution.url,
      width: item.data.images.standard_resolution.width,
      height: item.data.images.standard_resolution.height
    };
    result.thumbnail = {
      url: item.data.images.thumbnail.url,
      width: item.data.images.thumbnail.width,
      height: item.data.images.thumbnail.height
    };
  }
  if (item.data.link != null) {
    result.link = {
      url: item.data.link,
      title: result.title != null ? result.title : void 0
    };
  }
  if (item.oembed.type != null) {
    result.type = item.oembed.type;
  }
  if (((_ref2 = item.data.likes) != null ? _ref2.count : void 0) != null) {
    result.popularity = item.data.likes.count;
  }
  result.source_service = item.oembed.source_name;
  return result;
};

normalizeYoutube = function(item) {
  var dateFormatYoutube, linkIndex, result, sizes, tempMoment, thumbIndex, types, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
  result = {};
  dateFormatYoutube = "YYYY-MM-DD\THH:mm:ss\.[000]ZZ";
  if (((_ref = item.data.published) != null ? _ref.$t : void 0) != null) {
    tempMoment = moment(item.data.published.$t, dateFormatYoutube);
    result.date = tempMoment.format(dateFormat);
    result.date4sorting = parseInt(tempMoment.format(date4sorting));
  }
  if (item.data.author != null) {
    result.author = {
      name: item.data.author[0].name.$t,
      id: item.data.author[0].yt$userId.$t,
      url: "http://www.youtube.com/user/" + (item.data.author[0].name.$t.replace(/\s/g, '')),
      thumbnail: {
        url: '/images/user_blue.png'
      }
    };
  }
  if (((_ref1 = item.data.title) != null ? _ref1.$t : void 0) != null) {
    result.title = item.data.title.$t;
  }
  if (((_ref2 = item.data.media$group) != null ? (_ref3 = _ref2.media$description) != null ? _ref3.$t : void 0 : void 0) != null) {
    result.message = item.data.media$group.media$description.$t;
  }
  if (((_ref4 = item.data.media$group) != null ? (_ref5 = _ref4.media$keywords) != null ? _ref5.$t : void 0 : void 0) != null) {
    result.tags = item.data.media$group.media$keywords.$t.replace(/\s+/g, '').split(",");
  }
  if (((_ref6 = item.data.media$group) != null ? _ref6.media$thumbnail : void 0) != null) {
    sizes = _.pluck(item.data.media$group.media$thumbnail, 'yt$name');
    thumbIndex = _.indexOf(sizes, 'mqdefault');
    result.thumbnail = {
      url: item.data.media$group.media$thumbnail[thumbIndex].url,
      widht: item.data.media$group.media$thumbnail[thumbIndex].width,
      height: item.data.media$group.media$thumbnail[thumbIndex].height
    };
  }
  if (item.data.link != null) {
    types = _.pluck(item.data.link, 'rel');
    linkIndex = _.indexOf(types, 'alternate');
    result.link = {
      url: item.data.link[linkIndex].href,
      title: result.title
    };
  }
  result.type = 'video';
  if (((_ref7 = item.data.yt$rating) != null ? _ref7.numLikes : void 0) != null) {
    result.popularity = parseInt(item.data.yt$rating.numLikes);
  }
  result.source_service = item.oembed.source_name;
  return result;
};

normalize = function(data) {
  var normalized;
  normalized = [];
  _.each(data, function(item) {
    switch (item.oembed.source_name) {
      case 'facebook':
        if (filterFacebook(item)) {
          return normalized.push(normalizeFacebook(item));
        }
        break;
      case 'twitter':
        return normalized.push(normalizeTwitter(item));
      case 'tumblr':
        return normalized.push(normalizeTumblr(item));
      case 'instagram':
        return normalized.push(normalizeInstagram(item));
      case 'youtube':
        return normalized.push(normalizeYoutube(item));
    }
  });
  return normalized;
};
// 
// exports.getAll = function(callback) {
//   return $.when(get('types/news'), get('types/photos'), get('types/videos'), get('services/youtube/uploads')).then(function(news, photos, videos, youtube) {
//     var content, normalized;
//     content = [];
//     _.each(news[0], function(item) {
//       return content.push(item);
//     });
//     _.each(photos[0], function(item) {
//       return content.push(item);
//     });
//     _.each(videos[0], function(item) {
//       return content.push(item);
//     });
//     _.each(youtube[0], function(item) {
//       item.oembed = {
//         source_name: 'youtube'
//       };
//       return content.push(item);
//     });
//     normalized = normalize(content);
//     return callback(normalized);
//   });
// };
// 
// exports.setupStream = function() {
//   var socket;
//   socket = io.connect('http://stream.singly.com:80');
//   socket.on('connect_failed', function() {
//     return console.log('Socket connection failed');
//   });
//   return socket.on('connect', function() {
//     console.log('Socket connected');
//     return socket.emit('stream', {}, function(stream) {
//       var now;
//       console.log("new stream created", stream);
//       now = Date.now();
//       socket.emit(stream, {
//         path: '/types/news',
//         query: {
//           since: now
//         },
//         access_token: DemoApp.Config.accessToken
//       });
//       return socket.on(stream, function(entry) {
//         return console.log("new entry", entry);
//       });
//     });
//   });
// };
