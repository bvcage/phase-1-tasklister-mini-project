document.addEventListener("DOMContentLoaded", () => {
  const entryForm = document.querySelector('form#create-task-form');
  const taskList = document.querySelector('ul#tasks');
  entryForm.addEventListener('submit', function(e){
    // prevent page refresh
    e.preventDefault();
    // get user input
    let inputDesc = document.querySelector('input#new-task-description');
    let inputPriority = document.querySelector('select#new-task-priority');
    // create element to hold task
    const newTask = document.createElement('li');
    // assign user input to task element
    newTask.textContent = inputDesc.value;
    newTask.classList.add(`priority-${inputPriority.value}`);
    // create deletion functionality
    newTask.setAttribute('onclick', 'deleteTask(this)');
    // add new task element to task list
    taskList.appendChild(newTask);
    // reset entry form
    inputDesc.value = '';
    inputPriority.value = 'none';
  });
});

function deleteTask(ele) {
  ele.classList.add('hide');
}