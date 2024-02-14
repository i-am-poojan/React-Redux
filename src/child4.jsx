import React, { Component, PureComponent } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
// export default class Child4 extends Component
export default class Child4 extends PureComponent {
  // shouldComponentUpdate = (nextProps, nextState) => {
  //     if(this.props.count!= nextProps.count){
  //         return true;
  //     }
  //   return false
  // }

  // shallow module required for compare object to object
  //   shouldComponentUpdate = (nextProps, nextState) => {
  //     return shallowCompare(this,nextProps,nextState);
  // }

  mousemove = () => {
    console.log('Mouse move');
  };

  constructor(props) {
    super(props);
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }

  async componentDidMount() {
    document.addEventListener('mousemove', this.mousemove);
    this.interval = setInterval(() => {
      console.log('interval');
    }, 200);
    const res=await fetch("https://fakestoreapi.com/products",{signal:this.signal})
    const json=await res.json();
    console.log(json);

  };
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.mousemove);
    clearInterval(this.interval);
    this.controller.abort();
  }
  render() {
    console.log('Child 4 render');
    const { count } = this.props;
    return (
      <>
        <div>Child4 component</div>
        <p>{count}</p>
      </>
    );
  }
}
