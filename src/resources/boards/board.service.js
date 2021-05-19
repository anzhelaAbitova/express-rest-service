const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
const Board = require('./board.model');

const getAll = async () => boardsRepo.getAll();

const errNoData = (el) =>
  !el ||
  !el.title ||
  (!el.columns &&
    (() => {
      throw new Error('There no data');
    })());

const add = async (element) => {
  try {
    errNoData(element);
    const board = new Board();
    board.title = element.title;
    board.setColumnsFromArray(element.columns);

    boardsRepo.add(board);
    return board;
  } catch (error) {
    return console.log(error);
  }
};

const get = async (id) => boardsRepo.get(id);

const update = async (id, element) => {
  try {
    errNoData(element);
    const board = await boardsRepo.update(id, element);
    element.columns.forEach((columnArr) => {
      try {
        const column = board.getColumn(columnArr.id);
        column.title = columnArr.title;
        column.order = columnArr.order;
      } catch {
        board.setColumnsFromArray(columnArr);
      }
    });
    return board;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const remove = async (id) => {
  await tasksRepo.removeByBoardId(id);
  await boardsRepo.remove(id);
};

module.exports = { getAll, add, get, update, remove };
