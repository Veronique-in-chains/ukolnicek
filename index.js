console.log('funguju!');

const Task = (props) => {
  const { name, due, done } = props;

  let check = '';
  if (done) {
    check = '✓';
  }

  return `
    <div class="task">
      <div class="task__body">
        <div class="task__name">${name}</div>
        <div class="task__due">${due}</div>
      </div>
      <div class="task__done">${check}</div>
    </div>
  `;
};

const renderTasks = (items) => {
  const tasksElement = document.querySelector('.todo__tasks');
  tasksElement.innerHTML = items.map((item) => Task(item))
    .join('');
};

fetch('https://apps.kodim.cz/daweb/trening-api/apis/tasks-api/tasks')
.then((response) => response.json())
.then((data) => renderTasks(data));

const checkbox = document.querySelector('#checkbox-undone');
checkbox.addEventListener('change', event => {
  if (event.target.checked) {
    fetch('https://apps.kodim.cz/daweb/trening-api/apis/tasks-api/tasks?done=false')
    .then((response) => response.json())
    .then((data) => renderTasks(data));
  } else {
    fetch('https://apps.kodim.cz/daweb/trening-api/apis/tasks-api/tasks')
    .then((response) => response.json())
    .then((data) => renderTasks(data));
  }
})

