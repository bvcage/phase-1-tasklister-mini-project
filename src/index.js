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
      // format date - if empty, set to today
      let formattedDate;
      if (inputDueDate.value.length > 0) {
        const parsedDateAry = inputDueDate.value.split('-');
        formattedDate = Number.parseInt(parsedDateAry[1], 10) + "." + Number.parseInt(parsedDateAry[2], 10);
      } else {
        formattedDate = parseTodaysDate();
      }
    newTaskDueDate.appendChild(document.createTextNode(formattedDate));
    newTaskDueDate.classList.add('col-date');
    
    // reset entry form
    inputDesc.value = '';
    inputPriority.value = 'none';
    inputDueDate.value = '';
    
    // completion functionality
    for (let i = 0; i < newTaskRow.cells.length; ++i) {
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

function parseTodaysDate() {
  const date = new Date();
  // const todayYear = date.getFullYear();
  const todayMonth = Number.parseInt(date.getMonth() + 1, 10);
  const todayDay = Number.parseInt(date.getDate(), 10);
  return `${todayMonth}.${todayDay}`;
}