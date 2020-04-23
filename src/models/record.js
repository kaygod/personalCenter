const { Integer, String, Date, Boolean, Text } = require('../utils/types');
const seq = require('../utils/seq');

const Record = seq.define('record', {
  record_id: {
    type: Integer.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: Date,
    allowNull: false,
  },
  is_record: {
    type: Boolean,
    defaultValue: 0,
  },
  user_id: {
    type: Integer.UNSIGNED,
    allowNull: false,
  },
});

module.exports = Record;
