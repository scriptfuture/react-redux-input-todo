// actions
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

// action creators
export const addTodo = todo => ({
  type: ADD_TODO,
  payload: todo,
});

export const removeTodo = index => ({
  type: REMOVE_TODO,
  payload: index,
});