import React, { Component,createRef } from 'react';
import Child3 from './child3';
import Child4 from './child4';

class Child2 extends Component {
  h1Ref=createRef();
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      count: 0,
      // greet: `Hello ${props.name}`,
      data: null,
    };
  }
  getSnapshotBeforeUpdate(prevProps,prevState){
    return 10;
  }
  componentDidUpdate(prevProps, prevState,snapshot) {
    console.log('snapshot',snapshot);
  }
  static getDerivedStateFromProps(props, state) {
    return {
      greet: `hello ${props.name}`,
    };
  }
  async componentDidMount() {
    
    console.log(this.h1Ref.current);
    try {
      const res = await fetch('https://fakestoreapi.com/carts/1');
      const json = await res.json();
      this.setState({ data: json });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  render() {
    if (this.state.count > 10) {
      throw new Error('Hello');
    }
    return (
      <div>
        {this.state.data && <h1>{JSON.stringify(this.state.data.date)}</h1>}
        <h1
          ref={this.h1Ref}
        >
          {this.state.greet}
        </h1>
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
        {this.state.count<5 && <Child4 count={this.state.count} />}
        <Child3 count={this.state.count} />
      </div>
    );
  }
}

export default Child2;
