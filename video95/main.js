import mongoose from "mongoose";  
import express from "express"; 
import { Todo } from "./models/Todo.js";


let conn = await mongoose.connect("mongodb://127.0.0.1:27017/todo");
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  const todo = new Todo({
    name: "Task 1",
    desc: "Description of this todo",
    isDone: false,
    days: Math.floor(Math.random() * 10) + 1* Math.random()
  });
await todo.save();
res.send('Hello, World!');
});

app.get('/a', async (req, res) => {
  let todo = await Todo.findOne({})
  console.log(todo);
  res.json({ desc:todo.desc});
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
