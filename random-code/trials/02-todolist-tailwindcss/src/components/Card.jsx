import React from "react";
import { cn } from "@/utils/ui";

/**
 * @typedef {Object} ProtoCardProps
 * @prop {string} [className]
 * @prop {React.ReactNode} children
 */

/**
 * @typedef {ProtoCardProps & React.HTMLAttributes<HTMLDivElement>} CardProps
 */

/**
 * @extends {React.Component<CardProps>}
 */
export class Card extends React.Component {
  render() {
    const { className, ...props } = this.props;

    return (
      <div className={cn("rounded-xl p-3", className)} {...props}>
        {this.props.children}
      </div>
    );
  }
}
