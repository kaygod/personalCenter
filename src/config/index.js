const host = 'localhost';
const secretKey = 'wang_kai_is_god';

module.exports = {
  db: {
    username: 'root',
    password: '123123',
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
