{
  const call = document.querySelector.bind(document);
  const callAll = document.querySelectorAll.bind(document);

  let tasks = [];
  let updatedTasks = [];
  let hideDoneTasks = false;

  const render = () => {
    renderTask();
    bindListeners();
    renderButtons();
  };

  const renderTask = () => {
    let htmlString = "";

    if (hideDoneTasks === false) {
      for (const task of updatedTasks)
        htmlString += `<li class="section__item  }">
    <button class="section__button section__button--doneButton ${
      task.done ? "section__button--doneButtonToggled" : ""
    } js-doneButton"></button>
    <p class="section__paragraph ${
      task.done ? "section__paragraph--done" : ""
    } js-task">${task.content}</p>
    <button class="section__button section__button--deleteButton js-deleteButton"></button>
    </li>`;
    } else {
      const undoneTask = updatedTasks.filter(isTaskUndone);
      for (const task of undoneTask)
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

  const isTaskDone = (task) => {
    return task.done === true;
  };
  const isTaskUndone = (task) => {
    return task.done === false;
  };

  const renderButtons = () => {
    const footer = call(".footer");

    updatedTasks.length > 0
      ? footer.classList.add("footer--showButtons")
      : footer.classList.remove("footer--showButtons");

    const doneTasks = updatedTasks.every(isTaskDone);
    doneTasks
      ? doneAllButton.setAttribute("disabled", "")
      : doneAllButton.removeAttribute("disabled", "");

    const undoneTasks = updatedTasks.every(isTaskUndone);
    undoneTasks
      ? hideDoneButton.setAttribute("disabled", "")
      : hideDoneButton.removeAttribute("disabled", "");
  };

  const addNewTask = (newTaskContent) => {
    updatedTasks = [
      ...tasks,
      ...updatedTasks,
      { content: newTaskContent, done: false },
    ];
    render();
  };
  const removeTask = (taskIndex) => {
    updatedTasks = [
      ...updatedTasks.slice(0, taskIndex),
      ...updatedTasks.slice(taskIndex + 1),
    ];
    render();
  };

  const setDoneTask = (taskIndex) => {
    updatedTasks[taskIndex].done = !updatedTasks[taskIndex].done;
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
    if (newTaskContent === "") return;
    else addNewTask(newTaskContent);
    taskForm.reset();
    render();
  };

  const inputFocus = () => {
    taskInput.focus();
  };

  const removeAllTasks = () => {
    updatedTasks.splice(0, updatedTasks.length);
    render();
  };

  const setAllDoneTask = () => {
    for (const task of updatedTasks) task.done = true;
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
