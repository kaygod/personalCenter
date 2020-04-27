const Note = require('../models/note');
const seq = require('../utils/seq');
const { Sequelize } = require('sequelize');
const { getDate } = require('../utils/tool');
const { Op } = require('sequelize');
const moment = require('moment');

/**
 * 查询笔记详情
 */
exports.queryNote = async (user_id, note_id) => {
  const result = await Note.findOne({
    attributes: ['note_id', 'title', 'content', 'update_date'],
    where: {
      user_id,
      note_id,
    },
  });
  if (result === null) {
    return null;
  } else {
    result.dataValues;
  }
};

/**
 * 获取一组笔记
 */
exports.queryNoteList = async (user_id) => {
  const result = await Note.findList({
    attributes: ['note_id', 'title'],
    where: {
      user_id,
    },
  });
  if (result == null) {
    return null;
  } else {
    return result.map((item) => {
      return item.dataValues;
    });
  }
};

/**
 * 提交笔记
 */
exports.addNote = async (user_id, title, content) => {
  const result = await Note.create({
    user_id,
    title,
    content,
  });

  return result.dataValues;
};

/**
 * 更新笔记
 */
exports.updateNote = async (user_id, note_id, content) => {
  const result = await Note.update(
    {
      content,
    },
    {
      where: {
        note_id,
        user_id,
      },
    }
  );

  return result[0] > 0;
};

/**
 * 删除笔记
 */
exports.delNote = async (user_id, note_id) => {
  const result = await Note.destroy({
    force: true,
    where: {
      user_id,
      note_id,
    },
  });

  return result[0] > 0;
};
