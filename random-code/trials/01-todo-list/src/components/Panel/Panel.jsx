import React from "react";
import styles from './Panel.module.css';
import clsx from "clsx";

/**
 * @typedef {Object} PanelProps
 * @prop {string|undefined} className
 * @prop {string|undefined} bodyClassName
 * @prop {React.ReactElement} header
 * @prop {React.ReactElement} body
 */

/**
 * @extends {React.Component<PanelProps>}
 */
export class Panel extends React.Component{
  render(){
    const {className, bodyClassName} = this.props;

    return(
      <div 
        className={clsx(styles.panel, className)}
      >
        <div style={styles.header}>
          {this.props.header}
        </div>
        <div className={bodyClassName}>
          {this.props.body}
        </div>
      </div>
    )
  }
}