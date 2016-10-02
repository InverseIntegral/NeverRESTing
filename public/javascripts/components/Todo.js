import React, {PropTypes} from 'react'

const Todo = ({onClick, text}) => (
    <li onClick={onClick}>
        {text}
    </li>
);

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default Todo