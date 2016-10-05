const todos = (state = {
    isFetching: false,
    todos: []
}, action) => {
    switch (action.type) {
        case 'RECEIVE_TODO':
            return Object.assign({}, state, {
                isFetching: false,
                todos: [
                    ...state.todos,
                    action.state
                ]
            });
        case 'REMOVE_TODO':
            let index = state.todos.findIndex((t) => t._id === action.id);

            return Object.assign({}, state, {
                isFetching: false,
                todos: [
                    ...state.todos.slice(0, index),
                    ...state.todos.slice(index + 1)
                ]
            });
        case 'REQUEST_TODOS':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_TODOS':
            return Object.assign({}, state, {
                isFetching: false,
                todos: action.state
            });
        default:
            return state
    }
};

export default todos