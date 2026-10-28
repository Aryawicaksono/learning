import React from "react";

import { StatWidget } from "../components/StatWidget";
import { SegmentedControl } from "../components/SegmentedControl";
import { TaskItem } from "../components/TaskItem";


export class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tasks: [
        {id:1, label: 'Implementasi halaman register', isChecked: true},
      ],
      selectedFilterIndex: 0,
      newTaskLabel: '',
    }
  }

  handleFilterChange = (index)=>{
    this.setState({selectedFilterIndex: index});
  }

  handleInputChange = (e) => {
    this.setState({newTaskLabel: e.target.value});
  }

  handleAddTask = () => {
    const {newTaskLabel, tasks} = this.state;

    if (!newTaskLabel.trim()) return;

    const newTask = {
      id: Date.now(),
      label: newTaskLabel,
      isChecked: false,
    };

    this.setState({
      tasks: [...tasks, newTask],
      newTaskLabel: '',
    })
  }

  handleToggleTask = (id) => {
    this.setState((prevState)=>({
      tasks: prevState.tasks.map((task)=> 
        task.id === id? {...task, isChecked: !task.isChecked} : task
      ),
    }));
  }

  handleEdit = (id, newLabel) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => 
        task.id === id ? {...task, label: newLabel} : task
      ),
    }));
  }

  handleDelete = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id)
    }))
  }

  render(){
    const {tasks, selectedFilterIndex, newTaskLabel} = this.state;

    const allTasks = tasks.length;
    const activeTasks = tasks.filter((task)=> !task.isChecked).length;
    const doneTasks = tasks.filter((task)=> task.isChecked).length;

    const filteredTasks = tasks.filter((task)=>{
      if (selectedFilterIndex === 1) return !task.isChecked;
      if (selectedFilterIndex === 2) return task.isChecked;
      return true;
    })

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
              value = {allTasks}
            />
            <StatWidget
              mod = 'active'
              src = './src/assets/img/icon-layout.svg'
              alt = 'Icon layout'
              label = 'Active'
              value = {activeTasks}
            />
            <StatWidget
              mod = 'done'
              src = './src/assets/img/icon-sqr-check.svg'
              alt = 'Icon square check'
              label = 'Done'
              value = {doneTasks}
            />

          </div>
        </div>
        <div className="todo-island__form">
          <div className="todo-island__input-field">
            <span className="todo-island__input-icon">
              <img src="./src/assets/img/icon-pen.svg" alt="Icon pen" />
            </span>
            <input 
            type="text" 
            placeholder="Add a new task..." className="todo-island__input"
            value= {newTaskLabel}
            onChange= {this.handleInputChange}
            />
          </div>
          <button 
          className="todo-island__form-action"
          onClick={this.handleAddTask}
          >
            <img src="./src/assets/img/icon-plus.svg" alt="Icon plus"/>
            <p className="todo-island__action-label">Add</p>
          </button>
        </div>
        <div className="todo-island__body">
          <SegmentedControl
            labels = {['All', 'Active', 'Completed']}
            selectedIndex = {selectedFilterIndex}
            onChange = {this.handleFilterChange}
          />
          <div className="panel">
            <ul className="task-list">
              {filteredTasks.map((task)=>(
                <TaskItem
                key={task.id}
                label = {task.label}
                isChecked = {task.isChecked}
                onChange = {()=> this.handleToggleTask(task.id)}
                onEdit = {(newLabel) => {this.handleEdit(task.id, newLabel)}}
                onDelete = {() => { this.handleDelete(task.id)}}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}