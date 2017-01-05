import React, {PropTypes} from 'react'
import Todo from './Todo'
import {If, Then} from 'react-if';

const TodoList = ({todos, onTodoClick}) => {
    return (
        <If condition={todos.length !== 0}>
            <Then>
                <ul className="collection">
                    {todos.map(todo =>
                        <Todo key={todo._id}
                              {...todo}
                              onClick={() => {
                                  onTodoClick(todo._id);
                              }}
                        />
                    )}
                </ul>
            </Then>
        </If>
    );
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired
};

export default TodoList
