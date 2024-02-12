import React, { Component } from 'react';

class Test extends Component {
  state = {
    title: 'home Page',
  };

  render() {
    return (
      <>
        <h2>{`I am from test class ${this.state.title}`}</h2>
        <button
          type="button"
          onClick={() => this.setState({ title: 'Child 2 page' })}
        >
          Change Title
        </button>
      </>
    );
  }
}

export default Test;
