import React from "react";
import styles from './Button.module.css';
import clsx from "clsx";

/**
 * @typedef {Object} CustomButtonProps
 * @prop {React.ReactNode} children
 * @prop {string|undefined} [className]
 */

/**
 * @typedef {CustomButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>} ButtonProps
 */

/**
 * @extends {React.Component<ButtonProps>}
 */
export class Button extends React.Component{
  render(){
    const {className, ...props} = this.props;
    
    return (
      <button
        className={clsx(styles.button, className)}
        {...props}
      >
        {this.props.children}
      </button>
    )
  }
}