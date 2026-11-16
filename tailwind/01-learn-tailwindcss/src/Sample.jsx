import React from "react";

export class Sample extends React.Component {
  state = {
    count: 0,
  };

  handleIncrement = () => {
    this.setState(({ count }) => ({ count: count + 1 }));
  };

  handleReset = () => {
    this.setState({ count: 0 });
  };

  handleDecrement = () => {
    this.setState(({ count }) => ({ count: count - 1 }));
  };

  render() {
    const { label } = this.props;
    return (
      <div className="mx-auto flex w-150 flex-col items-center justify-between gap-5 rounded-3xl border-5 border-solid border-b-gray-950 bg-blue-500 p-6">
        <h2 className="text-justify text-5xl text-shadow-black">{label}</h2>
        <p className="text-center">{this.state.count}</p>
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg border-0 bg-black px-3 py-1 text-base text-white"
            onClick={this.handleDecrement}
          >
            -
          </button>
          <button
            className="rounded-lg border-0 bg-black px-3 py-1 text-base text-white"
            onClick={this.handleReset}
          >
            reset
          </button>
          <button
            className="rounded-lg border-0 bg-black px-3 py-1 text-base text-white"
            onClick={this.handleIncrement}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}
