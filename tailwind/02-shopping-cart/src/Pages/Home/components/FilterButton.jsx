import React from "react";
import { Button } from "@/components/ui";

/**
 * @typedef {Object} FilterButtonProps
 * @prop {()=>void} onClick
 */

/**
 * @extends {React.Component<FilterButtonProps>}
 */
export class FilterButton extends React.Component {
  render() {
    return <Button onClick={this.props.onClick}>Filter</Button>;
  }
}
