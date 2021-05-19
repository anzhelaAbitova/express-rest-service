const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  } catch (error) {
    res.sendStatus(500);
  }
});

router.route('/').post(async (req, res) => {
  usersService
    .add(req.body)
    .then((e) => {
      res.status(201).json(User.toResponse(e));
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

router.route('/:id').get(async (req, res) => {
  usersService
    .get(req.params.id)
    .then((user) => {
      res.status(200).json(User.toResponse(user));
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

router.route('/:id').put(async (req, res) => {
  usersService
    .update(req.params.id, req.body)
    .then((user) => {
      res.json(User.toResponse(user));
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

router.route('/:id').delete(async (req, res) => {
  usersService
    .remove(req.params.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

module.exports = router;
