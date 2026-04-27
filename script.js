let currentFilter = "all";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span style="text-decoration: ${task.completed ? "line-through" : "none"}">
        ${task.text}
      </span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value;
  if (text === "") return;

  tasks.push({ text: text, completed: false });

  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  const activeTasks = tasks.filter(task => !task.completed).length;
  taskCounter.textContent = `${activeTasks} task(s) left`;

  filteredTasks.forEach((task) => {
    const realIndex = tasks.indexOf(task);

    const li = document.createElement("li");

    li.innerHTML = `
      <span style="text-decoration: ${task.completed ? "line-through" : "none"}">
        ${task.text}
      </span>
      <div>
        <button onclick="toggleTask(${realIndex})">✔</button>
        <button onclick="deleteTask(${realIndex})">❌</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}
