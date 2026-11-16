import React from "react";
import styles from './Button.module.css';
import clsx from "clsx";

/**
 * @typedef {Object} ButtonProp
 * @prop {any} children - any value as child
 * @prop {()=>void} onClick 
 * @prop {string | string[] | Record<string, boolean>} [classNames] - add modifier
 */

/**
 * @extends {React.Component<ButtonProp>}
 */

export class Button extends React.Component{

  handleClick = () => {
    if (this.props.onClick){
      this.props.onClick();
    }
  }

  render(){
    <button 
      className={clsx(styles.button, this.props.classNames)}
      onClick={this.handleClick}
      >
      {this.props.children}
    </button>
  }
}
