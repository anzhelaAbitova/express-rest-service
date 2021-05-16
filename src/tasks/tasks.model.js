const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'Task 1',
    order = 1,
    description = 'Task number 1',
    userId = uuid()
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
}

module.exports = Task;