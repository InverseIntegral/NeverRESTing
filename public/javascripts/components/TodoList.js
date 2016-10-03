import React, {PropTypes} from 'react'
import Todo from './Todo'

const TodoList = ({todos, onTodoClick}) => {

    let classes = "item";

    return (

        <div className={classes}>
            <ul>
                {todos.map(todo =>
                    <Todo key={todo._id}
                          {...todo}
                          onClick={() => {
                              classes += ' fade';
                              onTodoClick(todo._id);
                          }}
                    />
                )}
            </ul>
        </div>
    );
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired
};

export default TodoList