{
  const call = document.querySelector.bind(document);
  const callAll = document.querySelectorAll.bind(document);

  let tasks = [];
  let hideDoneTasks = false;

  const render = () => {
    renderTask();
    bindListeners();
    renderButtons();
  };

  const renderTask = () => {
    let htmlString = "";

    if (hideDoneTasks === false) {
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
    } else {
      const undoneTasks = tasks.filter(isTaskUndone);
      for (const task of undoneTasks)
        htmlString += `<li class="section__item">
    <button class="section__button section__button--doneButton ${
      task.done ? "section__button--doneButtonToggled" : ""
    } js-doneButton"></button>
    <p class="section__paragraph ${
      task.done ? "section__paragraph--done" : ""
    } js-task">${task.content}</p>
    <button class="section__button section__button--deleteButton js-deleteButton"></button>
    </li>`;
    }
    call(".js-taskList").innerHTML = htmlString;
  };

  const doneAllButton = call(".js-doneAllButton");
  const hideDoneButton = call(".js-hideDoneButton");

  const isTaskDone = ({ done }) => {
    return done === true;
  };
  const isTaskUndone = ({ done }) => {
    return done === false;
  };

  const renderButtons = () => {
    const footer = call(".footer");

    tasks.length > 0
      ? footer.classList.add("footer--showButtons")
      : footer.classList.remove("footer--showButtons");

    const doneTasks = tasks.every(isTaskDone);
    doneTasks
      ? doneAllButton.setAttribute("disabled", "")
      : doneAllButton.removeAttribute("disabled", "");

    const undoneTasks = tasks.every(isTaskUndone);
    undoneTasks
      ? hideDoneButton.setAttribute("disabled", "")
      : hideDoneButton.removeAttribute("disabled", "");
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent, done: false }];
    render();
  };
  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const setDoneTask = (taskIndex) => {
    if (tasks[taskIndex].done === false) {
      tasks = [
        ...tasks.slice(0, taskIndex),
        { ...tasks[taskIndex], done: true },
        ...tasks.slice(taskIndex + 1),
      ];
    } else {
      tasks = [
        ...tasks.slice(0, taskIndex),
        { ...tasks[taskIndex], done: false },
        ...tasks.slice(taskIndex + 1),
      ];
    }
    render();
  };

  const hideDoneTask = () => {
    hideDoneTasks = !hideDoneTasks;
    hideDoneTasks
      ? (hideDoneButton.innerHTML = "show done")
      : (hideDoneButton.innerHTML = "hide done");

    render();
  };

  const taskInput = call(".js-taskNewTaskInput");
  const taskForm = call(".js-taskForm");

  const taskSubmit = (event) => {
    const newTaskContent = taskInput.value.trim();
    event.preventDefault();
    if (newTaskContent === "") {
      return;
    } else {
      addNewTask(newTaskContent);
    }
    taskForm.reset();
    render();
  };

  const inputFocus = () => {
    taskInput.focus();
  };

  const removeAllTasks = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
    ];
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
    hideDoneButton.addEventListener("click", hideDoneTask);
  };
  const init = () => {
    render();
    bindListeners();
  };

  init();
}
