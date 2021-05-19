const router = require('express').Router();
const Board = require('./board.model.js');
const boardsService = require('./board.service.js');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardsService.getAll();
    res.status(200).json(boards.map(Board.toResponse));
  } catch (error) {
    res.sendStatus(500);
  }
});

router.route('/').post(async (req, res) => {
  boardsService
    .add(req.body)
    .then((board) => {
      res.status(201).json(Board.toResponse(board));
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

router.route('/:id').get(async (req, res) => {
  boardsService
    .get(req.params.id)
    .then((board) => {
      res.status(200).json(Board.toResponse(board));
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

router.route('/:id').put(async (req, res) => {
  boardsService
    .update(req.params.id, req.body)
    .then((board) => {
      res.status(200).json(Board.toResponse(board));
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

router.route('/:id').delete(async (req, res) => {
  boardsService
    .remove(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

module.exports = router;
