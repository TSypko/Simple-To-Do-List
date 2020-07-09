{
  let tasks = [];
  let hideDoneTasks = false;

  const render = () => {
    renderTasks();
    renderFooterButtonsSection();
    bindTasksListeners();
    bindFooterButtonsListeners();
  };

  const renderTasks = () => {
    const taskToHTML = (task) =>
      `<li class="section__item ${
        task.done && hideDoneTasks === true ? "section__item--hidden" : ""
      }">
          <button class="section__button section__button--doneButton ${
            task.done ? " section__button--doneButtonToggled" : ""
          } js-doneButton"></button>
          <p class="section__paragraph ${
            task.done ? "section__paragraph--done" : ""
          } js-task">${task.content}</p>
          <button class="section__button section__button--deleteButton js-deleteButton"></button>
        </li>`;
    document.querySelector(".js-taskList").innerHTML = tasks.map(taskToHTML);
  };

  const renderFooterButtonsSection = () => {
    const footer = document.querySelector(".js-footer");
    let htmlFooterString = "";
    if (tasks.length) {
      const undoneTasks = tasks.every(isTaskUndone);
      const doneTasks = tasks.every(isTaskDone);
      htmlFooterString += `
        <section class="footer__section">
          <button ${doneTasks ? "disabled" : ""} 
              class="footer__button footer__button--doneAllButton js-doneAllButton">set all as done</button>
          <button ${undoneTasks ? "disabled" : ""}
              class="footer__button footer__button--hideDoneButton js-hideDoneButton">hide done</button>
          <button class="footer__button footer__button--removeAllButton js-removeAllButton">remove all tasks</button>
        </section>
      `;
    } else {
      htmlFooterString += "";
    }
    footer.innerHTML = htmlFooterString;
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent, done: false }];
    render();
  };
  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const setTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: tasks[taskIndex].done ? false : true },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const isTaskDone = ({ done }) => {
    return done === true;
  };
  const isTaskUndone = ({ done }) => {
    return done === false;
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

  const removeAllTasks = () => {
    tasks = [];
    render();
  };

  const setAllTasksDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));
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

  const bindTasksListeners = () => {
    const removeButtons = document.querySelectorAll(".js-deleteButton");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => removeTask(index));
    });

    const toggleDoneButtons = document.querySelectorAll(".js-doneButton");
    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => setTaskDone(index));
    });

    taskForm.addEventListener("submit", taskSubmit);
    const addTaskButton = document.querySelector(".js-addButton");
    addTaskButton.addEventListener("click", inputFocus);
    const switchToggle = document.querySelector(".switch__toggle");
    switchToggle.addEventListener("click", nightMode);
  };

  const bindFooterButtonsListeners = () => {
    const doneAllButton = document.querySelector(".js-doneAllButton");
    if (tasks.length) {
      doneAllButton.addEventListener("click", setAllTasksDone);
    }

    const hideDoneButton = document.querySelector(".js-hideDoneButton");
    if (tasks.length) {
      hideDoneButton.addEventListener("click", hideDoneTask);
    }

    const removeAllButton = document.querySelector(".js-removeAllButton");
    if (tasks.length) {
      removeAllButton.addEventListener("click", removeAllTasks);
    }
  };

  const init = () => {
    render();
  };

  init();
}
