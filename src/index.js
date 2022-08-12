TASK_ID = 1;

document.addEventListener("DOMContentLoaded", () => {
  const entryForm = document.querySelector('form#create-task-form');
  const taskTable = document.querySelector('table#tasks');
  entryForm.addEventListener('submit', function(e){
    
    // prevent page refresh
    e.preventDefault();
    
    // get user input
    let inputDesc = document.querySelector('input#new-task-description');
    let inputPriority = document.querySelector('select#new-task-priority');
    let inputDueDate = document.querySelector('input#new-task-due-date');
    
    // create row to hold task entry
    const newTaskRow = taskTable.insertRow();
    newTaskRow.id = `task-${TASK_ID}`;
    newTaskRow.classList.add('task-entry-row');

    // insert cell for checkmark
    const newTaskStatus = newTaskRow.insertCell();
    newTaskStatus.classList.add('col-status');
    
    // insert description data
    const newTaskDesc = newTaskRow.insertCell();
    newTaskDesc.appendChild(document.createTextNode(inputDesc.value));
    newTaskDesc.classList.add('col-desc');
    
    // insert priority data
    const newTaskPriority = newTaskRow.insertCell();
    newTaskPriority.appendChild(document.createTextNode(inputPriority.value));
    newTaskPriority.classList.add('col-priority');
    newTaskRow.classList.add(`priority-${inputPriority.value}`);
    
    // insert due date data
    const newTaskDueDate = newTaskRow.insertCell();
    const parsedDate = inputDueDate.value.split('-');
    newTaskDueDate.appendChild(document.createTextNode(
      Number.parseInt(parsedDate[1], 10) + "/" + parsedDate[2]));
    newTaskDueDate.classList.add('col-date');
    
    // reset entry form
    inputDesc.value = '';
    inputPriority.value = 'none';
    inputDueDate.value = '';
    
    // completion functionality
    console.log(newTaskRow.cells.length);
    for (let i = 0; i < newTaskRow.cells.length; ++i) {
      console.log(newTaskRow.cells[i]);
      newTaskRow.cells[i].addEventListener('click', function() {markTask(this.parentNode, 'complete')});
    }
    
    // deletion functionality
    const newTaskDelete = newTaskRow.insertCell();
    const deleteButtonWrapper = document.createElement('div');
    deleteButtonWrapper.classList.add('wrapper');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '✕';
    deleteButton.id = 'del-button';
    deleteButtonWrapper.appendChild(deleteButton);
    newTaskDelete.appendChild(deleteButtonWrapper);
    newTaskDelete.classList.add('col-delete');
    newTaskDelete.addEventListener('click', function() {markTask(this.parentNode, 'delete')});
 
    // increment task id for next call
    ++ TASK_ID;
  });

});

function markTask(ele, marking) {
  ele.classList.add(`${marking}`);
}