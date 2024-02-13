import React, { Component, PureComponent } from 'react'
import shallowCompare from 'react-addons-shallow-compare';
// export default class Child4 extends Component 
export default class Child4 extends PureComponent{
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
    
    render() {
      console.log("Child 4 render");
      const { count } = this.props
    return (
        <>
      <div>
        Child4 component
      </div>
      <p>{count}</p>
      </>
    )
  }
}
