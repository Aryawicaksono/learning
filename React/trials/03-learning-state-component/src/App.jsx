import React from "react";

import { CountCard } from "./CountCard";

import './index.css';

export class App extends React.Component{
  render(){
    return (
      <div className="card-list">
        <CountCard
          title = 'Apple'
          step = {2}
          />
        <CountCard
        title = 'Orange'
        step = {1}
        />
      </div>
    )
  }
}