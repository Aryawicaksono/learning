import React from "react";
import { cn } from "@/utils/ui";

/**
 * @typedef {Object} ProtoPanelProps
 * @prop {string} [className]
 * @prop {React.ReactNode} children
 */

/**
 * @typedef {ProtoPanelProps & React.HTMLAttributes<HTMLDivElement>} PanelProps
 */

/**
 * @extends {React.Component<PanelProps>}
 */
export class Panel extends React.Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <div className={cn("px-2 pb-2", className)} {...props}>
        {this.props.children}
      </div>
    );
  }
}

/**
 * @typedef {Object} ProtoPanelHeaderProps
 * @prop {string} [className]
 * @prop {React.ReactNode} children
 */

/**
 * @typedef {ProtoPanelHeaderProps & React.HTMLAttributes<HTMLDivElement>} PanelHeaderProps
 */

/**
 * @extends {React.Component<PanelHeaderProps>}
 */
class PanelHeader extends React.Component {
  render() {
    const { className, ...props } = this.props;

    return (
      <div
        className={cn("border-b border-neutral-100 p-2.5", className)}
        {...props}
      >
        {this.props.children}
      </div>
    );
  }
}

/**
 * @typedef {Object} ProtoPanelBodyProps
 * @prop {string} [className]
 * @prop {React.ReactNode} children
 */

/**
 * @typedef {ProtoPanelBodyProps & React.HTMLAttributes<HTMLDivElement>} PanelBodyProps
 */

/**
 * @extends {React.Component<PanelBodyProps>}
 */
class PanelBody extends React.Component {
  render() {
    const { className, ...props } = this.props;

    return (
      <div
        className={cn("max-h-90 scrollbar-thin overflow-y-auto p-3", className)}
        {...props}
      >
        {this.props.children}
      </div>
    );
  }
}

Panel.Header = PanelHeader;
Panel.Body = PanelBody;
