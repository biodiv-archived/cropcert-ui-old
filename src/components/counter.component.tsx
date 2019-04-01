import { observer } from "mobx-react";
import React, { Component } from "react";

import { CounterStore } from "../stores/counter.store";

class Counter extends Component<{ store: CounterStore }> {
  render() {
    return (
      <div>
        Counter: {this.props.store.count} <br />
        <button onClick={this.increment}> + </button>
        <button onClick={this.decrement}> - </button>
      </div>
    );
  }

  increment = () => {
    this.props.store.increment();
  };

  decrement = () => {
    this.props.store.decrement();
  };
}

export default observer(Counter);
