{
  const call = document.querySelector.bind(document);
  const callAll = document.querySelectorAll.bind(document);

  const tasks = [];

  const render = () => {
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
    bindListeners();
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

  const checkTask = (task) => {
    return task.done === true;
  };
  const setAllDoneTask = () => {
    for (const task of tasks)
      if (task.done === false) {
        task.done = true;
      } else if (tasks.every(checkTask)) task.done = false;
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
    const doneAllButton = call(".js-doneAllButton");
    doneAllButton.addEventListener("click", setAllDoneTask);
  };
  const init = () => {
    render();
    bindListeners();
  };

  init();
}
