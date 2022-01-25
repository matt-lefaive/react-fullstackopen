import React, { useState } from 'react';

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>
  

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const nextAnecdote = () => {
    let rand;
    do {
      rand = Math.floor(Math.random() * anecdotes.length);
    } while (rand === selected)
    setSelected(rand);
  }

  const vote = () => {
    let copy = [...votes];
    copy[selected]++;
    setVotes(copy);
  }

  const maxIndex = (a) => {
    let max_val = a[0];
    let max_ind = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] > max_val) {
        max_val = a[i]
        max_ind = i
      }
    }
    return max_ind;
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text='vote' onClick={vote}/>
      <Button text='next anecdote' onClick={nextAnecdote}/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxIndex(votes)]}</p>
      <p>has {votes[maxIndex(votes)]} votes</p>
    </div>
  )
}

export default App;