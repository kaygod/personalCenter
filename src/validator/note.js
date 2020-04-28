const { validate } = require('./validator');
const { Fail } = require('../models/Response');

const SCHEMA = {
  type: 'object',
  properties: {
    note_id: {
      type: ['string', 'integer'],
      pattern: '\\d+',
    },
    title: {
      type: 'string',
      defaultValue: '',
    },
    content: {
      type: 'string',
      defaultValue: '',
    },
  },
};

const getScheme = (key) => {
  const data = { ...SCHEMA };
  if (key === 'note_detail') {
    data['required'] = ['note_id'];
    return data;
  } else if (key == 'submmit_note') {
    data['required'] = ['title', 'content'];
    return data;
  } else if (key == 'update_note') {
    data['required'] = ['note_id', 'content'];
    return data;
  } else if (key == 'del_note') {
    data['required'] = ['note_id'];
    return data;
  } else {
    data['required'] = [];
    return data;
  }
};

exports.noteValidate = (data, key, ctx) => {
  return validate(getScheme(key), data, ctx);
};
