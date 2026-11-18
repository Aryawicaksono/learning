import React from "react";
import { formatDuration } from "./utils/timer";

/**
 * @typedef {Object} TimerClassprops
 * @prop {string} label
 * @prop {number} duration
 */

/**
 * @typedef {Object} TimerClassState
 * @prop {number} value
 */

/**
 * @extends {React.Component<TimerClassprops>}
 */
export class TimerClass extends React.Component{
  _endMs;

  constructor(props){
    super(props);
    this._endMs = Date.now() + this.props.duration;
  }

  state = {
    remainingDurations: this.props.duration,
  }

  componentDidMount() {
    const _handle = setInterval(() => {
      const remainingDurations = Math.max(0, this._endMs - Date.now());

      this.setState({remainingDurations})

      if (remainingDurations <= 0){
        clearInterval(_handle);
      }
    }, 1000)
  }

  componentWillUnmount(){
    clearInterval(this._handle)
  }

  render(){
    return <div>
      <p>{this.props.label}</p>
      <h3>{formatDuration(this.state.remainingDurations)}</h3>
    </div>;
  }
}