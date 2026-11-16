import React from "react";
import { cn } from "@/utils/ui";
import { TaskItem } from "@/Pages/TodoPage/components/TaskList/TaskItem";

/**
 * @typedef {Object} TaskListProps
 * @prop {string} [className]
 * @prop {import('@/models/Task').Task[]} tasks
 * @prop {string} editedTitle
 * @prop {(id:number)=>void} onToggleTask
 * @prop {(currentTitle:string)=>void} onStartEdit
 * @prop {(event: React.ChangeEvent<HTMLInputElement>)=>void} onChange
 * @prop {(id:number)=>void} onSaveEditTask
 * @prop {(id:number)=>void} onDeleteTask
 */

/**
 * @extends {React.Component<TaskListProps>}
 */

export class TaskList extends React.Component {
  render() {
    const {
      className,
      tasks,
      editedTitle,
      onToggleTask,
      onStartEdit,
      onChange,
      onSaveEditTask,
      onDeleteTask,
    } = this.props;

    return (
      <ul className={cn("flex flex-col gap-2.5", className)}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            editedTitle={editedTitle}
            isCompleted={task.isCompleted}
            onToggleTask={() => onToggleTask(task.id)}
            onStartEdit={() => onStartEdit(task.title)}
            onChange={onChange}
            onSaveEditTask={() => onSaveEditTask(task.id)}
            onDeleteTask={() => onDeleteTask(task.id)}
          />
        ))}
      </ul>
    );
  }
}
