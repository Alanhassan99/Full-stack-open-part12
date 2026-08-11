const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const {set, get} = require('../redis/index.js')
/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

router.get('/statistics', async (_, res) => {
const addedTodos = await get("added_todos")
res.send({added_todos: Number(addedTodos)})
}) 

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
const current = await get("added_todos")
const number = parseInt(current) || 0
await set("added_todos", number + 1)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
 req.todo.text = req.body.text
  req.todo.done  = req.body.done
  await req.todo.save()
  res.send(req.todo)
});
router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
