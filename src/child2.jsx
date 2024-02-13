import React, { Component } from 'react';
import Child3 from './child3';
import Child4 from './child4';

class Child2 extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      count: 0,
      // greet: `Hello ${props.name}`,
      data: null,
    };
  }
  static getDerivedStateFromProps(props, state) {
    return {
      greet: `hello ${props.name}`,
    };
  }
  async componentDidMount() {
    try {
      const res = await fetch('https://fakestoreapi.com/carts/1');
      const json = await res.json();
      this.setState({ data: json });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {
    if (this.state.count > 3) {
      throw new Error('Hello');
    }
    return (
      <div>
        {this.state.data && <h1>{JSON.stringify(this.state.data.date)}</h1>}
        <h1 id="cdm">{this.state.greet}</h1>
        <button
          type="button"
          onClick={() => {
            this.setState((state, props) => {
              return { greet: `Hello Changed after ${props.name}` };
            });
          }}
        >
          Greet me
        </button>
        <button
          type="button"
          onClick={() => {
            this.setState(({ count }) => ({ count: count + 1 }));
            console.log(this.state.count);
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
          <Child4 count={this.state.count} />
        <Child3 count={this.state.count}  />
      </div>
    );
  }
}

export default Child2;
