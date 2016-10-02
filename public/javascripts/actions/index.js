import rest from 'rest';
import mime from 'rest/interceptor/mime';
var client = rest.wrap(mime);

export const receiveTodo = (json) => {
    return {
        type: 'RECEIVE_TODO',
        state: json
    }
};

export const removeTodo = (id) => {
    return {
        type: 'REMOVE_TODO',
        id: id
    };
};

export const requestTodos = () => {
    return {
        type: 'REQUEST_TODOS'
    };
};

export const receiveTodos = (json) => {
    return {
        type: 'RECEIVE_TODOS',
        state: json
    };
};

export function fetchTodos() {
    return (dispatch) => {
        dispatch(requestTodos());

        return client('http://localhost:3000/todos')
            .then(response => {
                dispatch(receiveTodos(response.entity))
            });
    };
}

export function addTodo(text) {
    return (dispatch) => {
        dispatch(requestTodos());

        return client({
            'path': 'http://localhost:3000/todos',
            'headers': {
                'Content-Type': 'application/json'
            },
            'entity': {
                text
            }
        }).then(response => {
            dispatch(receiveTodo(response.entity))
        });
    }
}

export function deleteTodo(id) {
    return (dispatch) => {
        dispatch(requestTodos());

        return client({
            'path': 'http://localhost:3000/todos/' + id,
            'method': 'DELETE'
        }).then(() => {
            dispatch(removeTodo(id))
        });
    }
}
