const { validate } = require('./validator');
const { addKey } = require('../validator/validator');

addKey('validateRecord', (data) => {
  if (data.is_record == 1 && data.tasks.length == 0) {
    return '一个任务都没有不允许打卡!';
  } else {
    return false;
  }
});

const SCHEMA = {
  type: 'object',
  properties: {
    date: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
    },
    declaration: {
      type: 'string',
      defaultValue: '',
    },
    year: {
      type: ['string', 'integer'],
      pattern: '^\\d{4}$',
    },
    month: {
      type: ['string', 'integer'],
      pattern: '^\\d{1,2}$',
    },
    is_record: {
      type: ['string', 'integer'],
      pattern: '^\\d{1}$',
      validateRecord: true,
    },
    tasks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          content: {
            type: 'string',
          },
          is_complete: {
            type: ['string', 'integer'],
            pattern: '\\d{1}',
          },
        },
        required: ['content', 'is_complete'],
      },
    },
  },
};

const getScheme = (key) => {
  const data = { ...SCHEMA };
  if (key === 'get_todo') {
    data['required'] = ['date'];
    return data;
  } else if (key === 'clock') {
    data['required'] = ['is_record'];
    return data;
  } else if (key == 'month_records') {
    data['required'] = ['year', 'month'];
    return data;
  }
};

exports.displineValidate = (data, key, ctx) => {
  return validate(getScheme(key), data, ctx);
};
