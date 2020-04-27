const {
  queryNote,
  queryNoteList,
  addNote,
  updateNote,
  delNote,
} = require('../service/user');
const { Success, Fail } = require('../models/Response');
const { md5, delProp, generateToken } = require('../utils/tool');

/**
 * 查询单个笔记详情
 */
exports.getDeatil = async (user_id, note_id) => {
  const result = await queryNote(user_id, note_id);
  if (result == null) {
    return new Fail('300', '没有此笔记!');
  }
  return new Success(result);
};

/**
 * 查询某用户的笔记列表
 */
exports.getList = async (user_id) => {
  const result = await queryNoteList(user_id);
  if (result == null) {
    return new Success([]);
  }
  return new Success(result);
};

/**
 * 提交笔记
 */
exports.submmitData = async (user_id, title, content) => {
  const result = await addNote(user_id, title, content);
  return new Success(result);
};

/**
 * 更新笔记
 */
exports.updateData = async (user_id, note_id, content) => {
  const result = await updateNote(user_id, note_id, content);
  if (!result) {
    return new Fail('330', '笔记更新失败!');
  }
  return new Success();
};

/**
 * 删除笔记
 */
exports.delData = async (user_id, note_id) => {
  const result = await delNote(user_id, note_id);
  if (!result) {
    return new Fail('340', '笔记删除失败!');
  }
  return new Success();
};
