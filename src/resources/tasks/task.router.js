const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.status(200).json(tasks.map((task) => Task.toResponse(task)));
  } catch (error) {
    res.sendStatus(400);
  }
});

router.route('/:boardId/tasks').post((req, res) => {
  tasksService
    .add(req.params.boardId, req.body)
    .then((task) => {
      res.status(201).json(Task.toResponse(task));
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

router.route('/:boardId/tasks/:taskId').get((req, res) => {
  tasksService
    .get(req.params.boardId, req.params.taskId)
    .then((task) => {
      res.status(200).json(Task.toResponse(task));
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

router.route('/:boardId/tasks/:taskId').put((req, res) => {
  tasksService
    .update(req.params.boardId, req.params.taskId, req.body)
    .then((task) => {
      res.status(200).json(Task.toResponse(task));
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

router.route('/:boardId/tasks/:taskId').delete((req, res) => {
  tasksService
    .remove(req.params.boardId, req.params.taskId)
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

module.exports = router;
