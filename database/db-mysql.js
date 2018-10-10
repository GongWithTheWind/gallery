var mysql = require('mysql');
const { Pool, Client } = require('pg');

// const client = new Client({
//   host: 'localhost',
//   database: 'treypurnell',
// });

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: '5432',
  user: process.env.PG_USER || 'treypurnell',
  password: process.env.PG_PASSWORD || '',
  database: process.env.PG_DB || 'treypurnell',  
  max: 40,
})
// client.connect();

console.log(
  process.env.PG_HOST,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  process.env.PG_DB
)

let counter = 0;

var getImages = function(homeId, callback) {
  pool.query(`SELECT image, caption from images where home_id = ${homeId}`)
    .then((result) => {
      // console.log(counter++)
      callback(null, result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

const postImage = function(homeId, imageId, caption, callback) {
  const newImage = `https://loremflickr.com/320/240?lock=${imageId}`
  const query = `INSERT INTO images (home_id, image, image_id, caption) VALUES ($1, $2, $3, $4) RETURNING *`;
  const queryArgs = [homeId, newImage, imageId, caption];
  pool.query(query, queryArgs)
    .then((result) => {
      callback(null, 200);
    })
    .catch((err) => {
    });
};

const deleteImage = function(homeId, imageId, callback) {
  pool.query(`DELETE FROM images where home_id = ${homeId} AND image_id = ${imageId}`)
    .then((result) => {
      callback(null, 200);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateImage = function(homeId, imageId, newCaption, callback) {
  client.query(
    `UPDATE images set caption = '${newCaption}' 
    where home_id = ${homeId} 
    AND image_id = ${imageId}`)
    .then((result) => {
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

