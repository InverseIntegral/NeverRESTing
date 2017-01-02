import React from 'react'
import {connect} from 'react-redux'
import {login} from '../actions';

let LoginForm = ({dispatch}) => {
    let username;
    let password;

    return (
        <div className="flex_item">
            <form onSubmit={e => {
                e.preventDefault();

                if (!username.value.trim() || !password.value.trim()) {
                    return
                }

                dispatch(login(username.value, password.value))
            }}>
                <h1>Login</h1>

                <label htmlFor="username">Username</label>
                <input type="text" name="username" required ref={node => username = node}/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" required ref={node => password = node}/>

                <button type="submit" className="btn waves-effect waves-light light-blue darken-4">Login</button>
            </form>
        </div>
    )
};

LoginForm = connect()(LoginForm);

export default LoginForm;