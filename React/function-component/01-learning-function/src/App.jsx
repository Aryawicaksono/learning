import React from "react";
import { TimerClass } from "./TimerClass";
import { Timer } from "./Timer";


export class App extends React.Component {
  state = {
    duration: 0,
    label: "Default",
  }

  handle5SecondsDuration = () => {
    this.setState({duration: 5000});
  }

  handle10SecondsDuration = () => {
    this.setState({duration:10_000})
  }

  handleCooking = () => {
    this.setState({label: 'Cooking'})
  }

  handleSleeping = () => {
    this.setState({label: 'Sleeping'})
  }

  render() {
    return <div>
      <Timer label={this.state.label} duration={this.state.duration}/>
      <div>
        <button onClick={this.handle5SecondsDuration}> 5 seconds</button>
        <button onClick={this.handle10SecondsDuration}>10 seconds</button>
      </div>
      <div>
        <button onClick={this.handleCooking}>Cooking</button>
        <button onClick={this.handleSleeping}>Sleeping</button>
      </div>
    </div>
  }
}
