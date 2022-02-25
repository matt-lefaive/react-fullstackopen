import React from 'react';

const Filter = ({ value, onChange }) => {
    return (
      <div>
        Find countries
        <input type='text' value={value} onChange={onChange} />
      </div>
    );
  }

export default Filter;