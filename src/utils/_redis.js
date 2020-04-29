const redis = require('redis');

const { _redis } = require('../config');

const client = redis.createClient({
  host: _redis.host,
  port: _redis.port,
});

client.on('error', function (error) {
  console.log('redis连接失败......');
});

exports.get = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, result) => {
      if (err || result === undefined || result === null) {
        resolve(null);
        return false;
      }
      result = JSON.parse(result);
      resolve(result);
    });
  });
};

exports.set = (key, value) => {
  if (typeof value !== 'string' && value !== null) {
    value = JSON.stringify(value);
  }
  client.set(key, value);
};

exports.del = (key) => {
  client.del(key);
};
