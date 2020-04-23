const { Success, Fail } = require('../models/Response');
const { sequelize } = require('../utils/seq');
/**
 * 获取某一天的打卡记录
 */
exports.getTodo = async (user_id, date) => {
  const result = await getRecord(user_id, date);
  if ((result = null)) {
    return new Success({ is_record: 0 });
  } else {
    return new Success(result);
  }
};

/**
 * 开始打卡
 */
exports.punchClock = async ({ user_id, date, tasks }) => {
  const t = await sequelize.transaction();
  try {
    const record = await addRecord({
      date,
      user_id,
    });
    await addTasks(record.record_id, tasks);
    // 我们提交事务.
    await t.commit();
    return new Success();
  } catch (error) {
    // 如果执行到达此行,则抛出错误.
    // 我们回滚事务.
    await t.rollback();
    return new Fail(200, '添加任务列表失败');
  }
};
