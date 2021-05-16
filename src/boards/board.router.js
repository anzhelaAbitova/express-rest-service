const router = require('express').Router();
const Board = require('./board.model.js');
const boardsService = require('./board.services.js');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  
  res.json(boards.map(Board.toResponse));
});

router.route('/boards').get(async (req, res) => {
    const boards = await boardsService.getAll();

    res.json(boards.map(Board.toResponse));
});
  
module.exports = router;