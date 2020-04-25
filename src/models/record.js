const { Integer, String, Date, Boolean, Text } = require('../utils/types');
const seq = require('../utils/seq');
const moment = require('moment');

const Record = seq.define('record', {
  record_id: {
    type: Integer.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: Date,
    allowNull: false,
    get() {
      return moment(this.getDataValue('date')).format('YYYY-MM-DD');
    }
  },
  is_record: {
    type: Boolean,
    defaultValue: 0,
  },
  user_id: {
    type: Integer.UNSIGNED,
    allowNull: false,
  },
  declaration:{
    type:String(500),
    defaultValue:""
  }
});

module.exports = Record;
