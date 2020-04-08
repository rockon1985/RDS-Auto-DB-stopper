'use strict';
const AWS = require("aws-sdk");
AWS.config.update({region : 'ap-south-1'});
const rds = new AWS.RDS({ apiVersion: '2014-10-31' });

const toggleDB = (event, action, callback) => {
  const instanceId = event.instanceId || process.env.INSTANCE_ID;
  const handler = action === 'stop' ? 'stopDBInstance' : 'startDBInstance'; 
  rds[handler]({ DBInstanceIdentifier: instanceId }, (err, data) => {
    console.log(`action completed: ${ err || data }`)
    callback(null, getResponse(err, data))  
  });
}

// Helper methods
const getResponse = (err, data) => {
  const response = {
    statusCode: err ? 400 : 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(err || data)
  }
  return response;
}

// handler methods
module.exports.stopDB = (event, context, callback) => toggleDB(event, 'stop', callback);
module.exports.startDB = (event, context, callback) => toggleDB(event, 'start', callback);