import React from "react";

import styles from './SegmentedControl.module.css';

/**
 * @typedef {Object} SegmentedControlProps
 * @prop {string[]} segments
 * @prop {number} selectedIndex
 * @prop {(index:number)=> void} onSelectSegment
 */

/**
 * @extends React.Component<SegmentedControlProps>
 */

export class SegmentedControl extends React.Component{
  /**
   * 
   * @param {React.MouseEvent<HTMLButtonElement>} event 
   */

  handleClickSegment = (event) => {
    const index = Number(event.currentTarget.dataset.index);
    this.props.onSelectSegment(index);
  }

  render(){
    return(
      <div className={styles.segmentedControl}>
        {this.props.segments.map((segment, index) => {

          const className = [styles.segment];

          if (index === this.props.selectedIndex) {
            className.push(styles.selectedSegment)
          }

          return (
            <button             key={index}
              className= {className.join(' ')}
              onClick={this.handleClickSegment}
              data-index = {index}
            >
              {segment}
            </button>
          )
        })}
      </div>
    )
  }
}