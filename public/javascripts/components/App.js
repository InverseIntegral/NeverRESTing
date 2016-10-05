import React from 'react'
import AddTodo from '../containers/AddTodo'
import ConnectedTodoList from '../containers/ConnectedTodoList'

const App = () => (
    <div>
        <div className="item">
            <h1>NeverRESTing</h1>
        </div>
        <AddTodo/>
        <ConnectedTodoList/>
    </div>
);

export default App