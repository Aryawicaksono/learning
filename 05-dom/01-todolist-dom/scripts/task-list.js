export class TaskList{
  element;

  onToggleTask;
  onDeleteTask;
  onEditTask;
  onConfirmTask;
  onCancelTask;

  _tasks = [];

  constructor(element){
    this.element = element;
    this._addEventListeners();
  }

  setTask(tasks){
    this._tasks = tasks;
    this._render();
  }

  _render(){
    const taskItemElement = this._tasks.map(this._buildTaskItemElement);
    this.element.replaceChildren(...taskItemElement);
  }

  _addEventListeners(){
    this.element.addEventListener('click',(event)=>{
      if (event.target === this.element){
        return;
      }

      if (
        event.target.classList.contains('checkbox') ||
        event.target.classList.contains('task-item__label')
      ) {
        const taskItemElement = event.target.parentElement;
        const id = taskItemElement.dataset.id;

        if (typeof this.onToggleTask === 'function'){
          this.onToggleTask(id);
        }
      } else if (event.target.classList.contains('task-item__action--delete')) {
        const taskItemElement = event.target.parentElement.parentElement.parentElement;
        const id = taskItemElement.dataset.id;

        if (typeof this.onDeleteTask === 'function') {
          this.onDeleteTask(id);
        }
      } else if (event.target.classList.contains('task-item__action--edit')) {
        const taskItemElement = event.target.parentElement.parentElement.parentElement;
        const id = taskItemElement.dataset.id;

        if (typeof this.onEditTask === 'function'){
          this.onEditTask(id)
        }
      } else if (event.target.classList.contains('task-item__form-action--confirm')) {
        const taskItemElement = event.target.parentElement.parentElement.parentElement;
        const id = taskItemElement.dataset.id;

        if (typeof this.onConfirmTask === 'function'){
          this.onConfirmTask(id);
        }
      } else if (event.target.classList.contains('task-item__form-action--cancel')) {
        const taskItemElement = event.target.parentElement.parentElement.parentElement;
        const id = taskItemElement.dataset.id;

        if (typeof this.onCancelTask === 'function'){
          this.onCancelTask(id);
        }
      }
    });
  }

  _buildTaskItemElement(task){
    //  <li class="task-item task-item--completed">
    //   <div class="checkbox checkbox--checked"></div>
    //   <div class="task-item__label">Komponen To-Do List</div>
    // </li>
    const taskItemElement = document.createElement('li');
    taskItemElement.classList.add('task-item');
    taskItemElement.dataset.id = task.id;

    if (task.isEditing){
      taskItemElement.classList.add('task-item--editing');
    }

    if (task.isCompleted){
      // TODO: Change --selected to --completed
      taskItemElement.classList.add('task-item--completed');
    }

    const checkboxElement = document.createElement('span');

    checkboxElement.classList.add('checkbox');

    if (task.isCompleted){
      checkboxElement.classList.add('checkbox--checked');
    }

    //content element
    const labelElement = document.createElement('span');
    labelElement.classList.add('task-item__label');
    labelElement.textContent = task.name;

    const contentActionsElement = document.createElement('div');
    contentActionsElement.classList.add('task-item__actions');

    const editButtonElement = document.createElement('button');
    editButtonElement.className = 'task-item__action task-item__action--edit';

    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.className = 'task-item__action task-item__action--delete';

    //form element
    const inputElement = document.createElement('input');
    inputElement.className = 'task-item__form-input';
    inputElement.value = task.name;

    const formActionsElement = document.createElement('div');
    formActionsElement.className = 'task-item__form-actions';

    const confirmButtonElement = document.createElement('button');
    confirmButtonElement.className = 'task-item__form-action task-item__form-action--confirm';

    const cancelButonElement = document.createElement('button');
    cancelButonElement.className = 'task-item__form-action task-item__form-action--cancel';

    formActionsElement.append(confirmButtonElement);
    formActionsElement.append(cancelButonElement);

    const formElement = document.createElement('div');
    formElement.className = 'task-item__form';

    const contentElement = document.createElement('div');
    contentElement.className = 'task-item__content';

    formElement.append(inputElement);
    formElement.append(formActionsElement);

    contentActionsElement.append(editButtonElement);
    contentActionsElement.append(deleteButtonElement);

    contentElement.append(labelElement);
    contentElement.append(contentActionsElement);
    
    taskItemElement.append(checkboxElement);
    taskItemElement.append(formElement);
    taskItemElement.append(contentElement);

    return taskItemElement;
  }
}