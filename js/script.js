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

    const removeButtons = callAll(".js-deleteButton");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => removeTask(index));
    });
    const toggleDoneButtons = callAll(".js-doneButton");
    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => setDoneTask(index));
    });
  };

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
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

  const nightMode = () => {
    const body = call("body");
    const checkbox = call(".js-switch");
    if (checkbox.checked === true) {
      body.removeAttribute("theme");
    } else {
      body.setAttribute("theme", "night");
    }
  };

  const listenersBind = () => {
    taskForm.addEventListener("submit", taskSubmit);
    const addTaskButton = call(".js-addButton");
    addTaskButton.addEventListener("click", inputFocus);
    const switchToggle = call(".switch__toggle");
    switchToggle.addEventListener("click", nightMode);
  };
  const init = () => {
    render();
    listenersBind();
  };

  init();
}
