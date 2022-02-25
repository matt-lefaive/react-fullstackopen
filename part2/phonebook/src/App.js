import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(people => {
        setPersons(people);
      });
  }, [])


  const handleNameChange = e => setNewName(e.target.value);
  const handleNumberChange = e => setNewNumber(e.target.value);
  const handleFilterChange = e => setFilter(e.target.value);

  const addName = (e) => {
    e.preventDefault();
    // Prevent user from adding same person twice
    if (persons.some(person => person.name === newName)) {
      const person = persons.find(p => p.name === newName)

      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...person, number: newNumber}
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setMessage(`Updated ${returnedPerson.name}`);
            setIsError(false);
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(err => {
            setMessage(`${persons.find(p => p.id === person.id).name} was already removed from the server`)
            setIsError(true)
            setTimeout(() => {
            setMessage(null)
          }, 5000)
          })
      }
    } else {
      const newPerson = {name: newName, number: newNumber}
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${newPerson.name}`);
          setIsError(false);
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        });
    }
  }

  const removePerson = id => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(err => {
          setMessage(`${persons.find(p => p.id === id).name} was already removed from the server`)
          setIsError(true)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError}/>
      <Filter onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addName} 
        onNameChange={handleNameChange} 
        onNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {personsToShow.map(person => {
        return (
          <Person 
            key={person.id}
            name={person.name}
            number={person.number}
            remove={() => removePerson(person.id)}
          />
        )})}
    </div>
  )
}

export default App;