const users = new Map();

const errNoUser = (el) =>
  !el(() => {
    throw new Error('No such user');
  })();

const getAll = async () => users;

const add = async (user) => {
  users.set(user.id, user);
  return user;
};

const get = async (id) => {
  try {
    errNoUser(users.get(id));
    return users.get(id);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const update = async (id, info) => {
  try {
    errNoUser(users.get(id));
    const user = users.get(id);
    user.name = info.name;
    user.login = info.login;
    user.password = info.password;
    return users.get(id);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const remove = async (id) => {
  try {
    errNoUser(users.get(id));
    const user = users.get(id)
    users.delete(id);
    return user;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { getAll, add, get, update, remove };
