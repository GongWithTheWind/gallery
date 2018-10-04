var mysql = require('mysql');
const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  database: 'treypurnell',
});

client.connect();

var getImages = function(homeId, callback) {
  console.log('GET REQUEST MADE', homeId, callback);
  client.query(`SELECT image, caption from images where home_id = ${homeId}`)
    .then((result) => {
      console.log(result.rows);
      callback(null, result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

const postImage = function(homeId, imageId, caption, callback) {
  console.log('POST REQUEST MADE', homeId, imageId, caption);  
  const newImage = `https://loremflickr.com/320/240?lock=${imageId}`;
  const query = `INSERT INTO images (home_id, image, image_id, caption) VALUES ($1, $2, $3, $4) RETURNING *`;
  const queryArgs = [homeId, newImage, imageId, caption];
  console.time('timer');
  client.query(query, queryArgs)
    .then((result) => {
      console.log(result);
      callback(null, 200);
      console.timeEnd('timer'); // -> 41ms to and fro after receiving the request. 
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteImage = function(homeId, imageId, callback) {
  console.log('DELETE REQUEST MADE', homeId, imageId);
  client.query(`DELETE FROM images where home_id = ${homeId} AND image_id = ${imageId}`)
    .then((result) => {
      console.log(result);
      callback(null, 200);
    })
    .catch((err) => {
      console.log(err);
    });
}

const updateImage = function(id, oldLoc, oldNum, newLoc, newNum, callback) {
  const newImage = `http://d17fsphohqa4x.cloudfront.net/homeimages/${newLoc}/${newLoc}${newNum}1.jpg` 
  const query = `
  UPDATE homeImages set image = '${newImage}'
  WHERE home_id = '${id}' AND 
  (image LIKE '%${oldLoc}${oldNum}%')`;

  console.log(id, oldNum, oldLoc, newNum, newLoc);

  connection.query(query, ((err, result) => {
    if (err) console.log(err);
    console.log(result);
    console.log('successful update!!');
    callback(result);
  }));

  console.log('updateImage');
};
 

// {"oldLocation": "joshua","oldNumber": "23","newLocation": "japan!","newNumber": "13"}

module.exports = {
  getImages,
  postImage,
  deleteImage,
  updateImage,
};

