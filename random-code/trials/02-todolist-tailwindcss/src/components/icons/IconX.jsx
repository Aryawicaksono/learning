import React from "react";
import { DEFAULT_COLOR } from "@/constants/colorDefault";

/**
 * @typedef {Object} IconXProps
 * @prop {string} color
 */

/**
 * @extends {React.Component<IconXProps>}
 */
export class IconX extends React.Component {
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
          d="M12 4L4 12M4 4L12 12"
          stroke={this.props.color ?? DEFAULT_COLOR}
          strokeWidth={1.33333}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}
