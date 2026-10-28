import React from "react";

import { SegmentedControl } from "./SegmentedControl";


const Status = Object.freeze({
  ALL:0,
  ACTIVE: 1,
  COMPLETED: 2,
});

const StatusLabel = {
  [Status.ALL]: 'All',
  [Status.ACTIVE]: 'Active',
  [Status.COMPLETED]: 'Completed',
}

const statuses = [
  StatusLabel[Status.ALL],  
  StatusLabel[Status.ACTIVE],
  StatusLabel[Status.COMPLETED],
];

export class App extends React.Component{
  state = {
    tasks: [],
    selectedStatusIndex: 0,
  }
  /**
   * 
   * @param {number} index 
   */
  handleSelectStatusSegment = (index) => {
    this.setState({selectedStatusIndex: index});
  }

  handleVisibleTasks(){
    switch (this.state.selectedStatusIndex) {
      case Status.ALL:
        return this.state.tasks;
      case Status.ACTIVE:
        return this.state.tasks.filter((task) => !task.isCompleted);
      case Status.COMPLETED:
        return this.state.tasks.filter(task => task.isCompleted);
    }
  }

  render(){
    return(
      <SegmentedControl
      segments= {statuses}
      selectedIndex={this.state.selectedStatusIndex}
      onSelectSegment = {this.handleSelectStatusSegment}
      ></SegmentedControl>
    )
  }
}