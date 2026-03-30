const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let tasks = [
  {
    id: 1,
    title: 'Plan a study session',
    description: 'Pick topics and schedule 1 hour',
    completed: false,
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Buy groceries',
    description: 'Milk, eggs, fruits, and bread',
    completed: true,
    priority: 'medium',
    createdAt: new Date().toISOString(),
  },
];

const normalizeStatus = (status) => {
  if (status === 'completed') return 'completed';
  if (status === 'active') return 'active';
  return 'all';
};

app.get('/api/tasks', (req, res) => {
  const status = normalizeStatus(req.query.status);
  const search = String(req.query.search || '').trim().toLowerCase();

  let result = [...tasks];
  if (status === 'active') {
    result = result.filter((task) => !task.completed);
  } else if (status === 'completed') {
    result = result.filter((task) => task.completed);
  }

  if (search) {
    result = result.filter((task) => {
      return (
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search)
      );
    });
  }

  res.json(result);
});

app.post('/api/tasks', (req, res) => {
  const { title, description, priority = 'low' } = req.body;
  if (!title || title.trim().length < 2) {
    return res.status(400).json({ error: 'Title is required and should be at least 2 characters.' });
  }

  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: false,
    priority: ['low', 'medium', 'high'].includes(priority) ? priority : 'low',
    createdAt: new Date().toISOString(),
  };

  tasks.unshift(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find((item) => item.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  task.completed = !task.completed;
  res.json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find((item) => item.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  const { title, description, priority } = req.body;
  if (title && title.trim().length >= 2) {
    task.title = title.trim();
  }
  if (description !== undefined) {
    task.description = description.trim();
  }
  if (['low', 'medium', 'high'].includes(priority)) {
    task.priority = priority;
  }

  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const initialLength = tasks.length;
  tasks = tasks.filter((item) => item.id !== id);
  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  res.json({ success: true });
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
