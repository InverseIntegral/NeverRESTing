import React, {PropTypes} from 'react';

const Todo = ({onClick, text, active}) => {

    let todoStyle = {
        textDecoration: active ? 'none' : 'line-through'
    };

    return (
        <li onClick={onClick} className="collection-item" style={todoStyle}>
            {text}
        </li>
    )
};

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default Todo;