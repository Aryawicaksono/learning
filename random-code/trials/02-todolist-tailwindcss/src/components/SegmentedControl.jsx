import React from "react";
import { cn } from "@/utils/ui";

/**
 * @typedef {Object} SegmentedControlProps
 * @prop {string} [className]
 * @prop {string[]} segments
 * @prop {number} selectedIndex
 * @prop {(index:number)=>void} onSelectedSegment
 */

/**
 * @extends {React.Component<SegmentedControlProps>}
 */
export class SegmentedControl extends React.Component {
  render() {
    return (
      <nav
        className={cn(
          "flex rounded-lg bg-neutral-50 p-0.5",
          this.props.className,
        )}
      >
        {this.props.segments.map((segment, index) => (
          <Segment
            key={index}
            label={segment}
            isSelected={this.props.selectedIndex === index}
            onClick={this.props.onSelectedSegment}
            data-index={index}
          />
        ))}
      </nav>
    );
  }
}

/**
 * @typedef {Object} ProtoSegmentProps
 * @prop {string} [className]
 * @prop {string} label
 * @prop {boolean} isSelected
 */

/**
 * @typedef {ProtoSegmentProps & React.ButtonHTMLAttributes<HTMLButtonElement>} SegmentProps
 */

/**
 * @extends {React.Component<SegmentProps>}
 */
class Segment extends React.Component {
  render() {
    const { className, isSelected, ...props } = this.props;

    return (
      <button
        className={cn(
          "selected:shadow-md selected:bg-white selected:text-neutral-900 cursor-pointer rounded-md px-3.5 py-1.25 text-neutral-400",
          className,
        )}
        data-selected={isSelected}
        {...props}
      >
        {this.props.label}
      </button>
    );
  }
}
