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

  const doneButton = call(".js-doneButton");
  const deleteButton = call(".js-deleteButton");
  const taskFrom = call(".js-taskForm");

  const render = () => {
    let htmlString = "";
    for (const task of tasks)
      htmlString += `<li class="section__item">
    <button class="section__button section__button--doneButton js-doneButton"></button>
    <p class="section__paragraph js-task">${task.content}</p>
    <button class="section__button section__button--deleteButton js-deleteButton"></button>
    </li>`;
    call(".js-taskList").innerHTML = htmlString;
  };

  const init = () => {
    render();
  };

  init();
}
