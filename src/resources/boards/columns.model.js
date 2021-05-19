const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'Trello board 1', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Column;
