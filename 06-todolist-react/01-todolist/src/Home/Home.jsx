import React from "react";

import { StatWidgets } from "../StatWidgets";
import { FormInput } from "../FormInput";
import { SegmentedControl } from "../SegmentedControl";
import { TaskList } from "../TaskList";
import { NoTasks } from "../NoTasks";

import styles from './Home.module.css';

const Status = {
  ALL: 0,
  ACTIVE: 1,
  COMPLETED:2,
}

const statusLabel = {
  [Status.ALL]: 'All',
  [Status.ACTIVE]: 'Active',
  [Status.COMPLETED]: 'Completed',
}

const statuses = [
  statusLabel[Status.ALL],
  statusLabel[Status.ACTIVE],
  statusLabel[Status.COMPLETED]
]

export class Home extends React.Component{
  state = {
    tasks: [
      {
        id: 1,
        title: 'Implementasi halaman register',
        isCompleted: false,
      },
      {
        id: 2,
        title: 'Build halaman dashboard',
        isCompleted: false,
      },
      {
        id: 3,
        title: 'Komponen Todo List',
        isCompleted: true,
      }
    ],
    selectedStatusIndex: 0,
    newTaskTitle: '',
    editingTaskId: null,
  }
  /**
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event 
   * @returns {void}
   */

  handleInputChange = (event) => {
    this.setState({newTaskTitle: event.target.value});
  }

  handleAddTask = () => {
    if (!this.state.newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: this.state.newTaskTitle,
      isCompleted: false,
    }

    this.setState({
      tasks: [...this.state.tasks, newTask],
      newTaskTitle: '',
    })
  }
  /**
   * 
   * @param {React.KeyboardEvent<HTMLInputElement>} event 
   */
  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleAddTask();
    }
  }

  /**
   * 
   * @param {number} index 
   */
  handleSelectStatusSegment = (index)=>{
    this.setState({selectedStatusIndex: index});
  }

  handleVisibleTasks = () => {
    switch(this.state.selectedStatusIndex){
      case Status.ALL:
        return this.state.tasks;
      case Status.ACTIVE:
        return this.state.tasks.filter(task => !task.isCompleted);
      case Status.COMPLETED:
        return this.state.tasks.filter(task => task.isCompleted);
    }
  }
  /**
   * @param {number} taskId
   * @returns {void}
   */
  handleToggleTask = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => 
        taskId === task.id
        ?{...task, isCompleted: !task.isCompleted}
        : task
      ),
    }))
  }
/**
 * 
 * @param {number} taskId 
 */
  handleEditTask = (taskId) => {
    this.setState({editingTaskId: taskId})
  }
/**
 * 
 * @param {number} taskId 
 * @param {string} newTitle 
 */
  handleSaveEdit = (taskId, newTitle) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => 
        task.id === taskId
        ? {...task, title: newTitle}
        : task
      ),
      editingTaskId: null,
    }))
  }
  /**
   * @param {number} taskId
   * @returns {void}
   */
  handleDeleteTask = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== taskId)
    }))
  }

  render(){
    const allTasks = this.state.tasks;
    const activeTasks = allTasks.filter(task => !task.isCompleted);
    const completedTasks = allTasks.filter(task => task.isCompleted);

    const panelBodyStyle = this.state.tasks.length === 0
      ?{padding: '114px 192px'}
      :{padding: '12px'};

    const statWidgetData = [
      {
        src: './src/assets/img/icon-note.svg',
        alt: 'Icon note',
        backgroundColor: 'linear-gradient(to bottom, #CF8BF9, #B264FD)',
        labelColor: '#F2C7FF',
        valueColor: '#F2C7FF',
        label: 'Task',
        value: allTasks.length,
      },
       {
        src: './src/assets/img/icon-layout.svg',
        alt: 'Icon layout box',
        backgroundColor: 'linear-gradient(to bottom, #5F98FF, #1865D5)',
        labelColor: '#82D0FF',
        valueColor: '#82D0FF',
        label: 'Active',
        value: activeTasks.length,
      }, 
      {
        src: './src/assets/img/icon-sqr-check.svg',
        alt: 'Icon square check',
        backgroundColor: 'linear-gradient(to bottom, #85E980, #4D9A44)',
        labelColor: '#D4F5D0',
        valueColor: '#D8F4D6',
        label: 'Done',
        value: completedTasks.length,
      },
    ]
    return(
      <div className={styles.todoIsland}>
        <div className={styles.header}>
          <h3 className={styles.title}>Todolist</h3>
          <StatWidgets
            statWidgets={statWidgetData}
          />
        </div>
        <FormInput
          src="./src/assets/img/icon-pen.svg"
          alt="Icon pen"
          placeholder="Add New Task..."
          value={this.state.newTaskTitle}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          btnSrc="./src/assets/img/icon-plus.svg"
          btnAlt="Icon plus"
          btnLabel="Add"
          onClick={this.handleAddTask}
        />
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <SegmentedControl
              segments={statuses}
              selectedIndex={this.state.selectedStatusIndex}
              onSelectSegment={this.handleSelectStatusSegment}
            />
          </div>
          <div 
          className={styles.panelBody}
          style={panelBodyStyle}
          >
            {this.state.tasks.length === 0
            ? <NoTasks/>
            : <TaskList
              tasks={this.handleVisibleTasks()}
              editingTaskId={this.state.editingTaskId}
              onToggleTask={this.handleToggleTask}
              onEditTask={this.handleEditTask}
              onSaveEdit={this.handleSaveEdit}  
              onDeleteTask={this.handleDeleteTask}
            />
            }
            
          </div>
        </div>
      </div>
      
    )
  }
}