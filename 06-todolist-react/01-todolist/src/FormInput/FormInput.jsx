import React from "react";

import styles from './FormInput.module.css';

/**
 * @typedef {Object} FormInputProps
 * @prop {string} src
 * @prop {string} alt
 * @prop {string} placeholder
 * @prop {string} value
 * @prop {string} btnSrc
 * @prop {string} btnAlt
 * @prop {string} btnLabel
 * @prop {(event:React.ChangeEvent<HTMLInputElement>)=>void} onChange
 * @prop {(event:React.KeyboardEvent<HTMLInputElement>)=> void} onKeyDown
 * @prop {(event:React.MouseEvent<HTMLButtonElement>)=> void} onClick
 */

/**
 * @extends {React.Component<FormInputProps>}
 */

export class FormInput extends React.Component{
  /**
   * @param {React.MouseEvent<HTMLButtonElement>} event 
   */

  handleClick(event){
    if (this.props.onClick){
      this.props.onClick(event)
    }
  }

  render(){
    return(
      <div className={styles.formInput}>
        <div className={styles.inputField}>
          <img src= {this.props.src} alt={this.props.alt} />
          <input 
          type="text" 
          onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown}
          value={this.props.value}
          placeholder={this.props.placeholder}
          className= {styles.input}
          />
        </div>
        <button
          className={styles.btn}
          onClick={this.props.onClick}
        >
          <img src={this.props.btnSrc} alt={this.props.btnAlt} />
          <span className={styles.btnLabel}>{this.props.btnLabel}</span>
        </button>
      </div>
    )
  }
}