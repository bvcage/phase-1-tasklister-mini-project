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
    newTaskStatus.textContent = '✓';
    newTaskStatus.classList.add('check-off');
    newTaskStatus.classList.add('col-status');
    
    // insert description data
    const newTaskDesc = newTaskRow.insertCell();
    newTaskDesc.appendChild(document.createTextNode(inputDesc.value));
    newTaskDesc.classList.add('col-desc');
    
    // insert priority data
    const newTaskPriority = newTaskRow.insertCell();
    newTaskPriority.appendChild(document.createTextNode(inputPriority.value));
    newTaskPriority.classList.add('col-priority');
    
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

    // priority color-coding
    for (let i = 1; i < newTaskRow.cells.length; ++i) {
      newTaskRow.cells[i].classList.add(`priority-${inputPriority.value}`);
    }

    // completion functionality
    for (let i = 0; i < newTaskRow.cells.length; ++i) {
      newTaskRow.cells[i].addEventListener('mouseover', function() {
        highlightCellRow(this.parentNode, true);
        showCheckmark(this.parentNode, true);
      });
      newTaskRow.cells[i].addEventListener('mouseout', function() {
        highlightCellRow(this.parentNode, false);
        showCheckmark(this.parentNode, false);
      });
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
    newTaskDelete.addEventListener('mouseover', function() {highlightRowRed(this.parentNode, true)});
    newTaskDelete.addEventListener('mouseout', function() {highlightRowRed(this.parentNode, false)});


    // FINAL CLEAN UP

    // reset entry form
    inputDesc.value = '';
    inputPriority.value = 'none';
    inputDueDate.value = '';

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

function highlightCellRow(tableRow, highlightOn) {
  for (let i = 1; i < tableRow.cells.length - 1; ++i) {
    if (highlightOn) {
      tableRow.cells[i].classList.add('highlight');
    } else {
      tableRow.cells[i].classList.remove('highlight');
    }
  }
}

function highlightRowRed(tableRow, highlightOn) {
  for (let i = 1; i < tableRow.cells.length; ++i) {
    if (highlightOn) {
      tableRow.cells[i].classList.add('deletion-highlight');
    } else {
      tableRow.cells[i].classList.remove('deletion-highlight');
    }
  }
}

function showCheckmark(tableRow, checkOn) {
  if (checkOn) {
    tableRow.cells[0].classList.remove('check-off');
    tableRow.cells[0].classList.add('check-on');
  } else {
    tableRow.cells[0].classList.remove('check-on');
    tableRow.cells[0].classList.add('check-off');
  }
}