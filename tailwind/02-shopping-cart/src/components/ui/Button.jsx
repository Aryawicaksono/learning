import React from "react";
import { cn } from "@/utils";

/**
 * @typedef {Object} CustomButtonProps
 * @prop {string|undefined} [className]
 * @prop {React.ReactNode} children
 */

/**
 * @typedef {CustomButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>} ButtonProps
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
          "cursor-pointer rounded-full border bg-white px-6 py-0.5 text-lg",
          className,
        )}
        {...props}
      >
        {this.props.children}
      </button>
    );
  }
}
