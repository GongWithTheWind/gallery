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

const postImage = function(homeId, location, number, callback) {
  const newImage = `http://d17fsphohqa4x.cloudfront.net/homeimages/${location}/${location}${number}.jpg` 
  const query = `INSERT INTO homeImages (home_id, image, caption) VALUES ("${homeId}", "${newImage}", "Lorem Ipsum")`
  connection.query(query, ((err, result) => {
    if(err) console.log(err)
    console.log('successful post!!')
    callback(result);
  }))
}

const deleteImage = function(homeId, location, number, callback) {
  const query = `
    DELETE FROM homeImages 
    WHERE home_id = ${homeId} AND
    (image LIKE '%${location}${number}%')
  `
  connection.query(query, ((err, result) => {
    if (err) console.log(err)
      console.log('successful deletion!!')
      callback(result);
  }))
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

