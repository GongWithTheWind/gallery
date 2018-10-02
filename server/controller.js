const db = require('../database/db-mysql');

module.exports = {
  get: function(req, res) {
    // console.log('REQUEST RECEIVED', req.params.homeId)
    let callback = (err, data) => {
      res.send(data)
    };
    db.getImages(req.params.homeId, callback)  
  },
  post: function(req, res) {
    db.postImage(
      req.params.homeId,
      req.body.location, 
      req.body.number, 
      res.send.bind(res))
    // db.postImage(  , res.send.bind())
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
      req.body.location,
      req.body.number,
      res.send.bind(res)
    )
  }
}