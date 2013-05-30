var _ = require("underscore");
var moment = require('moment');


// Constructor
function Normalizer() { }
// class methods

Normalizer.prototype.facebook_photo = function(item) {

    var result = {
        date: item.map.earliest,
        author: {
          name: item.map.oembed.author_name,
          id: item.data.from.id,
          url: null,
          thumbnail: {
            url: item.data.picture
          }
        },
        recipients: null,
        title: item.map.oembed.title,
        message: item.map.oembed.title,
        tags: null,
        picture: {
          url: item.map.media,
          height: item.map.oembed.width,
          width: item.map.oembed.height
        },
        thumbnail: {
          url: item.map.oembed.thumbnail_url,
          height: null,
          width: null
        },
        link: {
          url: item.data.link,
          title: null,
          description: null
        },
        type: 'photos',
        popularity: _.isUndefined(item.data.likes) ? 0 : item.data.likes.length,
        source_service: 'facebook'
    };
    return result;
    
}


Normalizer.prototype.twitter_photo = function(item) {

    var result = {
        date: item.map.earliest,
        author: {
          name: item.map.author.name,
          id: item.map.id,
          url: item.map.author.url,
          thumbnail: {
            url: item.map.author.photo
          }
        },
        recipients: null,
        title: item.q,
        message: item.map.text,
        tags: null,
        picture: {
          url: item.oembed.url,
          height: item.oembed.width,
          width: item.oembed.height
        },
        thumbnail: {
          url: item.oembed.thumbnail_url,
          height: item.oembed.thumbnail_height,
          width: item.oembed.thumbnail_width
        },
        link: {
          url: item.map.urls[0],
          title: item.map.text,
          description: null
        },
        type: 'photos',
        popularity: null,
        source_service: 'twitter'
    };
    return result;
    
}

Normalizer.prototype.twitter_video = function(item) {

    var result = {
        date: item.map.earliest,
        author: {
          name: item.map.author.name,
          id: item.map.id,
          url: item.map.author.url,
          thumbnail: {
            url: item.map.author.photo
          }
        },
        recipients: null,
        title: item.oembed.title,
        message: item.map.text,
        tags: null,
        picture: {
          // url: item.oembed.html,
          // height: item.oembed.width,
          // width: item.oembed.height
          url: item.oembed.thumbnail_url,
          height: item.oembed.thumbnail_height,
          width: item.oembed.thumbnail_width
        },
        thumbnail: {
          url: item.oembed.thumbnail_url,
          height: item.oembed.thumbnail_height,
          width: item.oembed.thumbnail_width
        },
        link: {
          url: item.map.urls[0],
          title: item.oembed.title,
          description: item.map.text
        },
        type: 'video',
        popularity: null,
        source_service: 'twitter'
    };
    return result;
    
}



Normalizer.prototype.tumblr_photo = function(item) {

    var result = {
        date: item.map.earliest,
        dateFormat: moment(item.map.earliest).fromNow(),
        author: {
          name: item.map.author.name,
          id: null,
          url: item.map.author.url,
          thumbnail: {
            url: item.map.author.photo
          }
        },
        recipients: item.map.participants,
        title: item.map.text,
        message: item.data.caption,
        tags: null,
        picture: {
          url: item.map.oembed.url,
          height: item.map.oembed.height,
          width: item.map.oembed.width
        },
        thumbnail: {
            url: null,
            height: null,
            width: null,
        },
        link: {
          url: item.map.oembed.provider_url,
          title: null,
          description: item.data.post_url
        },
        type: 'photos',
        popularity: item.data.note_count,
        source_service: 'tumblr'
    };
    return result;
    
}

Normalizer.prototype.tumblr_link = function(item) {

    var result = {};
    return result;
    
}



Normalizer.prototype.tumblr_video = function(item) {

    // var result = {
    //     date: item.map.earliest,
    //     dateFormat: moment(item.map.earliest).fromNow(),
    //     author: {
    //       name: item.map.author.name,
    //       id: null,
    //       url: item.map.author.url,
    //       thumbnail: {
    //         url: item.map.author.photo
    //       }
    //     },
    //     recipients: item.map.participants,
    //     title: item.map.text,
    //     message: item.data.caption,
    //     tags: null,
    //     picture: {
    //       url: item.oembed.url,
    //       height: item.oembed.width,
    //       width: item.oembed.height
    //     },
    //     thumbnail: {
    //         url: null,
    //         height: null,
    //         width: null,
    //     },
    //     link: {
    //       url: item.map.oembed.provider_url,
    //       title: null,
    //       description: null
    //     },
    //     type: 'photos',
    //     popularity: item.data.note_count,
    //     source_service: 'tumblr'
    // };
    return {};
    
}



Normalizer.prototype.instagram_photo = function(item) {

    var result = {
        date: item.map.earliest,
        author: {
          name: item.map.author.name,
          id: null,
          url: item.map.author.url,
          thumbnail: {
            url: item.map.author.photo
          }
        },
        recipients: item.map.participants,
        title: null,
        message: null,
        tags: null,
        picture: {
          url: item.oembed.url,
          height: item.oembed.width,
          width: item.oembed.height
        },
        thumbnail: {
            url: null,
            height: null,
            width: null,
        },
        link: {
          url: null,
          title: null,
          description: null
        },
        type: 'photos',
        popularity: item.data.note_count,
        source_service: 'instagram'
    };
    return result;   
}

Normalizer.prototype.facebook_link = function(item) {

    var result = {
        date: item.data.created_time,
        author: {
          name: item.map.author.name,
          id: null,
          url: item.map.author.url,
          thumbnail: {
            url: item.map.author.photo
          }
        },
        recipients: null,
        title: item.data.story,
        message: _.isUndefined(item.data.message) ? null : item.data.message,
        tags: null,
        picture: {
          url: null,
          height: null,
          width: null
        },
        thumbnail: {
          url: null,
          height: null,
          width: null
        },
        link: {
          url: _.isUndefined(item.map.urls) ? null : item.map.urls[0],
          title: item.map.text,
          description: null
        },
        type: 'link',
        popularity: item.data.comments.count,
        source_service: 'facebook'
    };
    return result;
    
}



Normalizer.prototype.twitter_link = function(item) {

    var result = {
        date: item.map.earliest,
        author: {
          name: item.map.author.name,
          id: null,
          url: item.map.author.url,
          thumbnail: {
            url: item.map.author.photo
          }
        },
        recipients: null,
        title: item.map.text,
        message: item.map.text,
        tags: null,
        picture: {
          url: null,
          height: null,
          width: null
        },
        thumbnail: {
          url: null,
          height: null,
          width: null
        },
        link: {
          url: item.map.urls[0],
          title: item.oembed.title,
          description: item.map.text
        },
        type: 'link',
        popularity: null,
        source_service: 'facebook'
    };
    return result;
    
}


Normalizer.prototype.facebook_text = function(item) {

    var result = {
        date: item.data.created_time,
        author: {
          name: item.map.author.name,
          id: null,
          url: item.map.author.url,
          thumbnail: {
            url: item.map.author.photo
          }
        },
        recipients: null,
        title: item.data.story,
        message: _.isUndefined(item.data.message) ? null : item.data.message,
        tags: null,
        picture: {
          url: null,
          height: null,
          width: null
        },
        thumbnail: {
          url: null,
          height: null,
          width: null
        },
        link: {
          url: null,
          title: null,
          description: null
        },
        type: 'text',
        popularity: item.data.comments.count,
        source_service: 'facebook'
    };
    return result;
    
}


Normalizer.prototype.twitter_text = function(item) {

    var result = {
        date: item.map.earliest,
        author: {
          name: item.map.author.name,
          id: null,
          url: item.map.author.url,
          thumbnail: {
            url: item.map.author.photo
          }
        },
        recipients: null,
        title: item.map.text,
        message: null,
        tags: null,
        picture: {
          url: null,
          height: null,
          width: null
        },
        thumbnail: {
          url: null,
          height: null,
          width: null
        },
        link: {
          url: null,
          title: null,
          description: null
        },
        type: 'text',
        popularity: null,
        source_service: 'twitter'
    };
    return result;
    
}

Normalizer.prototype.youtube_upload = function(item) {
    var dateFormatYoutube, linkIndex, result, sizes, tempMoment, thumbIndex, types, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
    var result = {};


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
        
        result.picture = result.thumbnail;
        
      }
      

      var aVideoId = item.map.id.split(':')
      var videoId = aVideoId[aVideoId.length-1];
      var url = 'http://www.youtube.com/embed/'+videoId+'?html5=1';


      if (item.data.link != null) {
        types = _.pluck(item.data.link, 'rel');
        linkIndex = _.indexOf(types, 'alternate');
        result.link = {
          url: url,
          title: result.title
        };
      }
      result.type = 'video';
      result.source_service = 'youtube';
      result.popularity = (!_.isUndefined(item.data.yt$statistics) && !_.isUndefined(item.data.yt$statistics.viewCount)) ? item.data.yt$statistics.viewCount : 0;

    return result;
    
}

// 
// 
// Normalizer.prototype.facebook = function(item) {
//     
//     
//     
//     
//     
//     
//     
//   var result, tempMoment, _ref, _ref1;
//   result = this.map();
// 
// 
//   if (((_ref = item.data.to) != null ? _ref.data : void 0) != null) {
//     result.recipients = item.data.to.data;
//   }
//   if (item.data.story != null) {
//     result.title = item.data.story;
//   }
//   if (item.data.message != null) {
//     result.message = item.data.message;
//   }
//   if (item.data.picture != null) {
//     result.picture = {
//       url: item.data.picture,
//       height: item.data.height != null ? item.data.height : void 0,
//       width: item.data.width != null ? item.data.width : void 0
//     };
//   }
//   if (item.oembed.thumbnail_url != null) {
//     result.thumbnail = {
//       url: item.oembed.thumbnail_url,
//       width: item.oembed.thumbnail_width != null ? item.oembed.thumbnail_width : void 0,
//       height: item.oembed.thumbnail_height != null ? item.oembed.thumbnail_height : void 0
//     };
//   }
//   if (item.data.link != null) {
//     result.link = {
//       url: item.data.link,
//       title: item.data.name != null ? item.data.name : void 0
//     };
//   }
//   if (item.oembed.type != null) {
//     result.type = item.oembed.type;
//   }
//   if (((_ref1 = item.data.likes) != null ? _ref1.count : void 0) != null) {
//     result.popularity = item.data.likes.count;
//   }
//   result.source_service = item.oembed.source_name;
//   return result;
// };
// 
// Normalizer.prototype.twitter = function(item) {
//   var dateFormatTwitter, result, tempMoment, _ref, _ref1, _ref2;
//   result = {};
//   // dateFormatTwitter = 'ddd MMM DD HH:mm:ss ZZ YYYY';
//   // if (item.data.created_at != null) {
//   //   tempMoment = moment(item.data.created_at, dateFormatTwitter);
//   //   result.date = tempMoment.format(dateFormat);
//   //   result.date4sorting = parseInt(tempMoment.format(date4sorting));
//   // }
//   // if (item.data.user != null) {
//   //   result.author = {
//   //     name: item.data.user.name,
//   //     id: item.data.user.id,
//   //     url: "https://twitter.com/" + item.data.user.screen_name,
//   //     thumbnail: {
//   //       url: item.data.user.profile_image_url
//   //     }
//   //   };
//   // }
//   
//   result.author = item.map.author;
//   
//   
//   if (((_ref = item.data.entities) != null ? _ref.user_mentions : void 0) != null) {
//     result.recipients = item.data.entities.user_mentions;
//   }
//   if (item.data.text != null) {
//     result.message = item.data.text;
//   }
//   if ((((_ref1 = item.data.entities) != null ? _ref1.hashtags : void 0) != null) && item.data.entities.hashtags !== []) {
//     result.tags = item.data.entities.hashtags;
//   }
//   if ((((_ref2 = item.data.entities) != null ? _ref2.media : void 0) != null) && item.data.entities.media !== []) {
//     result.picture = {
//       url: item.data.entities.media[0].media_url,
//       width: item.data.entities.media[0].sizes.large.w,
//       height: item.data.entities.media[0].sizes.large.h
//     };
//   }
//   if (item.oembed.thumbnail_url != null) {
//     result.thumbnail = {
//       url: item.oembed.thumbnail_url,
//       width: item.oembed.thumbnail_width != null ? item.oembed.thumbnail_width : void 0,
//       height: item.oembed.thumbnail_height != null ? item.oembed.thumbnail_height : void 0
//     };
//   } else if (item.oembed.type === 'photo') {
//     result.picture = {
//       url: item.oembed.url,
//       width: item.oembed.width != null ? item.oembed.width : void 0,
//       height: item.oembed.height != null ? item.oembed.height : void 0
//     };
//   }
//   if (item.oembed.url != null) {
//     result.link = {
//       url: item.oembed.url,
//       title: item.oembed.title != null ? item.oembed.title : void 0,
//       description: item.oembed.description != null ? item.oembed.description : void 0
//     };
//   }
//   if (item.oembed.type != null) {
//     result.type = item.oembed.type;
//   }
//   if (item.data.retweet_count != null) {
//     result.popularity = item.data.retweet_count;
//   }
//   result.source_service = item.oembed.source_name;
//   return result;
// };
// 
// Normalizer.prototype.tumblr = function(item) {
//   var result, tempMoment, thumb_index;
//   result = {};
//   if (item.data.timestamp != null) {
//     tempMoment = moment.unix(item.data.timestamp);
//     result.date = tempMoment.format(dateFormat);
//     result.date4sorting = parseInt(tempMoment.format(date4sorting));
//   }
//   if (item.data.blog_name != null) {
//     result.author = {
//       name: item.data.blog_name,
//       url: "http://" + item.data.blog_name + ".tumblr.com",
//       thumbnail: {
//         url: '/images/user_blue.png'
//       }
//     };
//   }
//   if (item.data.title != null) {
//     result.title = item.data.title;
//   }
//   if (item.data.description != null) {
//     result.message = item.data.description;
//   }
//   if ((item.data.tags != null) && item.data.tags) {
//     result.tags = item.data.tags;
//   }
//   if ((item.data.url != null) || (item.data.post_url != null)) {
//     result.link = {
//       url: item.data.url || item.data.post_url,
//       title: item.data.title != null ? item.data.title : void 0,
//       description: (item.oembed.description != null ? (item.data.description != null) || item.oembed.description : void 0) ? item.data.description : void 0
//     };
//   }
//   if (item.data.photos != null) {
//     result.picture = {
//       url: item.data.photos[0].alt_sizes[0].url,
//       width: item.data.photos[0].alt_sizes[0].width,
//       height: item.data.photos[0].alt_sizes[0].height
//     };
//     thumb_index = item.data.photos[0].alt_sizes.length - 1;
//     result.thumbnail = {
//       url: item.data.photos[0].alt_sizes[thumb_index].url,
//       width: item.data.photos[0].alt_sizes[thumb_index].width,
//       height: item.data.photos[0].alt_sizes[thumb_index].height
//     };
//   }
//   if (item.oembed.type != null) {
//     result.type = item.oembed.type;
//   }
//   if (item.data.note_count != null) {
//     result.popularity = item.data.note_count;
//   }
//   result.source_service = item.oembed.source_name;
//   return result;
// };
// 
// Normalizer.prototype.instagram = function(item) {
//   var result, tempMoment, _ref, _ref1, _ref2;
//   result = {};
//   if (item.data.created_time != null) {
//     tempMoment = moment.unix(item.data.created_time);
//     result.date = tempMoment.format(dateFormat);
//     result.date4sorting = parseInt(tempMoment.format(date4sorting));
//   }
//   if (((_ref = item.data.user) != null ? _ref.username : void 0) != null) {
//     result.author = {
//       name: item.data.user.full_name,
//       id: item.data.user.id,
//       url: "http://instagram.com/" + item.data.user.username + "/",
//       thumbnail: {
//         url: item.data.user.profile_picture
//       }
//     };
//   }
//   if (((_ref1 = item.data.caption) != null ? _ref1.text : void 0) != null) {
//     result.title = item.data.caption.text;
//   }
//   if (item.data.tags != null) {
//     result.tags = item.data.tags;
//   }
//   if (item.data.images != null) {
//     result.picture = {
//       url: item.data.images.standard_resolution.url,
//       width: item.data.images.standard_resolution.width,
//       height: item.data.images.standard_resolution.height
//     };
//     result.thumbnail = {
//       url: item.data.images.thumbnail.url,
//       width: item.data.images.thumbnail.width,
//       height: item.data.images.thumbnail.height
//     };
//   }
//   if (item.data.link != null) {
//     result.link = {
//       url: item.data.link,
//       title: result.title != null ? result.title : void 0
//     };
//   }
//   if (item.oembed.type != null) {
//     result.type = item.oembed.type;
//   }
//   if (((_ref2 = item.data.likes) != null ? _ref2.count : void 0) != null) {
//     result.popularity = item.data.likes.count;
//   }
//   result.source_service = item.oembed.source_name;
//   return result;
// };
// 
// Normalizer.prototype.youtube = function(item) {
//   var dateFormatYoutube, linkIndex, result, sizes, tempMoment, thumbIndex, types, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
//   result = {};
//   dateFormatYoutube = "YYYY-MM-DD\THH:mm:ss\.[000]ZZ";
//   if (((_ref = item.data.published) != null ? _ref.$t : void 0) != null) {
//     tempMoment = moment(item.data.published.$t, dateFormatYoutube);
//     result.date = tempMoment.format(dateFormat);
//     result.date4sorting = parseInt(tempMoment.format(date4sorting));
//   }
//   if (item.data.author != null) {
//     result.author = {
//       name: item.data.author[0].name.$t,
//       id: item.data.author[0].yt$userId.$t,
//       url: "http://www.youtube.com/user/" + (item.data.author[0].name.$t.replace(/\s/g, '')),
//       thumbnail: {
//         url: '/images/user_blue.png'
//       }
//     };
//   }
//   if (((_ref1 = item.data.title) != null ? _ref1.$t : void 0) != null) {
//     result.title = item.data.title.$t;
//   }
//   if (((_ref2 = item.data.media$group) != null ? (_ref3 = _ref2.media$description) != null ? _ref3.$t : void 0 : void 0) != null) {
//     result.message = item.data.media$group.media$description.$t;
//   }
//   if (((_ref4 = item.data.media$group) != null ? (_ref5 = _ref4.media$keywords) != null ? _ref5.$t : void 0 : void 0) != null) {
//     result.tags = item.data.media$group.media$keywords.$t.replace(/\s+/g, '').split(",");
//   }
//   if (((_ref6 = item.data.media$group) != null ? _ref6.media$thumbnail : void 0) != null) {
//     sizes = _.pluck(item.data.media$group.media$thumbnail, 'yt$name');
//     thumbIndex = _.indexOf(sizes, 'mqdefault');
//     result.thumbnail = {
//       url: item.data.media$group.media$thumbnail[thumbIndex].url,
//       widht: item.data.media$group.media$thumbnail[thumbIndex].width,
//       height: item.data.media$group.media$thumbnail[thumbIndex].height
//     };
//   }
//   if (item.data.link != null) {
//     types = _.pluck(item.data.link, 'rel');
//     linkIndex = _.indexOf(types, 'alternate');
//     result.link = {
//       url: item.data.link[linkIndex].href,
//       title: result.title
//     };
//   }
//   result.type = 'video';
//   if (((_ref7 = item.data.yt$rating) != null ? _ref7.numLikes : void 0) != null) {
//     result.popularity = parseInt(item.data.yt$rating.numLikes);
//   }
//   result.source_service = item.oembed.source_name;
//   return result;
// };
// 



module.exports = new Normalizer();