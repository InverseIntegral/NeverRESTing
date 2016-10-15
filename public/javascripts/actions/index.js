import rest from 'rest';
import mime from 'rest/interceptor/mime';
import config from 'json!../../config/env.json';

const client = rest.wrap(mime);
const API_URI = config.API_URI;
const AUTHENTICATION_URI = config.AUTHENTICATION_URI;

/** Actions **/
export const receiveTodo = (json) => {
    return {
        type: 'RECEIVE_TODO',
        state: json
    }
};

export const toggledTodo = (id) => {
    return {
        type: 'TOGGLED_TODO',
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

/** Thunk Actions **/
export function fetchTodos() {
    return (dispatch) => {
        dispatch(requestTodos());

        return client(API_URI)
            .then(checkResponseCode)
            .then(response => {
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
        })
            .then(checkResponseCode)
            .then(response => {
                dispatch(receiveTodo(response.entity));
            }, handleError);
    }
}

export function toggleTodo(id) {
    return (dispatch) => {
        return client({
            'path': API_URI + '/' + id + '/toggle',
            'method': 'POST'
        })
            .then(checkResponseCode)
            .then(() => {
                dispatch(toggledTodo(id));
            }, handleError);
    }
}

const checkResponseCode = (response) => {
    if (response.status.code == 401) {
        window.location.href = AUTHENTICATION_URI;
    } else {
        return response;

    }
};

const handleError = () => {
    Materialize.toast("Couldn\'t reach the other end", 6000);
};
