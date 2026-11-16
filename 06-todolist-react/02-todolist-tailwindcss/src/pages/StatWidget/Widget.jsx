import React from "react";
import { cn } from "@/utils/ui";

/**
 * @typedef {Object} Widgetprops;
 * @prop {import("react").ReactElement} icon
 * @prop {string} label
 * @prop {string} value
 * @prop {string} className
 */

/**
 * @extends {React.Component<Widgetprops>}
 */

export class Widget extends React.Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <div
        className={cn(className, "flex flex-col gap-2 rounded-xl p-3")}
        {...props}
      >
        {this.props.icon}
        <div className="flex items-end justify-between">
          <p className="text-sm">{this.props.label}</p>
          <p className="text-[40px] leading-none">{this.props.value}</p>
        </div>
      </div>
    );
  }
}
