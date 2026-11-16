import React from "react";
import { DEFAULT_COLOR } from "@/constants/colorDefault";

/**
 * @typedef {Object} IconCheckProps
 * @prop {string} color
 */

/**
 * @extends {React.Component<IconCheckProps>}
 */
export class IconCheck extends React.Component {
  render() {
    return (
      <svg
        className={this.props.className}
        width={12}
        height={9}
        viewBox="0 0 12 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...this.props}
      >
        <path
          d="M10.3333 1L3.91667 7.41667L1 4.5"
          stroke={this.props.color ?? DEFAULT_COLOR}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}
