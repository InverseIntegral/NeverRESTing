import rest from 'rest';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime);
const API_URI = 'http://localhost:3000/todos';

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

        return client(API_URI)
            .then(response => {
                dispatch(receiveTodos(response.entity));
            });
    };
}

export function addTodo(text) {
    return (dispatch) => {
        return client({
            'path': API_URI,
            'headers': {
                'Content-Type': 'application/json'
            },
            'entity': {
                text
            }
        }).then(response => {
            dispatch(receiveTodo(response.entity));
        });
    }
}

export function deleteTodo(id) {
    return (dispatch) => {
        return client({
            'path': API_URI + '/' + id + '/close',
            'method': 'POST'
        }).then(() => {
            dispatch(removeTodo(id));
        });
    }
}
