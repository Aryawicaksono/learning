import React from "react";
import { cn } from "@/utils/ui";
import { IconCheck } from "@/components/icons";

/**
 * @typedef {Object} ProtoCheckBoxProps
 * @prop {string} [className]
 * @prop {boolean} isChecked
 */

/**
 * @typedef {ProtoCheckBoxProps & React.HTMLAttributes<HTMLDivElement>} CheckBoxProps
 */

/**
 * @extends {React.Component<CheckBoxProps>}
 */
export class CheckBox extends React.Component {
  render() {
    const { className, isChecked = false, ...props } = this.props;

    return (
      <div
        className={cn(
          "border-border checked:border-accent-blue h-5 w-5 cursor-pointer rounded-md border checked:flex checked:items-center checked:justify-center",
          className,
        )}
        {...props}
        data-checked={isChecked}
      >
        {this.props.isChecked && <IconCheck color="#0088ff" />}
      </div>
    );
  }
}
