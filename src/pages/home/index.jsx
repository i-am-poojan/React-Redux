import React, { Component, createRef } from 'react';
import TodoFilter from '@/components/todoFilter';
import TodoForm from '@/components/todoForm';
import TodoList from '@/components/todoList';

export default class Home extends Component {
  state = {
    todoList: [],
    // todoText: '',
    filterType: 'all',
  };

  // changeText = event => {
  //   this.setState({ todoText: event.target.value });
  // };
  inputRef = createRef();

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:3000/todoList');
      const json = await res.json();
      this.setState({ todoList: json });
    } catch (error) {}
  }

  addTodo = async event => {
    event.preventDefault();
    const afterRef = this.inputRef.current;
    try {
      const res = await fetch('http://localhost:3000/todoList', {
        method: 'POST',
        body: JSON.stringify({
          text: afterRef.value,
          isDone: false,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();

      this.setState(
        ({ todoList }) => {
          return {
            todoList: [...todoList, json],
          };
        },
        () => {
          afterRef.value = '';
        },
      );
    } catch (error) {}
  };

  toggleTodo = async x => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${x.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...x,
          isDone: !x.isDone,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();

      this.setState(({ todoList }) => {
        const index = todoList.findIndex(item => item.id === x.id);
        return {
          todoList: [
            ...todoList.slice(0, index),
            json,
            ...todoList.slice(index + 1),
          ],
        };
      });
    } catch (error) {}
  };

  deleteTodo = async x => {
    try {
      await fetch(`http://localhost:3000/todoList/${x.id}`, {
        method: 'DELETE',
      });

      this.setState(({ todoList }) => {
        const index = todoList.findIndex(item => item.id === x.id);
        return {
          todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
        };
      });
    } catch (error) {}
  };

  changeFilter = filterType => {
    this.setState({ filterType: filterType });
  };

  render() {
    console.log('Render');
    const { todoList, filterType } = this.state;

    return (
      <>
        <div className="flex flex-col items-center gap-4 h-screen">
          <h1>Todo App</h1>
          <TodoForm addTodo={this.addTodo} ref={this.inputRef} />
          <TodoList
            todoList={todoList}
            filterType={filterType}
            deleteTodo={this.deleteTodo}
            toggleTodo={this.toggleTodo}
          />
          <TodoFilter
            filterType={filterType}
            changeFilter={this.changeFilter}
          />
        </div>
      </>
    );
  }
}
