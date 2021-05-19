const tasks = new Map();

const errNoBoard = (el) =>
  !el(() => {
    throw new Error('No such board');
  })();

const getAll = async (boardId) => {
  try {
    errNoBoard(tasks.has(boardId));
    return tasks.get(boardId);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const get = async (boardId, taskId) => {
  try {
    errNoBoard(tasks.has(boardId));
    const result = tasks.get(boardId).find((task) => task.id === taskId);
    if (!result) {
      throw new Error(`Wrong task id ${taskId}`);
    }
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const add = async (task) => {
  if (!tasks.has(task.boardId)) {
    tasks.set(task.boardId, []);
  }
  tasks.get(task.boardId).push(task);
  return task;
};

const removeByBoardId = async (boardId) => {
  try {
    errNoBoard(tasks.has(boardId));
    return tasks.delete(boardId);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const remove = async (boardId, taskId) => {
  try {
    errNoBoard(tasks.has(boardId));
    tasks.set(
      boardId,
      tasks.get(boardId).filter((task) => task.id !== taskId)
    );
    return true
  } catch (error) {
    console.log(error);
    return false;
  }
};

const update = async (boardId, taskId, newTask) => {
  const task = await get(boardId, taskId);

  ['title', 'order', 'description', 'userId', 'columnId', 'boardId'].forEach(
    (item) => {
      task[item] = newTask[item];
    }
  );

  return task;
};

const cleanUser = async (userId) =>
  tasks.forEach((value, key) => {
    value.forEach((task, index) => {
      if (task.userId === userId) {
        tasks.get(key)[index].userId = null;
      }
    });
  });

module.exports = {
  getAll,
  get,
  add,
  removeByBoardId,
  remove,
  update,
  cleanUser
};
