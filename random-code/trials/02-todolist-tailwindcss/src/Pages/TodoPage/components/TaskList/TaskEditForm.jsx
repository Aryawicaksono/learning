import React from "react";
import { cn } from "@/utils/ui";

import { IconCheck, IconX } from "@/components/icons";

/**
 * @typedef {Object} TaskEditFormProps
 * @prop {string} className
 * @prop {string} value
 * @prop {()=>void} onChange
 * @prop {()=>void} onKeyDown
 * @prop {()=>void} onSaveEdit
 * @prop {()=>void} onCancelEdit
 */

/**
 * @extends {React.Component<TaskEditFormProps>}
 */
export class TaskEditForm extends React.Component {
  inputRef = React.createRef();

  componentDidMount() {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
      this.inputRef.current.select();
    }
  }

  render() {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-3",
          this.props.className,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <input
          ref={this.inputRef}
          type="text"
          className="border-accent-blue grow rounded-lg border px-2 py-1 leading-none font-medium text-neutral-900 outline-none placeholder:text-neutral-400"
          value={this.props.value}
          onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown}
        />
        <div className="flex gap-3">
          <button
            className="flex h-5 w-5 cursor-pointer items-center justify-center rounded p-0.5 hover:bg-neutral-200"
            onClick={(event) => this.props.onSaveEdit(event)}
          >
            <IconCheck color="#4D9A44" />
          </button>
          <button
            className="flex h-5 w-5 cursor-pointer items-center justify-center rounded p-0.5 hover:bg-neutral-200"
            onClick={(event) => this.props.onCancelEdit(event)}
          >
            <IconX color="#4A4A4A" />
          </button>
        </div>
      </div>
    );
  }
}
