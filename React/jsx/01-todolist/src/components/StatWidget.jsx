import React from "react";

export class StatWidget extends React.Component{
  render(){
    const modifier = `stat-widget stat-widget--${this.props.mod}`;

    return(
      <div className={modifier}>
        <img src={this.props.src} alt={this.props.alt} className="stat-widget__icon" />
        <div className="stat-widget__content">
          <p className="stat-widget__label">{this.props.label}</p>
          <p className="stat-widget__value">{this.props.value}</p>
        </div>
      </div>
    )
  }
}
