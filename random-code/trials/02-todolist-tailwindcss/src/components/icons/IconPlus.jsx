import React from "react";
import { DEFAULT_COLOR } from "@/constants/colorDefault";

/**
 * @typedef {Object} IconPlusProps
 * @prop {string} color
 */

/**
 * @extends {React.Component<IconPlusProps>}
 */
export class IconPlus extends React.Component {
  render() {
    return (
      <svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...this.props}
      >
        <path
          d="M3.33325 8H12.6666"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={this.props.color ?? DEFAULT_COLOR}
        />
        <path
          d="M8 3.33334V12.6667"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={this.props.color ?? DEFAULT_COLOR}
        />
      </svg>
    );
  }
}
