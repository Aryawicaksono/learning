import React from "react";

export class CountCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {count: 0,};
  }

  handleIncrement(){
    this.setState({count: this.state.count + this.props.step});
  }

  handleDecrement(){
    this.setState({count: this.state.count - this.props.step});
  }

  handleReset(){
    this.setState({count: 0});
  }

  render(){
    return(
      <div className="count-card">
        <h3 className="count-card__title">{this.props.title}</h3>
        <p className="count-card__value">{this.state.count}</p>
        <div className="count-card__actions">
          <button 
            className="count-card__button"
            onClick={this.handleDecrement.bind(this)}
          >-</button>
          <button
           className="count-card__button"
           onClick={this.handleReset.bind(this)}
           >Reset</button>
          <button 
            className="count-card__button"
            onClick={this.handleIncrement.bind(this)}
            >+</button>
        </div>
      </div>
    )
  }
}