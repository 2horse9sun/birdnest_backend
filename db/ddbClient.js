// AWS DynamoDB client config
const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


// Parse DynamoDB item format into JSON format
const unmarshell = (data) => {
    return AWS.DynamoDB.Converter.unmarshall(data);
}


//===============DynamoDB access methods==================
const query = (params) => {
    const promise = new Promise((resolve, reject) => {
        ddb.query(params, function(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data.Items);
            }
          });
    })
    return promise;
}


const putItem = (params) => {
    const promise = new Promise((resolve, reject) => {
        ddb.putItem(params, function(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
    })
    return promise;
}


const batchWriteItem = (params) => {
    const promise = new Promise((resolve, reject) => {
        ddb.batchWriteItem(params, function(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
    })
    return promise;
}


const scan = (params) => {
    const promise = new Promise((resolve, reject) => {
        ddb.scan(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data.Items);
            }
          });
    })
    return promise;
}


module.exports = {
    unmarshell,
    query,
    putItem,
    batchWriteItem,
    scan
}