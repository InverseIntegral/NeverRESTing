import rest from 'rest';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        rest('/todos').then(response => {
            this.setState({todos: JSON.parse(response.entity)});
        });
    }

    render() {
        return (
            <ToDoList todos={this.state.todos}></ToDoList>
        )
    }
}

class ToDoList extends React.Component{
    render() {

        var todos = this.props.todos.map(todo =>
            <ToDo key={todo._id} todo={todo}/>
        );

        return (
            <table>
                <tbody>
                    <tr>
                        <th>ToDos</th>
                    </tr>
                    {todos}
                </tbody>
            </table>
        )
    }
}

class ToDo extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.todo.name}</td>
            </tr>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('content')
);