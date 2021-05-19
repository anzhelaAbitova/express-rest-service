const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = async () => usersRepo.getAll();

const errNoData = (el) =>
  !el ||
  !el.name ||
  !el.login ||
  !el.password(() => {
    throw new Error('There no data');
  })();

const add = async (params) => {
  try {
    errNoData(params);
    const user = new User();
    user.name = params.name;
    user.login = params.login;
    user.password = params.password;
    usersRepo.add(user);
    return user;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const get = async (id) => {
  try {
    return usersRepo.get(id);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const update = async (id, params) => {
  try {
    errNoData(params);
    return usersRepo.update(id, params);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const remove = async (id) => {
  await usersRepo.remove(id);
  await tasksRepo.cleanUser(id);
};

module.exports = { getAll, add, get, update, remove };
