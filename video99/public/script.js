const taskForm = document.getElementById('task-form');
const titleInput = document.getElementById('task-title');
const descInput = document.getElementById('task-desc');
const priorityInput = document.getElementById('task-priority');
const taskList = document.getElementById('task-list');
const countLabel = document.getElementById('count-label');
const searchInput = document.getElementById('task-search');
const filterButtons = document.querySelectorAll('.filter-btn');
const totalCount = document.getElementById('total-count');
const activeCount = document.getElementById('active-count');
const completedCount = document.getElementById('completed-count');
const themeToggle = document.getElementById('theme-toggle');

let activeStatus = 'all';
let searchQuery = '';

const api = {
  fetchTasks: (status, search) => {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (search) params.append('search', search);
    const url = `/api/tasks?${params.toString()}`;
    return fetch(url).then((res) => res.json());
  },
  createTask: (body) =>
    fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((res) => res.json()),
  toggleTask: (id) => fetch(`/api/tasks/${id}/toggle`, { method: 'PUT' }).then((res) => res.json()),
  deleteTask: (id) => fetch(`/api/tasks/${id}`, { method: 'DELETE' }).then((res) => res.json()),
};

function getBadgeHtml(priority) {
  const label = priority === 'high' ? 'High' : priority === 'medium' ? 'Medium' : 'Low';
  return `<span class="badge-pill ${priority}">${label}</span>`;
}

function renderTasks(tasks) {
  taskList.innerHTML = '';
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const active = total - completed;

  totalCount.textContent = total;
  activeCount.textContent = active;
  completedCount.textContent = completed;
  countLabel.textContent = `${total} task${total !== 1 ? 's' : ''}`;

  if (!tasks.length) {
    taskList.innerHTML = '<div class="task-item"><p>No tasks match your filters. Add one to begin!</p></div>';
    return;
  }

  tasks.forEach((task) => {
    const item = document.createElement('article');
    item.className = `task-item${task.completed ? ' completed' : ''}`;
    item.innerHTML = `
      <div class="task-meta">
        ${getBadgeHtml(task.priority)}
        <span class="badge-pill priority-label">${task.completed ? 'Completed' : 'Active'}</span>
      </div>
      <div>
        <h3>${escapeHtml(task.title)}</h3>
        <p>${escapeHtml(task.description || 'No description added.')}</p>
      </div>
      <div class="task-actions">
        <button class="action-btn complete">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="action-btn delete">Delete</button>
      </div>
    `;

    const [completeBtn, deleteBtn] = item.querySelectorAll('button');
    completeBtn.addEventListener('click', async () => {
      await api.toggleTask(task.id);
      await loadTasks();
    });
    deleteBtn.addEventListener('click', async () => {
      await api.deleteTask(task.id);
      await loadTasks();
    });

    taskList.appendChild(item);
  });
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function loadTasks() {
  try {
    const tasks = await api.fetchTasks(activeStatus, searchQuery);
    renderTasks(tasks);
  } catch (error) {
    taskList.innerHTML = '<div class="task-item"><p>Unable to load tasks. Refresh the page.</p></div>';
  }
}

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  const priority = priorityInput.value;

  if (!title) {
    titleInput.focus();
    return;
  }

  await api.createTask({ title, description, priority });
  titleInput.value = '';
  descInput.value = '';
  priorityInput.value = 'medium';
  await loadTasks();
});

searchInput.addEventListener('input', async (event) => {
  searchQuery = event.target.value.trim();
  await loadTasks();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    activeStatus = button.dataset.status;
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    await loadTasks();
  });
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
});

loadTasks();
