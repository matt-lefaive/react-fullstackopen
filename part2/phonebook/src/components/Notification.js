import React from 'react';

const Notification = ({ message, isError }) => {
    const error = {
        color: 'red',
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: '5px',
        padding:10,
        marginBottom:10
    }

    const success = {
        ...error,
        color: 'green'
    }
    
    if (message === null) {
        return null;
    }

    return (
        <div style={isError ? error : success }>
            {message}
        </div>
    )
}

export default Notification;