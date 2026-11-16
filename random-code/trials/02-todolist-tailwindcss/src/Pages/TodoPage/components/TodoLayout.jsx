import React from "react";
import { cn } from "@/utils/ui";

/**
 * @typedef {Object} TodoLayoutProps
 * @prop {string} [className]
 * @prop {React.ReactNode} children
 */

/**
 * @extends {React.Component<TodoLayoutProps>}
 */
export class TodoLayout extends React.Component {
  render() {
    return (
      <div
        className={cn(
          "w-150 rounded-3xl border-2 border-white bg-neutral-50",
          this.props.className,
        )}
      >
        {this.props.children}
      </div>
    );
  }
}

/**
 * @typedef {Object} TodoHeaderLayoutProps
 * @prop {string} [className]
 * @prop {React.ReactNode} children
 */

/**
 * @extends {React.Component<TodoHeaderLayoutProps>}
 */
export class TodoHeaderLayout extends React.Component {
  render() {
    return (
      <div className={cn("px-4.5 pt-4.5 pb-2.5", this.props.className)}>
        {this.props.children}
      </div>
    );
  }
}

/**
 * @typedef {Object} TodoinputLayoutProps
 * @prop {string} [className]
 * @prop {React.ReactNode} children
 */

/**
 * @extends {React.Component<TodoinputLayoutProps>}
 */
export class TodoinputLayout extends React.Component {
  render() {
    return (
      <div className={cn("px-4.5 pt-4.5 pb-2.5", this.props.className)}>
        {this.props.children}
      </div>
    );
  }
}

/**
 * @typedef {Object} TodoBodyLayoutProps
 * @prop {string} [className]
 * @prop {React.ReactNode} children
 */

/**
 * @extends {React.Component<TodoBodyLayoutProps>}
 */
export class TodoBodyLayout extends React.Component {
  render() {
    return (
      <div className={cn("px-2 pb-2", this.props.className)}>
        {this.props.children}
      </div>
    );
  }
}

TodoLayout.Header = TodoHeaderLayout;
TodoLayout.Input = TodoinputLayout;
TodoLayout.Body = TodoBodyLayout;
