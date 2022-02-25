import React from 'react';

const Person = ({ name, number, remove }) => {
    return (
        <div>
            {name} {number}
            <button onClick={remove}>delete</button>
        </div>
    )
}
export default Person;
