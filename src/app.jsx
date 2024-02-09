import React from 'react';
const App = ({ title, desc }) => {
  //   console.log(props);
  const bgcolor = 'red';
  const color = 'white';
  return (
    <>
      {/* <p>{props.title}</p>
        <p>{props.desc}</p> */}
      <p>
        {title} {desc}
      </p>
      {/* <h1 style={{ background: 'Green', textAlign: 'center' }}>Hello World</h1> */}
      <h1
        style={{
          background: bgcolor,
          color: color,
          textAlign: 'center',
        }}
      >
        Hello World
      </h1>

      <button type="button">Submit</button>
    </>
  );
};
export default App;
