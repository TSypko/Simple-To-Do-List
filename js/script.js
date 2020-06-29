{
  const call = document.querySelector.bind(document);
  const callAll = document.querySelectorAll.bind(document);

  const tasks = [
    {
      content: "first example task for development purpose only",
      done: true,
    },
    {
      content: "second example task for development purpose only",
      done: false,
    },
  ];

  const doneTaskButton = call(".js-doneButton");
  const deleteTaskButton = call(".js-deleteButton");
  const addTaskButton = call(".js-addButton");

  const render = () => {
    let htmlString = "";
    for (const task of tasks)
      htmlString += `<li class="section__item">
    <button class="section__button section__button--doneButton js-doneButton"></button>
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

  const taskSubmit = (event) => {
    event.preventDefault();
    const newTaskContent = call(".js-taskNewTaskInput").value.trim();
    if (newTaskContent === "") return;
    else addNewTask(newTaskContent);
    render();
  };

  const init = () => {
    render();
    const taskForm = call(".js-taskForm");
    taskForm.addEventListener("submit", taskSubmit);
 
  };

  init();
}
