import React from "react";

import { StatWidget } from "../components/StatWidget";
import { SegmentedControl } from "../components/SegmentedControl";
import { TaskItem } from "../components/TaskItem";

import { taskManager } from "../hooks/taskManager";

export class Home extends React.Component{
  render(){

    const {
       inputLabel,
      setInputLabel,
      activeFilter,
      setActiveFilter,
      filteredTasks,
      totalTasks,
      activeTasks,
      doneTasks,
      handleAddTask,
      handleToggleTask,
      handleDeleteTask,
    } = taskManager();
    
    return(
      <div className="todo-island">
        <div className="todo-island__header">
          <h3 className="todo-island__title">Todolist</h3>
          <div className="todo-island__content">
            <StatWidget
              mod = 'task'
              src = './src/assets/img/icon-note.svg'
              alt = 'Icon note'
              label = 'Task'
              value = {3}
            />
            <StatWidget
              mod = 'active'
              src = './src/assets/img/icon-layout.svg'
              alt = 'Icon layout'
              label = 'Active'
              value = {2}
            />
            <StatWidget
              mod = 'done'
              src = './src/assets/img/icon-sqr-check.svg'
              alt = 'Icon square check'
              label = 'Done'
              value = {1}
            />

          </div>
        </div>
        <div className="todo-island__form">
          <div className="todo-island__input-field">
            <span className="todo-island__input-icon">
              <img src="./src/assets/img/icon-pen.svg" alt="Icon pen" />
            </span>
            <input type="text" placeholder="Add a new task..." className="todo-island__input"/>
          </div>
          <button className="todo-island__form-action">
            <img src="./src/assets/img/icon-plus.svg" alt="Icon plus"/>
            <p className="todo-island__action-label">Add</p>
          </button>
        </div>
        <div className="todo-island__body">
          <SegmentedControl
            labels = {['All', 'Active', 'Completed']}
          />
          <div className="panel">
            <ul className="task-list">
              <TaskItem
                label = 'Implementasi halaman register'
              />
              <TaskItem
                label = 'Build halaman dashboard'
              />
              <TaskItem
                isChecked
                label = 'komponen To Do List'
              />
            </ul>
          </div>
        </div>
      </div>
    )
  }
}