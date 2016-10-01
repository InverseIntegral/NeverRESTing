import {connect} from 'react-redux'
import TodoList from '../components/TodoList'
import {removeTodo} from '../actions';

const mapStateToProps = (state) => {
    return {
        todos: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(removeTodo(id))
        }
    }
};

const ConnectedTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

export default ConnectedTodoList;