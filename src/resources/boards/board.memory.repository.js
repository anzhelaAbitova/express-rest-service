const boards = new Map();

const getAll = async () => boards;

const errNoId = (el) =>
  !el(() => {
    throw new Error('No such id');
  })();

const add = async (board) => {
  boards.set(board.id, board);
  return board;
};

const get = async (id) => {
  try {
    errNoId(boards.get(id));
    return boards.get(id);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const update = async (id, params) => {
  try {
    errNoId(boards.get(id));
    const board = boards.get(id);
    board.title = params.title;
    return board;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const remove = async (id) => {
  try {
    errNoId(boards.get(id));
    return boards.delete(id);
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { getAll, add, get, update, remove };
