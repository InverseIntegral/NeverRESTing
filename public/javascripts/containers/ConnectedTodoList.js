import {connect} from 'react-redux'
import TodoList from '../components/TodoList'
import {toggleTodo} from '../actions';

const mapStateToProps = (state) => {


    return {
        todos: state.todos.sort((a, b) => {

            if (a.active > b.active) {
                return -1;
            }

            if (a.active < b.active) {
                return 1;
            }

            return 0;
        })
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id))
        }
    }
};

const ConnectedTodoList = connect(
    mapStateToProps,
    mapDispatchToProps,
    (stateProps, dispatchProps, ownProps) => {
        return Object.assign({}, ownProps, stateProps, dispatchProps);
    },
    {
        pure: false // Forces an update and removes shallow check
    }
)(TodoList);

export default ConnectedTodoList;