const Record = require('../models/record');
const Task = require('../models/task');
const seq = require('../utils/seq');
const { Sequelize } = require('sequelize');
const { getDate } = require('../utils/tool');
const { Op } = require('sequelize');
const moment = require('moment');

/**
 * 查询总共的日期
 */
exports.queryDays = async (user_id) => {
  const list = await Record.findAll({
    attributes: ['date'],
    where: {
      user_id,
      is_record: 1,
    },
    order: [['date']],
  });

  if (list == null) {
    return [];
  } else {
    return list.map((item) => {
      return item.dataValues;
    });
  }
};

/**
 * 查询当月的日期(要获取前后三个月的数据集合)
 */
exports.currentMonthDays = async (user_id, date) => {
  const startDate = moment(date).subtract(1,'months').format("YYYY-MM-DD");//获取上一个月的日期
  const endDate = moment(date).add(2,'months').format("YYYY-MM-DD");//获取下两个月的日期

  const result = await Record.findAll({
    attributes: ['date'],
    where: {
      user_id,
      is_record: 1,
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  if (result == null) {
    return [];
  } else {
    return result.map((data) => {
      return moment(data.dataValues.date).format('YYYY-MM-DD');
    });
  }
};

/**
 * 查询记录
 */
exports.getRecord = async (user_id, date) => {
  const sql = `SELECT a.record_id,DATE_FORMAT(a.date,'%Y-%m-%d') as date,a.is_record,a.declaration,b.task_id,b.content,b.is_complete FROM records AS a INNER JOIN tasks As b ON a.record_id = b.record_id where a.user_id = :user_id AND datediff (a.date,:date) = 0`;

  const result = await seq.query(sql, {
    replacements: {
      user_id,
      date,
    },
    type: Sequelize.QueryTypes.SELECT,
  });

  if (result.length == 0) {
    return null;
  } else {
    const tasks = [];
    const { record_id, date, is_record, declaration } = result[0];
    result.map((item) => {
      const { task_id, content, is_complete } = item;
      tasks.push({
        task_id,
        content,
        is_complete,
      });
    });
    return {
      declaration,
      record_id,
      date,
      is_record,
      tasks,
    };
  }
};

/**
 * 查询记录
 */
exports.isRecordExist = async (user_id, date) => {
  const result = await Record.findOne({
    where: {
      user_id,
      date: {
        [Op.startsWith]: getDate(date, 2),
      },
    },
  });
  if (result == null) {
    return false;
  } else {
    return result.dataValues;
  }
};

/**
 * 修改记录
 */
exports.updateRecord = async ({ date, user_id, declaration, is_record }) => {
  const result = await Record.update(
    {
      declaration,
      is_record,
    },
    {
      where: {
        user_id,
        date: {
          [Op.startsWith]: getDate(date, 2),
        },
      },
    }
  );

  return result[0] > 0;
};

/**
 * 增加记录
 */
exports.addRecord = async ({ date, user_id, declaration, is_record }) => {
  const result = await Record.create({
    record_id: null,
    date,
    is_record,
    user_id,
    declaration,
  });

  return result.dataValues;
};

/**
 *
 * @param {删除任务} record_id
 */
exports.delTasks = async (record_id) => {
  await Task.destroy({
    force: true,
    where: {
      record_id,
    },
  });
};

/**
 * 增加任务
 */
exports.addTasks = async (record_id, tasks) => {
  const result = await Task.bulkCreate(
    tasks.map((item) => {
      return {
        task_id: null,
        content: item.content,
        is_complete: item.is_complete,
        record_id,
      };
    })
  );

  return result.dataValues;
};
