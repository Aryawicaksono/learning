import React from "react";

export class Badge extends React.Component{
  render(){
    return(
      <span className="badge">{this.props.children}</span>
    )
  }
}