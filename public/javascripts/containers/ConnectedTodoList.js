import {connect} from 'react-redux'
import TodoList from '../components/TodoList'
import {deleteTodo} from '../actions';
import ToDoStates from 'models/ToDoStates';

const mapStateToProps = (state) => {
    return {
        todos: state.todos.filter(t => t.state === ToDoStates.OPEN.getName())
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(deleteTodo(id))
        }
    }
};

const ConnectedTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

export default ConnectedTodoList;