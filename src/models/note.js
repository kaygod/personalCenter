const { Integer, String, Date, Boolean, Text } = require('../utils/types');
const seq = require('../utils/seq');

const Note = seq.define('note', {
  note_id: {
    type: Integer.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: Integer.UNSIGNED,
    allowNull: false,
  },
  title: {
    type: String(25),
    allowNull: false,
  },
  content: {
    type: Text,
    allowNull: false,
  },
});

module.exports = Note;
