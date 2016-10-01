const todo = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
            };
        default:
            return state
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'REMOVE_TODO':
            let index = state.findIndex((t) => t.id === action.id);

            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];
        default:
            return state
    }
};

export default todos