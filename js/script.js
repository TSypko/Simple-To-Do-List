const call = document.querySelector.bind(document);
const callAll = document.querySelectorAll.bind(document);

let tasks = [];
let hideDoneTasks = false;

const render = () => {
  renderTask();
  bindListeners();
  showAdditionalButtons();
};

const renderTask = () => {
  let htmlString = "";
  for (const task of tasks)
    htmlString += `<li class="section__item">
    <button class="section__button section__button--doneButton ${
      task.done ? "section__button--doneButtonToggled" : ""
    } js-doneButton"></button>
    <p class="section__paragraph ${
      task.done ? "section__paragraph--done" : ""
    } js-task">${task.content}</p>
    <button class="section__button section__button--deleteButton js-deleteButton"></button>
    </li>`;
  call(".js-taskList").innerHTML = htmlString;
};

const doneAllButton = call(".js-doneAllButton");

const checkTask = (task) => {
  return task.done === true;
};

const showAdditionalButtons = () => {
  const footer = call(".footer");
  
  tasks.length > 0
    ? footer.classList.add("footer--showButtons")
    : footer.classList.remove("footer--showButtons");

  let doneTasks = tasks.every(checkTask);
  doneTasks
    ? doneAllButton.setAttribute("disabled", "")
    : doneAllButton.removeAttribute("disabled", "");
};

const addNewTask = (newTaskContent) => {
  tasks.push({
    content: newTaskContent,
    done: false,
  });
};
const removeTask = (taskIndex) => {
  tasks.splice(taskIndex, 1);
  render();
};

const setDoneTask = (taskIndex) => {
  tasks[taskIndex].done = !tasks[taskIndex].done;
  render();
};

const taskInput = call(".js-taskNewTaskInput");
const taskForm = call(".js-taskForm");

const taskSubmit = (event) => {
  const newTaskContent = taskInput.value.trim();
  event.preventDefault();
  if (newTaskContent === "") return;
  else addNewTask(newTaskContent);
  taskForm.reset();
  render();
};

const inputFocus = () => {
  taskInput.focus();
};

const removeAllTasks = () => {
  tasks.splice(0, tasks.length);
  render();
};

const setAllDoneTask = () => {
  for (const task of tasks) task.done = true;
  render();
};

const nightMode = () => {
  const body = call("body");
  const checkbox = call(".js-switch");
  if (checkbox.checked === true) {
    body.removeAttribute("theme");
  } else {
    body.setAttribute("theme", "night");
  }
};

const bindListeners = () => {
  const removeButtons = callAll(".js-deleteButton");
  removeButtons.forEach((removeButton, index) => {
    removeButton.addEventListener("click", () => removeTask(index));
  });
  const toggleDoneButtons = callAll(".js-doneButton");
  toggleDoneButtons.forEach((toggleDoneButton, index) => {
    toggleDoneButton.addEventListener("click", () => setDoneTask(index));
  });
  taskForm.addEventListener("submit", taskSubmit);
  const addTaskButton = call(".js-addButton");
  addTaskButton.addEventListener("click", inputFocus);
  const switchToggle = call(".switch__toggle");
  switchToggle.addEventListener("click", nightMode);
  const removeAllButton = call(".js-removeAllButton");
  removeAllButton.addEventListener("click", removeAllTasks);
  doneAllButton.addEventListener("click", setAllDoneTask);
  // const hideDoneButton = call(".js-hideDoneButton");
  // hideDoneButton.addEventListener("click", areTasksDone);
};
const init = () => {
  render();
  bindListeners();
};

init();
