const { Integer, String, Date, Boolean, Text } = require('../utils/types');
const seq = require('../utils/seq');

const User = seq.define('user', {
  user_id: {
    type: Integer.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  nick: {
    type: String(10),
    allowNull: false,
  },
  password: {
    type: String(50),
    allowNull: false,
  },
  user_name: {
    type: String(25),
    allowNull: false,
    unique: true,
  },
});

module.exports = User;
