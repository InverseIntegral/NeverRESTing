import React, {PropTypes} from 'react'
import ToDoStates from 'models/ToDoStates';

const Todo = ({onClick, text, state}) => {

    let todoStyle = {
        textDecoration: ToDoStates.OPEN.getName() == state ? 'none' : 'line-through'
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

export default Todo