import React from 'react'
import AddTodo from '../containers/AddTodo'
import ConnectedTodoList from '../containers/ConnectedTodoList'
import ConnectedSpinner from '../containers/ConnectedSpinner'

const App = () => (
    <div>
        <div>
            <h1>NeverRESTing</h1>
        </div>
        <AddTodo/>
        <ConnectedSpinner/>
        <ConnectedTodoList/>
    </div>
);

export default App