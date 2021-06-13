import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import TodoList from './components/todolist'
import EditTodo  from './components/edittodo'
import CreateTodo  from './components/createtodo'

function App() {
  return (
    <Router>
      <div className='container'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>        
        <div className='collpase navbar-collapse'>
          <ul className='navbar-nav mr-auto'>
            <li className='navbar-item'>
              <Link to='/' className='nav-link'>Home</Link>
            </li>
            <li className='navbar-item'>
              <Link to='/create' className='nav-link'>Create Task</Link>
            </li>
          </ul>
        </div>  
      </nav>  
      <Route path='/' exact component= {TodoList} />
      <Route path='/edit/:id' component={EditTodo} />
      <Route path='/create' component={CreateTodo} />
      </div>      
    </Router>  
  );
}

export default App;
