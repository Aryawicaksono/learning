import React from "react";
import { cn } from "@/utils/ui";

import { CheckBox } from "@/components";
import { TaskEditForm } from "@/Pages/TodoPage/components/TaskList/TaskEditForm";
import { IconSquarePen, IconTrash } from "@/components/icons";

/**
 * @typedef {Object} TaskItemProps
 * @prop {string} [className]
 * @prop {string} title
 * @prop {string} editedTitle
 * @prop {boolean} isCompleted
 * @prop {()=>void} onToggleTask
 * @prop {()=>void} onStartEdit
 * @prop {(event:React.ChangeEvent<HTMLInputElement>)=>void} onChange
 * @prop {()=>void} onSaveEditTask
 * @prop {()=>void} onDeleteTask
 */

/**
 * @typedef {Object} TaskItemState
 * @prop {boolean} isEditing
 */

/**
 * @extends {React.Component<TaskItemProps, TaskItemState>}
 */
export class TaskItem extends React.Component {
  state = {
    isEditing: false,
  };

  handleStartEdit = () => {
    this.setState({ isEditing: true });
    this.props.onStartEdit();
  };

  /**
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event
   */
  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.setState({ isEditing: false });
      this.props.onSaveEditTask();
    }
  };

  handleOnSaveEdit = () => {
    this.setState({ isEditing: false });
    this.props.onSaveEditTask();
  };

  handleCancelEdit = () => {
    this.setState({ isEditing: false });
  };

  render() {
    return (
      <li
        className={cn(
          "completed:bg-neutral-50 task-item flex cursor-pointer items-center justify-between rounded-lg border border-neutral-100 bg-white p-4.5",
          this.state.isEditing && "cursor-default",
          this.props.className,
        )}
        onClick={
          this.state.isEditing
            ? undefined
            : (event) => this.props.onToggleTask(event)
        }
        data-completed={this.props.isCompleted}
      >
        <div className="flex grow items-center gap-3">
          <CheckBox
            className={cn(this.state.isEditing && "cursor-default")}
            isChecked={this.props.isCompleted}
          />
          {this.state.isEditing ? (
            <TaskEditForm
              className="grow"
              value={this.props.editedTitle}
              onChange={this.props.onChange}
              onKeyDown={this.handleKeyDown}
              onSaveEdit={this.handleOnSaveEdit}
              onCancelEdit={this.handleCancelEdit}
            />
          ) : (
            <p
              className="completed:line-through completed:text-neutral-700 cursor-pointer leading-none text-neutral-900"
              data-completed={this.props.isCompleted}
            >
              {this.props.title}
            </p>
          )}
        </div>
        {!this.state.isEditing && (
          <div
            className="actions flex gap-3 opacity-0"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="flex h-5 w-5 items-center justify-center gap-3 rounded-sm p-0.5 hover:bg-neutral-200"
              onClick={this.handleStartEdit}
            >
              <IconSquarePen color="#4A4A4A" />
            </button>
            <button
              className="flex h-5 w-5 items-center justify-center gap-3 rounded-sm p-0.5 hover:bg-neutral-200"
              onClick={this.props.onDeleteTask}
            >
              <IconTrash color="#FF0000" />
            </button>
          </div>
        )}
      </li>
    );
  }
}
