const Record = require('../models/record');
const Task = require('../models/task');
const {seq} = require("../utils/seq");
const { Sequelize } = require('sequelize');

/**
 * 查询记录
 */
exports.getRecord = (user_id, date)=>{
  
  const sql = `SELECT a.record_id,a.date,a.is_record,b.task_id,b.content,b.is_comple FROM records AS a INNER JOIN tasks As b ON a.record_id = b.record_id where a.user_id = :user_id AND a.date=:date`;

  const result = await seq.query(sql,  {
    replacements: {
        user_id,
        date
    },
    type: Sequelize.QueryTypes.SELECT }
  );

  const data = result.dataValues;

  if(data.length == 0){
    return null;
  }else{
      const tasks = [];
      const { record_id,date,is_record } = data[0];
      data.map((item)=>{
        const { task_id,content,is_comple } = item;
        tasks.push({
          task_id,
          content,
          is_comple
        })
      })
      return {
        record_id,
        date,
        is_record,
        tasks
      }
  }
}

/**
 * 增加记录
 */
exports.addRecord = (date, user_id ) => {

  const result =  await Record.create({
    record_id:null,
    date,
    is_record:1,
    user_id
  })
  
  return result.dataValues;

};

/**
 * 增加任务
 */
exports.addTasks = (record_id,tasks) => {

   const result = await Task.bulkCreate(tasks.map((item)=>{
      return {
        task_id:null,
        content:item.content,
        is_comple:item.is_comple,
        record_id
      }
   }))

   return result.dataValues;

};
