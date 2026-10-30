import React from "react";

import styles from './SegmentedControl.module.css';

/**
 * @typedef {Object} SegmentedControlProps
 * @prop {string[]} segments
 * @prop {number} selectedIndex
 * @prop {(index:number)=> void} onSelectSegment
 */

/**
 * @extends {React.Component<SegmentedControlProps>}
 */

export class SegmentedControl extends React.Component{
  /**
   * 
   * @param {React.MouseEvent<HTMLButtonElement>} event
   */

  handleClick = (event) => {
    const index = Number(event.currentTarget.dataset.index);

    this.props.onSelectSegment(index);
  }

  render(){
    return(
      <div className={styles.segmentedControl}>
        {this.props.segments.map((segment, index)=>{
          const classNames = [styles.segment];
          
          if (index === this.props.selectedIndex) {
            classNames.push(styles.selectedSegment);
          }

          return (
            <button 
              key={index}
              className={classNames.join(' ')}
              onClick={this.handleClick}
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