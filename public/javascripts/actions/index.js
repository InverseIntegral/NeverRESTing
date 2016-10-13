import rest from 'rest';
import mime from 'rest/interceptor/mime';
import config from 'json!../../config/env.json';

const client = rest.wrap(mime);
const API_URI = config.API_URI;

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
                checkResponseCode(response.status.code);
                dispatch(receiveTodos(response.entity));
            }, handleError);
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
            checkResponseCode(response.status.code);
            dispatch(receiveTodo(response.entity));
        }, handleError);
    }
}

export function deleteTodo(id) {
    return (dispatch) => {
        return client({
            'path': API_URI + '/' + id + '/close',
            'method': 'POST'
        }).then((response) => {
            checkResponseCode(response.status.code);
            dispatch(removeTodo(id));
        }, handleError);
    }
}

const checkResponseCode = (code) => {
    if (code == 401) {
        window.location.href = "http://localhost:3000/authenticate";
    }
};

const handleError = (error) => {
    Materialize.toast("Couldn\'t reach the other end", 6000);
};
