import React from "react";
import { DEFAULT_COLOR } from "@/constants/colorDefault";

/**
 * @typedef {Object} IconLayoutProps
 * @prop {string} color
 */

/**
 * @extends {React.Component<IconLayoutProps>}
 */
export class IconLayout extends React.Component {
  render() {
    return (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...this.props}
      >
        <path
          d="M9 3H4C3.44772 3 3 3.44772 3 4V9C3 9.55228 3.44772 10 4 10H9C9.55228 10 10 9.55228 10 9V4C10 3.44772 9.55228 3 9 3Z"
          stroke={this.props.color ?? DEFAULT_COLOR}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 14H4C3.44772 14 3 14.4477 3 15V20C3 20.5523 3.44772 21 4 21H9C9.55228 21 10 20.5523 10 20V15C10 14.4477 9.55228 14 9 14Z"
          stroke={this.props.color ?? DEFAULT_COLOR}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 4H21"
          stroke={this.props.color ?? DEFAULT_COLOR}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 9H21"
          stroke={this.props.color ?? DEFAULT_COLOR}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 15H21"
          stroke={this.props.color ?? DEFAULT_COLOR}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 20H21"
          stroke={this.props.color ?? DEFAULT_COLOR}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}
