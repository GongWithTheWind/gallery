var mysql = require('mysql');
const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  database: 'treypurnell',
});

client.connect();

var getImages = function(homeId, callback) {
  // console.log('GET REQUEST MADE', homeId, callback);
  client.query(`SELECT image, caption from images where home_id = ${homeId}`)
    .then((result) => {
      // console.log(result.rows);
      callback(null, result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

const postImage = function(homeId, imageId, caption, callback) {
  // console.log('POST REQUEST MADE', homeId, imageId, caption);  
  const query = `INSERT INTO images (home_id, image, image_id, caption) VALUES ($1, $2, $3, $4) RETURNING *`;
  const queryArgs = [homeId, newImage, imageId, caption];
  // console.time('timer');
  client.query(query, queryArgs)
    .then((result) => {
      // console.log(result);
      callback(null, 200);
    })
    .catch((err) => {
    });
};

const deleteImage = function(homeId, imageId, callback) {
  // console.log('DELETE REQUEST MADE', homeId, imageId);
  client.query(`DELETE FROM images where home_id = ${homeId} AND image_id = ${imageId}`)
    .then((result) => {
      // console.log(result);
      callback(null, 200);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateImage = function(homeId, imageId, newCaption, callback) {
  // console.log('PATCH REQUEST MADE', homeId, imageId, newCaption);
  client.query(
    `UPDATE images set caption = '${newCaption}' 
    where home_id = ${homeId} 
    AND image_id = ${imageId}`)
    .then((result) => {
      // console.log(result);
      callback(null, 200);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getImages,
  postImage,
  deleteImage,
  updateImage,
};

