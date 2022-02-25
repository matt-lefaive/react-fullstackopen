import React from 'react';

const Total = ({ parts }) => {
    const total = parts.reduce((a, b) => ({exercises: a.exercises + b.exercises}));
    return (
        <p>
            <b>total of {total.exercises} exercises</b>
        </p>
    );
}

export default Total;