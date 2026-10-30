  import React from "react";

  import styles from './TaskList.module.css';
  import { TaskItem } from "./TaskItem";

  /**
   * @typedef {Object} Task
   * @prop {number} id
   * @prop {string} title
   * @prop {boolean} isCompleted
   */

  /**
   * @typedef {Object} TaskListProps
   * @prop {Task[]} tasks
   * @prop {number|null} editingTaskId
   * @prop {(id:number) => void} onToggleTask
   * @prop {(id:number|null) => void} onEditTask
   * @prop {(id:number, newTitle:string) => void} onSaveEdit
   * @prop {(id:number) => void} onDeleteTask
   */

  /**
   * @extends {React.Component<TaskListProps>}
   */

  export class TaskList extends React.Component{
    render(){
      return(
        <ul className={styles.taskList}>
          {this.props.tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isEdit={task.id === this.props.editingTaskId}
              onToggleTask={this.props.onToggleTask}
              onEditTask={this.props.onEditTask}
              onSaveEdit={this.props.onSaveEdit}
              onDeleteTask={this.props.onDeleteTask}
            />
          ))}
        </ul>
      )
    }
  }