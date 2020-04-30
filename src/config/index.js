const host = 'localhost';
const secretKey = 'wang_kai_is_god';

module.exports = {
  db: {
    username: 'root',
    password: '4452279',
    dialect: 'mysql',
    host,
  },
  _redis: {
    host,
    port: 6379,
  },
  salt: secretKey,
  security: {
    secretKey,
    expiresIn: 60 * 60 * 24 * 30,
  },
};
