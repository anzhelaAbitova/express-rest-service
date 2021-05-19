const uuid = require('uuid');
const Column = require('./columns.model');

class Board {
  constructor({ id = uuid(), title = 'Trello board 1', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  getColumn(id) {
    const column = this.columns.find((e) => {
      if (e.id === id) {
        return true;
      }
      return false;
    });
    if (!column) {
      throw new Error('Unable to find column');
    }
    return column;
  }

  setColumns(columns) {
    columns.forEach((columnArr) => {
      const column = new Column();
      column.title = columnArr.title;
      column.order = columnArr.order;
      this.columns.push(column);
    });
  }

  static toResponse(board) {
    const { id, title } = board;
    const columns = [];
    board.columns.forEach((column) => {
      columns.push(Column.toResponse(column));
    });
    return { id, title, columns };
  }
}

module.exports = Board;
