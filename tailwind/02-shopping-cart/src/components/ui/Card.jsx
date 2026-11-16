import React from "react";
import { cn } from "@/utils";

/**
 * @typedef {Object} CustomCardProps
 * @prop {string} className
 * @prop {React.ReactNode} children
 */

/**
 * @typedef {CustomCardProps & React.LiHTMLAttributes<HTMLLIElement>} CardProps
 */

/**
 * @extends {React.Component<CardProps>}
 */

export class Card extends React.Component {
  render() {
    const { className, ...props } = this.props;

    return (
      <li className={cn("rounded-md bg-white p-3", className)} {...props}>
        {this.props.children}
      </li>
    );
  }
}
