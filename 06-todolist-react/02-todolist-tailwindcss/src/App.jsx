import React from "react";
import { Widget } from "./pages/StatWidget/Widget";
import { IconClipBoard } from "./components/icons";

export class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="w-150">
          <Widget
            className="from-purple-from to-purple-to text-purple-foreground w-5 bg-linear-to-b"
            icon={<IconClipBoard color="#F2C7FF" />}
            label="Active"
            value="3"
          />
        </div>
      </div>
    );
  }
}
