import React from "react";
import { cn } from "@/utils/ui";

import { Card } from "@/components";

/**
 * @typedef {Object} StatWidgetprops
 * @prop {string} [className]
 * @prop {string} [contentClassName]
 * @prop {React.ReactElement} icon
 * @prop {string} label
 * @prop {number} value
 */

/**
 * @extends {React.Component<StatWidgetprops>}
 */
export class StatWidget extends React.Component {
  render() {
    return (
      <Card
        className={cn(
          "flex flex-col gap-2 rounded-lg p-3",
          this.props.className,
        )}
      >
        {this.props.icon}
        <article
          className={cn(
            "flex items-end justify-between",
            this.props.contentClassName,
          )}
        >
          <p className="text-sm font-semibold">{this.props.label}</p>
          <p className="text-[2.5rem] leading-none">{this.props.value}</p>
        </article>
      </Card>
    );
  }
}
