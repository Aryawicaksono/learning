import { SegmentedControl } from './segmented-control.js';
import { StatWidget } from './stat-widget.js';
import { TaskForm } from './task-form.js';
import { TaskList } from './task-list.js';
import { Task } from './task.js';

//  ===== CONSTANTS =====

const Status = Object.freeze({
  ALL: 0,
  ACTIVE: 1,
  COMPLETED: 2,
});

//  ===== VARIABLES =====

const taskStatWidget = new StatWidget(
  document.getElementsByClassName('stat-widget')[0]
);

const activeStatWidget = new StatWidget(
  document.getElementsByClassName('stat-widget')[1]
);

const doneStatWidget = new StatWidget(
  document.getElementsByClassName('stat-widget')[2]
);

const segmentControl = new SegmentedControl(
  document.getElementsByClassName('segmented-control')[0]
);

const taskForm = new TaskForm(
  document.getElementsByClassName('task-form')[0]
);

const taskList = new TaskList(
  document.getElementsByClassName('task-list')[0]
);

//  ===== STATES =====

let tasks = [
  new Task('Implementasi halaman Register', true),
];

let selectedStatus = Status.ALL;

//  ===== MAIN =====

setupTaskForm();
setupSegmentedControl();
setupTaskList();

reloadStatWidget();
reloadTasks();

//  ===== SETUP =====

function setupTaskForm() {
  taskForm.onClickedAddButton = function (inputtedText) {
    if (inputtedText.length === 0) {
      return;
    }

    this.setValue('');
    tasks.push(new Task(inputtedText, false));
    reloadStatWidget();
    reloadTasks();
  };
}

function setupSegmentedControl() {
  segmentControl.setSegments(['All', 'Active', 'Completed']);

  segmentControl.onSelectSegment = function (index) {
    this.setSelectedSegmentIndex(index);
    selectedStatus = index;
    reloadTasks();
  };
}

function setupTaskList() {
  taskList.onToggleTask = function (id) {
    const toggledTask = tasks.find(task => task.id === id);
    if (toggledTask) {
      toggledTask.isCompleted = !toggledTask.isCompleted;
    }

    reloadStatWidget();
    reloadTasks();
  };

  taskList.onDeleteTask = function (id) {
    tasks = tasks.filter(task => task.id !== id);

    reloadStatWidget();
    reloadTasks();
  };

  taskList.onEditTask = function (id) {
    const editingTask = tasks.find(task => task.id === id);
    if (editingTask) {
      editingTask.isEditing = true;
    }

    reloadTasks();
  };

  taskList.onConfirmTask = function (id) {
    const task = tasks.find(task => task.id === id);
    const items = document.getElementsByClassName('task-item');

    for (let i = 0; i < items.length; i++) {
      if (items[i].dataset.id === id) {
        const inputElement = items[i].getElementsByClassName('task-item__form-input')[0];

        if (task && inputElement && inputElement.value.trim()) {
          task.name = inputElement.value;
        }
        break;
      }
    }

    if (task) {
      task.isEditing = false;
    }
    reloadTasks();
  };

  taskList.onCancelTask = function (id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
      task.isEditing = false;
    }
    reloadTasks();
  };
}

//  ===== HELPERS =====

function reloadStatWidget() {
  taskStatWidget.setCount(tasks.length);
  activeStatWidget.setCount(tasks.filter(task => !task.isCompleted).length);
  doneStatWidget.setCount(tasks.filter(task => task.isCompleted).length);
}

function reloadTasks() {
  let filteredTasks = tasks.slice();

  if (selectedStatus === Status.ACTIVE) {
    filteredTasks = tasks.filter(task => !task.isCompleted);
  } else if (selectedStatus === Status.COMPLETED) {
    filteredTasks = tasks.filter(task => task.isCompleted);
  }

  taskList.setTask(filteredTasks);
}