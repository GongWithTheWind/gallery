const Json2csvParser = require('json2csv').Parser;
const fields = ["home_id", "image_id", "caption"];
const j2p = new Json2csvParser({ fields });

const fs = require('fs');
const faker = require('faker');

function genCSV () {
  let rows = [];
  for (let i = 0; i < 10000; i++) {
    rows.push({
      "home_id": Math.floor(Math.random() * 10000000), 
      "image_id": Math.floor(Math.random() * 35000),
      "caption": faker.lorem.sentence()
    })
  }
  const csv = j2p.parse(rows);
  fs.writeFile(`./rows.csv`, csv, (err, result) => {
    if(err) console.log(err);
    console.log(result);
  })
}

genCSV();