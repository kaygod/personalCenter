const moment = require('moment');

exports.getSequenceDays = (list) => {
  if (list.length == 0) {
    return 0;
  }

  let sequence_arr = [];

  const days = [];

  list.forEach((item) => {
    if (sequence_arr.length == 0) {
      sequence_arr.push(item);
    } else {
      const max_date = sequence_arr[sequence_arr.length - 1];
      if (moment(max_date).add(1, 'days').format('YYYY-MM-DD') == item) {
        sequence_arr.push(item);
      } else {
        days.push(sequence_arr.length);
        sequence_arr = [item];
      }
    }
  });

  days.push(sequence_arr.length);

  return Math.max(...days);
};
