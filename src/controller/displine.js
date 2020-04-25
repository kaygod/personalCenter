const { Success, Fail } = require('../models/Response');
const sequelize = require('../utils/seq');
const { getRecord,isRecordExist,updateRecord,addRecord,delTasks,addTasks } = require("../service/displine");
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
exports.punchClock = async ({  user_id, date, tasks,declaration,is_record }) => {
  const t = await sequelize.transaction();
  try {
    let record = await isRecordExist(user_id,date);//查询有没有记录
    let flag = 1;//修改
    if(record){ //修改
      await updateRecord({
        date,
        user_id,
        declaration,
        is_record
      });
    }else{//新增
      record = await addRecord({
        date,
        user_id,
        declaration,
        is_record
      });
      flag = 2;
    }
    if(tasks.length > 0){
      if(flag == 1){
        await delTasks(record.record_id);
      }
      await addTasks(record.record_id, tasks);
    }
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
