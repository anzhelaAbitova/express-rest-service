const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');
const boardService = require('../boards/board.service');
const userService = require('../users/user.service');

const items = [
  'title',
  'order',
  'description',
  'userId',
  'boardId',
  'columnId'
];

const errIdInvalid = (el) =>
  !el(() => {
    throw new Error('Id invalid');
  })();

const errNoData = (el) =>
  !el(() => {
    throw new Error('There no data');
  })();

const getAll = async (boardId) => tasksRepo.getAll(boardId);

const get = async (boardId, taskId) => tasksRepo.get(boardId, taskId);

const checkId = async (task) => {
  try {
    const { boardId, columnId, userId } = task;
    errIdInvalid(boardService.get(boardId));
    const board = boardService.get(boardId);
    errIdInvalid(board.getColumn(columnId));
    errIdInvalid(userService.get(userId));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const add = async (boardId, params) => {
  errNoData(params);
  const task = new Task();

  task.boardId = boardId;
  items.forEach((el) => {
    if (params[el]) {
      task[el] = params[el];
    }
  });
  if (checkId()) tasksRepo.add(task);
  return task;
};

const update = async (boardId, taskId, params) => {
  errNoData(params);
  const task = new Task();
  task.boardId = boardId;
  items.forEach((el) => {
    if (params[el]) {
      task[el] = params[el];
    }
  });
  if (checkId()) tasksRepo.update(boardId, taskId, task);
  return task;
};

const remove = async (boardId, taskId) => tasksRepo.remove(boardId, taskId);

const cleanUser = async (boardId, taskId) =>
  tasksRepo.cleanUser(boardId, taskId);

module.exports = { getAll, get, add, update, remove, cleanUser };
