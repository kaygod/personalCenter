const host = 'localhost';

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
  salt: 'wang_kai_is_god',
};
