import React, {PropTypes} from 'react'
import Todo from './Todo'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { If, Then, Else } from 'react-if';

const TodoList = ({todos, onTodoClick}) => {
    return (
        <div className="item">
            <If condition={todos.length !== 0}>
              <Then>
                <ul className="collection" >
                    <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                        {todos.map(todo =>
                            <Todo key={todo._id}
                                  {...todo}
                                  onClick={() => {
                                      onTodoClick(todo._id);
                                  }}
                            />
                        )}
                    </ReactCSSTransitionGroup>
                </ul>
              </Then>
            </If>
        </div>
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
