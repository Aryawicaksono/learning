import React from "react";

import styles from './TaskItem.module.css';

/**
 * @typedef {Object} Task
 * @prop {number} id
 * @prop {string} title
 * @prop {boolean} isCompleted
 */

/**
 * @typedef {Object} TaskItemProps
 * @prop {Task} task
 * @prop {boolean} isEdit
 * @prop {(id:number) => void} onToggleTask
 * @prop {(id:number) => void} onEditTask
 * @prop {(id:number,newTitle:string) => void} onSaveEdit
 * @prop {(id:number) => void} onDeleteTask
 */

/**
 * @extends {React.Component<TaskItemProps>} 
 */

export class TaskItem extends React.Component{

  state = {
    editedTitle: this.props.task.title
  }
  /**
   * 
   * @returns {void}
   */
  handleToggle = () => {
    if(this.props.onToggleTask){
      this.props.onToggleTask(this.props.task.id);
    }
  }

  handleEdit = () => {
    this.setState({editedTitle:this.props.task.title});
    if (this.props.onEditTask){
      this.props.onEditTask(this.props.task.id);
    }
  }
  /**
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event 
   */
  handleInputChange = (event) => {
    this.setState({editedTitle: event.target.value});
  }

  handleSaveEdit = () => {
    const newTitle = this.state.editedTitle.trim();
    if (!newTitle) return

    if (this.props.onSaveEdit){
      this.props.onSaveEdit(this.props.task.id, newTitle)
    }
  }

  handleCancelEdit = () => {
    this.setState({editedTitle: this.props.task.title});
    if (this.props.onEditTask) {
      this.props.onEditTask(null);
    }
  }
  /**
   * 
   * @returns {void}
   */
  handleDelete = () => {
    if (this.props.onDeleteTask){
      this.props.onDeleteTask(this.props.task.id)
    }
  }

  render(){
    const checkboxStatus = [styles.checkbox];
    const contentStyle = {
      cursor: this.props.isEdit? null : 'pointer'
    }
    const cursorStyle = {
      cursor: this.props.isEdit? null : 'cursor',
    };
    const labelStyle = {
      display: this.props.isEdit? 'none' : 'flex',
    };
    const formStyle = {
      display: this.props.isEdit? 'flex' : 'none',
    };
    const actionsStyle = {
      display: this.props.isEdit? 'none' : 'flex'
    };

    if (this.props.task.isCompleted){
      checkboxStatus.push(styles.checked);
      labelStyle.textDecoration = 'line-through';
    }

    return(
      <li 
      className={styles.taskItem}
      data-id={this.props.task.id}
      >
        <div 
        className={styles.content}
        style={contentStyle}
        onClick={
          this.props.isEdit
          ? null
          : this.handleToggle
        }
        >
          <div 
            className={checkboxStatus.join(' ')}
            style={cursorStyle}
          ></div>
          <span 
            className={styles.label} 
            style={labelStyle}
          >
            {this.props.task.title}
          </span>
          <div 
            className={styles.form}
            style={formStyle}
          >
            <input 
              className={styles.input}
              type="text"
              onChange={this.handleInputChange}
              value={this.state.editedTitle}
            />
            <div className={styles.formActions}>
              <button
                className={styles.formAction}
                onClick={this.handleSaveEdit}
              >
                <img src="./src/assets/img/icon-check-green.svg" alt="Icon check green" />
              </button>
              <button
                className={styles.formAction}
                onClick={this.handleCancelEdit}
              >
                <img src="./src/assets/img/icon-x.svg" alt="Icon X" />
              </button>
            </div>
          </div>
        </div>
        <div 
        className={styles.actions}
        style={actionsStyle}
        >
          <button
            className={styles.action}
            onClick={this.handleEdit}
          >
            <img 
            src="./src/assets/img/icon-sqr-pen.svg" 
            alt="Icon square pen" 
            />
          </button>
          <button
            className={styles.action}
            onClick={this.handleDelete}
          >
            <img 
            src="./src/assets/img/icon-trash.svg" 
            alt="Icon trash" 
            />
          </button>
        </div>
      </li>
    )
  }
}