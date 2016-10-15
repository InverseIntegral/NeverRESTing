import {connect} from 'react-redux'
import TodoList from '../components/TodoList'
import {deleteTodo} from '../actions';

const mapStateToProps = (state) => {


    return {
        todos: state.todos.sort((a, b) => {

            if (a.state > b.state) {
                return -1;
            }

            if (a.state < b.state) {
                return 1;
            }

            return 0;
        })
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
    mapDispatchToProps,
    (stateProps, dispatchProps, ownProps) => {
        return Object.assign({}, ownProps, stateProps, dispatchProps);
    },
    {
        pure: false
    }
)(TodoList);

export default ConnectedTodoList;