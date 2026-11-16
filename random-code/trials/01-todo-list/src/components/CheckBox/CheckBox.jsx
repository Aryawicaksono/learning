import React from "react";
import styles from './CheckBox.module.css';
import clsx from "clsx";

/**
 * @typedef {Object} CheckBoxCustomProps
 * @prop {React.ReactNode} children
 * @prop {string|undefined} className
 */

/**
 * @typedef {CheckBoxCustomProps & React.ButtonHTMLAttributes} CheckBoxProps
 */

/**
 * @extends {React.Component<CheckBoxProps>}
 */

export class CheckBox extends React.Component{
  render(){
    const {className, ...props} = this.props;

    return(
      <button
        className={clsx(styles.checkBox, className)}
        {...props}
      >
        {this.props.children}
      </button>
    )
  }
}