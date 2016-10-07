import React, {PropTypes} from 'react'

const Todo = ({onClick, text}) => (
    <li onClick={onClick} className="collection-item">
        {text}
    </li>
);

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default Todo