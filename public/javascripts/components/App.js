import React from 'react'
import AddTodo from '../containers/AddTodo'
import ConnectedTodoList from '../containers/ConnectedTodoList'
import ConnectedSpinner from '../containers/ConnectedSpinner'

const App = () => (
    <div>
        <div>
            <h1>NeverRESTing</h1>
        </div>
        <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=f33f36e205375acb0335">Click here</a>
        <AddTodo/>
        <ConnectedSpinner/>
        <ConnectedTodoList/>
    </div>
);

export default App