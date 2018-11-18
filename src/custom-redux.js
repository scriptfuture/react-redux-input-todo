import React from 'react';

// создание хранилища
export const createStore = (reducer, initialState) => {
    
  let currentReducer = reducer;
  let currentState = initialState;
  const listeners = [];

  // получаем текущие состояние
  const getState = () => currentState;
  
  // передаём текущие состояние и действие через редьюсер
  const dispatch = action => {
      
     currentState = currentReducer(currentState, action);
     listeners.forEach(listener => listener());
  
     return action;
  };

  // подписываемся на события изменения хранилища
  const subscribe = listener => listeners.push(listener);

  return { getState, dispatch, subscribe };
}


// функция connect принимает компонент React и возвращает новый компонент React
export const connect = (mapStateToProps, mapDispatchToProps) =>
  Component => {
    return class extends React.Component {
        
      constructor() {
          super();
          
          // получем store из глобальной переменной помещённой туда Provider-ом
          this.store = window.store || {};
      }
        
      render() {
        return (
          <Component
            {...this.props}
            {...mapStateToProps(this.store.getState(), this.props)}
            {...mapDispatchToProps(this.store.dispatch, this.props)}
          />
        );
      }

      componentDidMount() {
        this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
      }
      
      componentWillUnmount() {
        this.unsubscribe()
      }

      handleChange = () => {
        this.forceUpdate();
      };
    }
  }
  
  
// компонент-обёртка для прокидывания store во все вложенные компоненты
export class Provider extends React.Component {
  componentWillMount() {
    window.store = this.props.store;
  }
  
  render() {
    return this.props.children;
  }
}
  
  