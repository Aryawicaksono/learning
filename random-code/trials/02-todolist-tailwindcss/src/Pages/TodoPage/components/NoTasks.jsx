import React from "react";
import { cn } from "@/utils/ui";
import { IconLayout } from "@/components/icons";

/**
 * @typedef {Object} NoTasksProps
 * @prop {string} [className]
 */

/**
 * @extends {React.Component<NoTasksProps>}
 */
export class NoTasks extends React.Component {
  render() {
    return (
      <div
        className={cn(
          "flex w-50 flex-col items-center gap-4.5",
          this.props.className,
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-50 p-3">
          <IconLayout color="#989898" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-center leading-0 font-semibold text-neutral-900">
            No tasks yet
          </p>
          <p className="text-center text-sm font-normal text-neutral-400">
            Add your first task above to get started. Stay productive!
          </p>
        </div>
      </div>
    );
  }
}
