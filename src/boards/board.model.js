const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'Trello board 1',
    columns = [
        {
            id: uuid(),
            title: 'Trello column 1',
            order: 1
        },
        {
          id: uuid(),
          title: 'Trello column 2',
          order: 2
      },
      {
        id: uuid(),
        title: 'Trello column 3',
        order: 3
    }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;