import {connect} from 'react-redux'
import TodoList from '../components/TodoList'
import {deleteTodo} from '../actions';

const mapStateToProps = (state) => {
    return {
        todos: state.todos
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