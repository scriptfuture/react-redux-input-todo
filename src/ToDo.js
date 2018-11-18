import React, { Component } from 'react';

import { connect } from './custom-redux'
import { addTodo, removeTodo } from './actions'

import './ToDo.css';

class ToDo extends Component {
    
  state = {
    todoText: ''
  };
    

  constructor() {
     super();
      
     // привязываем контекст к обработчикам событий
     this.updateText = this.updateText.bind(this);
     this.addTodo = this.addTodo.bind(this);
  }

    
  updateText(e) {

    const { value } = e.target;

    this.setState({todoText: value});

  }

  addTodo() {
    
    this.props.addTodo(this.state.todoText);

    this.setState({todoText: ''});
  
  }
    
  render() {
      
    return (
      <div>
        <label>{this.props.title || 'Без названия'}</label>
        <div>
          <input
            value={this.state.todoText}
            placeholder="Название задачи"
            onChange={this.updateText}
          />
          <button onClick={this.addTodo}>Добавить</button>
          <ul>
            {this.props.todos.map((todo, idx) => 
              <li className='todo' key={idx}>
                <span className='text'>{todo}</span>
                <span className="remove-todo" onClick={() => this.props.removeTodo(idx)}>[x]</span>
              </li>
            )}
           
          </ul>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ toDoList }) => ({
    todos: toDoList
})

const mapDispatchToProps = (dispatch) => ({
    addTodo: text => dispatch(addTodo(text)),
    removeTodo: index => dispatch(removeTodo(index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDo)
