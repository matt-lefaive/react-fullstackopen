import React from 'react';

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = "Patrick";
  const age = 30;
  
  return (
    <>
      <h1>Greeting</h1>
      <Hello name='Matt' age={20+4}/>
      <Hello name={name} age={age}/>
    </>
  )
}

export default App;