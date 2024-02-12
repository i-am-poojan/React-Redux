import PropTypes from 'prop-types';
import Child1 from './child1';
import Child2 from './child2';

import React, { Component } from 'react'

export default class App extends Component {
  state={
    name:"Poojan Patel"
  }
  render() {
    const{name}=this.state
    return (
      <div>
        {/* <Child1/> */}
        <Child2 name={name}/>
        <button type="button" onClick={()=>this.setState({name:"Dev Patel"})}>
          change name pls click me
        </button>
        <p>app component name is={name}</p>
      </div>
    )
  }
}


// function App({ title, desc, age, gender }) {
//   const bgcolor = 'red';
//   const color = 'white';
//   return (
//     <>
//       <p>
//         {title} {desc}
//       </p>
//       <p>{gender}</p>
//       <h1
//         style={{
//           background: bgcolor,
//           color: color,
//           textAlign: 'center',
//         }}
//       >
//         Hello World
//       </h1>
//       {age > 0 && <h3>{age}</h3>}
//       <button type="button">Submit</button>
//       <Child1 name="Poojan" />
//       <Child2 name="Patel" />
//     </>
//   );
// }

// App.propTypes = {
//   title: PropTypes.string.isRequired,
//   desc: PropTypes.string.isRequired,
//   age: PropTypes.number.isRequired,
//   gender: PropTypes.oneOf(['male', 'female']),
// };

// App.defaultProps = {
//   title: 'dfd',
//   desc: 'dfdfer',
//   age: 98,
//   gender: 'male',
// };

// export default App;
