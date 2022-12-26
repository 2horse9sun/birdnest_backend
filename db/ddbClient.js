// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

// Set the region 
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const unmarshell = (data) => {
    return AWS.DynamoDB.Converter.unmarshall(data);
}

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