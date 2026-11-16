import React from "react";
import { cn } from "@/utils/ui";

/**
 * @typedef {Object} ProtoInputTodoProps
 * @prop {string} [className]
 */
/**
 * @typedef {ProtoInputTodoProps & React.InputHTMLAttributes<HTMLInputElement>} InputTodoProps
 */

/**
 * @extends {React.Component<InputTodoProps>}
 */
export class InputTodo extends React.Component {
  render() {
    const { className, ...props } = this.props;

    return (
      <input
        className={cn(
          "text-neutral-900 outline-0 placeholder:text-neutral-400",
          className,
        )}
        type="text"
        {...props}
      />
    );
  }
}
