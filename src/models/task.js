const { Integer, String, Date, Boolean, Text } = require('../utils/types');
const seq = require('../utils/seq');

const Task = seq.define('task', {
  task_id: {
    type: Integer.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: String(30),
    allowNull: false,
  },
  is_complete: {
    type: Boolean,
    defaultValue: 0,
  },
  record_id:{
    type: Integer.UNSIGNED,
    allowNull: false,
  }
});

module.exports = Task;
