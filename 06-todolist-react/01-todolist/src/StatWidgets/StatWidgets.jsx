import React from "react";

import { StatWidget } from "./StatWidget/StatWidget";

import styles from './StatWidgets.module.css';

/**
 * @typedef {import('./StatWidget').StatWidgetProps} StatWidgetProps
 */

/**
 * @typedef {Object} StatWidgetsProps
 * @prop {StatWidgetProps[]} statWidgets
 */

/**
 * @extends {React.Component<StatWidgetsProps>}
 */

export class StatWidgets extends React.Component{
  render(){
    return(
      <div className={styles.statWidgets}>
        {this.props.statWidgets.map((widget, index)=>(
          <StatWidget key={index} {...widget}/>
        ))}
      </div>
    )
  }
}