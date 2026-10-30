import React from "react";

import styles from "./StatWidget.module.css";

/**
 * @typedef {Object} StatWidgetProps
 * @prop {string} src
 * @prop {string} alt
 * @prop {string} backgroundColor
 * @prop {string} labelColor
 * @prop {string} valueColor

 * @prop {string} label
 * @prop {number} value
 */

/**
 * @extends {React.Component<StatWidgetProps>} 
 */

export class StatWidget extends React.Component{
  render(){
    return(
      <div className={styles.statWidget} style={{background:this.props.backgroundColor}}>
        <img src={this.props.src} alt={this.props.alt}/>
        <div className={styles.content}>
          <p className={styles.label} style={{color: this.props.labelColor}}>{this.props.label}</p>
          <p className={styles.value} style={{color:this.props.valueColor}}>{this.props.value}</p>
        </div>
      </div>
    )
  }
}