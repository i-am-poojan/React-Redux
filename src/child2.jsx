import React, { Component } from 'react';
class Child2 extends Component {
  state = {
    count: 0,
  };
  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            this.setState(({ count }) => ({ count: count + 1 }));
          }}
        >
          +
        </button>
        <p>{this.state.count}</p>
        <button
          type="button"
          onClick={() => {
            this.setState(({ count }) => ({ count: count - 1 }));
          }}
        >
          -
        </button>
      </div>
    );
  }
}
export default Child2;
