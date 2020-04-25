const Record = require('../models/record');
const Task = require('../models/task');
const {seq} = require("../utils/seq");
const { Sequelize } = require('sequelize');
const { getDate } = require("../utils/tool");
const { Op } = require('sequelize');

/**
 * 查询记录
 */
exports.getRecord = async (user_id, date)=>{
  
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
 * 查询记录
 */
exports.isRecordExist = async (user_id,date)=>{
  const result = await Record.findOne({
    where:{
      user_id,
      date:{
        [Op.startsWith]:getDate(date,2)
      }
    }
  })
  if(result == null){
    return false
  }else{
    return result.dataValues;
  }
}

/**
 * 修改记录
 */
exports.updateRecord = async ({date,user_id,declaration,is_record})=>{
  
 const result = await Record.update({
  declaration,
  is_record
 },{
   where:{
    user_id,
    date:{
      [Op.startsWith]:getDate(date,2)      
    }
   }
 })

 return result[0] > 0;

}

/**
 * 增加记录
 */
exports.addRecord = async ({date,user_id,declaration,is_record}) => {

  const result =  await Record.create({
    record_id:null,
    date,
    is_record,
    user_id,
    declaration
  })
  
  return result.dataValues;

};

/**
 * 
 * @param {删除任务} record_id 
 */
exports.delTasks = async (record_id)=>{

  await Task.destroy({
    force: true,
    where: {
      record_id
    }  
  });

}

/**
 * 增加任务
 */
exports.addTasks = async (record_id,tasks) => {

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
