import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import { createStore, Provider } from './custom-redux'

import ToDo from './ToDo';
import { reducer } from './reducers'

// init
let store = createStore(reducer, {toDoList: []});

ReactDOM.render(
    <Provider store={store}>
        <ToDo title="Список задач"/>
    </Provider>, 
document.getElementById('app'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
