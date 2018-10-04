const db = require('../database/db-mysql');

module.exports = {
  get: function(req, res) {
    let callback = (err, data) => {
      res.send(data);
    };
    db.getImages(req.params.homeId, callback);
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
      req.body.oldLocation, 
      req.body.oldNumber, 
      req.body.newLocation, 
      req.body.newNumber,      
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
