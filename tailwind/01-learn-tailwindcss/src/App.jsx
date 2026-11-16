import React from "react";
import { Sample } from "./Sample";

export class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Sample label="Orange" />
      </div>
    );
  }
}
