import rest from 'rest';
import mime from 'rest/interceptor/mime';

var client = rest.wrap(mime);

const Title = ({todoCount}) => {
    return (
        <div>
            <div>
                <h1>To-Dos({todoCount})</h1>
            </div>
        </div>
    );
};

const TodoForm = ({addTodo}) => {
    let input;

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            addTodo(input.value);
            input.value = '';
        }}>
            <input className="form-control col-md-12" ref={node => {
                input = node;
            }}/>
            <br />
        </form>
    );
};

const Todo = ({todo, remove}) => {
    return (<a href="#" className="list-group-item" onClick={() => {
        remove(todo._id)
    }}>{todo.name}</a>);
};

const TodoList = ({todos, remove}) => {
    const todoNode = todos.map((todo) => {
        return (<Todo todo={todo} key={todo._id} remove={remove}/>)
    });

    return (<div className="list-group" style={{marginTop: '30px'}}>{todoNode}</div>);
};

class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
        this.apiUrl = 'http://localhost:3000/todos'
    }

    componentDidMount() {
        client(this.apiUrl)
            .then((response) => {

                this.setState({
                    data: response.entity
                });
            });
    }

    addTodo(val) {
        client({
            path: this.apiUrl,
            method: 'POST',
            entity: {
                name: val
            },
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            this.state.data.push(response.entity);
            this.setState({data: this.state.data});
        });
    }

    handleRemove(id) {

        const remainder = this.state.data.filter((todo) => {
            if (todo._id !== id) return todo;
        });

        client({
            path: this.apiUrl + '/' + id,
            method: 'DELETE'
        }).then(() => {
            this.setState({data: remainder});
        });
    }

    render() {

        return (
            <div>
                <Title todoCount={this.state.data.length}/>
                <TodoForm addTodo={this.addTodo.bind(this)}/>
                <TodoList
                    todos={this.state.data}
                    remove={this.handleRemove.bind(this)}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <TodoApp/>,
    document.getElementById('content')
);