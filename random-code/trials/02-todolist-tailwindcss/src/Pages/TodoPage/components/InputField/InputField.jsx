import React from "react";
import { cn } from "@/utils/ui";

import { InputTodo } from "@/Pages/TodoPage/components/InputField/InputTodo";

/**
 * @typedef {Object} InputFieldProps
 * @prop {string} [className]
 * @prop {React.ReactElement} [icon]
 * @prop {string} value
 * @prop {()=>void} onChange
 * @prop {()=>void} onKeyDown
 */

/**
 * @extends {React.Component<InputFieldProps>}
 */
export class InputField extends React.Component {
  render() {
    return (
      <div className={cn("flex items-center gap-3 py-2", this.props.className)}>
        {this.props.icon}
        <InputTodo
          className="flex-1"
          placeholder="Add new task..."
          value={this.props.value}
          onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown}
        />
      </div>
    );
  }
}
