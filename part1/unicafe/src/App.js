import React, { useState } from 'react'


const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

const Statistics = ({ data }) => {
  if (data.good === 0 && data.neutral === 0 && data.bad === 0) {
    return <div>No feedback given</div>
  }
  return (
    <table>
      <tr>
        <td>good</td>
        <td>{data.good}</td>
      </tr>
      <tr>
        <td>neutral</td>
        <td>{data.neutral}</td>
      </tr>
      <tr>
        <td>bad</td>
        <td>{data.bad}</td>
      </tr>
      <tr>
        <td>all</td>
        <td>{data.good + data.neutral + data.bad}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{(data.good - data.bad)/(data.good + data.neutral + data.bad)}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{(100 * data.good / (data.good + data.neutral + data.bad)) + ' %'}</td>
      </tr>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good'/>
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button onClick={() => setBad(bad + 1)} text='bad'/>
      <h1>statistics</h1>
      <Statistics data={{good, neutral, bad}}/>
    </div>
  )
}

export default App;
