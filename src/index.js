document.addEventListener("DOMContentLoaded", () => {
  const entryForm = document.querySelector('form#create-task-form');
  const taskList = document.querySelector('table#tasks');
  entryForm.addEventListener('submit', function(e){
    // prevent page refresh
    e.preventDefault();
    // get user input
    let inputDesc = document.querySelector('input#new-task-description');
    let inputPriority = document.querySelector('select#new-task-priority');
    let inputDueDate = document.querySelector('input#new-task-due-date');
    // create row to hold task entry
    const newTaskRow = taskList.insertRow();
    // insert status data
    const newTaskStatus = newTaskRow.insertCell();
    // insert description data
    const newTaskDesc = newTaskRow.insertCell();
    newTaskDesc.appendChild(document.createTextNode(inputDesc.value));
    // insert priority data
    const newTaskPriority = newTaskRow.insertCell();
    newTaskPriority.appendChild(document.createTextNode(inputPriority.value));
    newTaskRow.classList.add(`priority-${inputPriority.value}`);
    // insert due date data
    const newTaskDueDate = newTaskRow.insertCell();
    newTaskDueDate.appendChild(document.createTextNode(inputDueDate.value));
    // reset entry form
    inputDesc.value = '';
    inputPriority.value = 'none';
    inputDueDate.value = 'none';

    // // create deletion functionality
    // newTask.setAttribute('onclick', 'deleteTask(this)');
    
  });
});

function deleteTask(ele) {
  ele.classList.add('hide');
}