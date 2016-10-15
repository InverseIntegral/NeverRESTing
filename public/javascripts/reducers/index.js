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
        case 'TOGGLED_TODO':
            let index = state.todos.findIndex((t) => t._id === action.id);

            let newState = Object.assign({}, state, {
                isFetching: false
            });

            newState.todos[index].active = !newState.todos[index].active;
            return newState;
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
            return state;
    }
};

export default todos