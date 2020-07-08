{
  let tasks = [];
  let hideDoneTasks = false;

  const render = () => {
    renderTask();
    renderButtons();
    bindListeners();
    bindFooterButtonsListeners();
  };

  const renderTask = () => {
    let htmlString = "";
    for (const task of tasks)
      htmlString += `<li class="section__item ${
        task.done && hideDoneTasks === true ? "section__item--hidden" : ""
      }" >
    <button class="section__button section__button--doneButton ${
      task.done ? "section__button--doneButtonToggled" : ""
    } js-doneButton"></button>
    <p class="section__paragraph ${
      task.done ? "section__paragraph--done" : ""
    } js-task">${task.content}</p>
    <button class="section__button section__button--deleteButton js-deleteButton"></button>
    </li>`;
    document.querySelector(".js-taskList").innerHTML = htmlString;
  };

  const isTaskDone = ({ done }) => {
    return done === true;
  };
  const isTaskUndone = ({ done }) => {
    return done === false;
  };

  const renderButtons = () => {
    let htmlFooterString = "";
    if (tasks.length > 0) {
      htmlFooterString += ` <button class="footer__button footer__button--doneAllButton js-doneAllButton">set all as done</button>
      <button class="footer__button footer__button--hideDoneButton js-hideDoneButton">hide done</button>
      <button class="footer__button footer__button--removeAllButton js-removeAllButton">remove all tasks</button>`;
    } else {
      htmlFooterString += "";
    }
    document.querySelector(".js-footer").innerHTML = htmlFooterString;
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
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: tasks[taskIndex].done ? false : true },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const hideDoneTask = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const taskInput = document.querySelector(".js-taskNewTaskInput");
  const taskForm = document.querySelector(".js-taskForm");

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
    tasks = [...tasks.slice(0, taskIndex)];
    render();
  };

  const setAllTaskDone = () => {
    tasks = [...tasks];
    tasks.forEach((task) => {
      task.done = true;
    });
    render();
  };

  const nightMode = () => {
    const body = document.querySelector("body");
    const checkbox = document.querySelector(".js-switch");
    if (checkbox.checked === true) {
      body.removeAttribute("theme");
    } else {
      body.setAttribute("theme", "night");
    }
  };

  const bindListeners = () => {
    const removeButtons = document.querySelectorAll(".js-deleteButton");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => removeTask(index));
    });
    const toggleDoneButtons = document.querySelectorAll(".js-doneButton");
    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => setDoneTask(index));
    });
    taskForm.addEventListener("submit", taskSubmit);
    const addTaskButton = document.querySelector(".js-addButton");
    addTaskButton.addEventListener("click", inputFocus);
    const switchToggle = document.querySelector(".switch__toggle");
    switchToggle.addEventListener("click", nightMode);
  };
  const bindFooterButtonsListeners = () => {
    if (tasks.length > 0) {
      const doneAllButton = document.querySelector(".js-doneAllButton");
      const hideDoneButton = document.querySelector(".js-hideDoneButton");
      const doneTasks = tasks.every(isTaskDone);
      doneTasks
        ? doneAllButton.setAttribute("disabled", "")
        : doneAllButton.removeAttribute("disabled", "");

      const undoneTasks = tasks.every(isTaskUndone);
      undoneTasks
        ? hideDoneButton.setAttribute("disabled", "")
        : hideDoneButton.removeAttribute("disabled", "");
      hideDoneButton.innerHTML = hideDoneTasks ? "show done" : "hide done";
      const removeAllButton = document.querySelector(".js-removeAllButton");
      removeAllButton.addEventListener("click", removeAllTasks);
      doneAllButton.addEventListener("click", setAllTaskDone);
      hideDoneButton.addEventListener("click", hideDoneTask);
    } else return;
  };
  const init = () => {
    render();
  };

  init();
}
