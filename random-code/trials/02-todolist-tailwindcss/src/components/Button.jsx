import React from "react";
import { cn } from "@/utils/ui";

/**
 * @typedef {Object} ProtoButtonProps
 * @prop {string} [className]
 * @prop {React.ReactNode} children
 */

/**
 * @typedef {ProtoButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>} ButtonProps
 */

/**
 * @extends {React.Component<ButtonProps>}
 */
export class Button extends React.Component {
  render() {
    const { className, ...props } = this.props;

    return (
      <button
        className={cn(
          "shadow-soft rounded-lg bg-neutral-900 px-2.5 py-1.5 font-medium text-white disabled:bg-neutral-100 disabled:text-neutral-200",
          className,
        )}
        {...props}
      >
        {this.props.children}
      </button>
    );
  }
}
