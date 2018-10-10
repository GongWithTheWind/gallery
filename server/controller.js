const db = require('../database/db-mysql');
const redis = require('redis');
const redisClient = redis.createClient(6379);


module.exports = {
  get: function(req, res) {
    let callback = (err, data) => {
      res.send(data);
      redisClient.setex(req.params.homeId.toString(), 360, JSON.stringify(data));
    };

    redisClient.get(req.params.homeId.toString(), function(err, response) {
      if(err) console.log(err)
      if (response != null) {
        res.send(JSON.parse(response));
      } else {
        db.getImages(req.params.homeId, callback.bind(this));
      }
    })
  
    // db.getImages(req.params.homeId, callback.bind(this));
  },
  post: function(req, res) {
    db.postImage(
      req.params.homeId,
      req.body.imageId, 
      req.body.caption, 
      res.send.bind(res));
  },
  patch: function(req, res) {
    db.updateImage(
      req.params.homeId,
      req.body.imageId, 
      req.body.caption,      
      res.send.bind(res));
  },
  delete: function(req, res) {
    db.deleteImage(
      req.params.homeId,
      req.body.imageId,
      res.send.bind(res)
    );
  }
};
