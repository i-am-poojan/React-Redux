import React, { Component, createRef } from 'react';
import TodoFilter from '@/components/todoFilter';
import TodoForm from '@/components/todoForm';
import TodoList from '@/components/todoList';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import ConfirmDelete from '@/components/confirmDelete';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
const perPageItem = 5;
export default class TodoApp extends Component {
  state = {
    todoList: [],
    filterType: 'all',
    editMode: 0,
    page: 1,
  };

  inputRef = createRef();
  editRef = createRef();

  async componentDidMount() {
    this.loadTodo();
  }

  loadTodo = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/todoList?_page${this.page}&_per_page=5`,
      );
      const json = await res.json();
      this.setState({ todoList: json });
    } catch (error) {
      console.error(error);
    }
  };

  addTodo = async event => {
    try {
      const inputText = this.inputRef.current;
      event.preventDefault();
      const res = await fetch('http://localhost:3000/todoList', {
        method: 'POST',
        body: JSON.stringify({
          text: inputText.value,
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
          inputText.value = '';
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  toggleComplete = async item => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...item,
          // isDone: !item.isDone,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();
      this.setState(({ todoList }) => {
        const index = todoList.findIndex(x => x.id === item.id);
        return {
          todoList: [
            ...todoList.slice(0, index),
            json,
            ...todoList.slice(index + 1),
          ],
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  // editTodo = async item => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
  //       method: 'PUT',
  //       body: JSON.stringify({
  //         ...item,
  //         text: this.editRef.current.value,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       },
  //     });
  //     const json = await res.json();
  //     this.setState(({ todoList }) => {
  //       const index = todoList.findIndex(x => x.id === item.id);
  //       return {
  //         todoList: [
  //           ...todoList.slice(0, index),
  //           json,
  //           ...todoList.slice(index + 1),
  //         ],
  //         editMode: 0,
  //       };
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  DeleteTodo = async item => {
    try {
      await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'DELETE',
      });
      this.setState(({ todoList }) => {
        const index = todoList.findIndex(x => x.id === item.id);
        return {
          todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  changeFilterType = filterType => {
    this.setState({ filterType });
  };

  render() {
    const { todoList, filterType, editMode, page } = this.state;

    return (
      <div className="flex flex-col items-center gap-4 h-screen">
        <h1>TodoApp</h1>
        <TodoForm addTodo={this.addTodo} ref={this.inputRef} />
        {/* <TodoList
          todoList={todoList}
          filterType={filterType}
          toggleComplete={this.toggleComplete}
          DeleteTodo={this.DeleteTodo}
        /> */}
        <div className="flex flex-col gap-6 w-full p-6 flex-1">
          {todoList
            .slice((page - 1) * 5, page * 5)
            // .filter(x => {
            //   switch (filterType) {
            //     case 'pending':
            //       return x.isDone === false;
            //     case 'complated':
            //       return x.isDone === true;
            //     default:
            //       return true;
            //   }
            // })
            .map(x => {
              if (
                filterType === 'all' ||
                (filterType === 'pending' && x.isDone === false) ||
                (filterType === 'completed' && x.isDone === true)
              ) {
                return (
                  // <TodoListItem
                  //   key={x.id}
                  //   x={x}
                  //   DeleteTodo={DeleteTodo}
                  //   toggleComplete={toggleComplete}
                  // />

                  <div key={x.id} className="flex items-center">
                    <Checkbox
                      checked={x.isDone}
                      onCheckedChange={() =>
                        this.toggleComplete({ ...x, isDone: !x.isDone })
                      }
                    />
                    {editMode === x.id ? (
                      <form
                        className="flex-1 mx-4 flex"
                        onSubmit={() =>
                          this.toggleComplete({
                            ...x,
                            text: this.editRef.current.value,
                          })
                        }
                      >
                        <Input className="flex-1" ref={this.editRef} />
                        <Button type="submit" className="mx-4">
                          Submit
                        </Button>
                      </form>
                    ) : (
                      <p className="flex-1 px-4">{x.text}</p>
                    )}

                    {/* <Button type="button" onClick={() => DeleteTodo(x)}>
                Delete
              </Button> */}
                    <Button
                      className="mx-3"
                      type="button"
                      onClick={() =>
                        this.setState(
                          { editMode: x.id },
                          () => (this.editRef.current.value = x.text),
                        )
                      }
                    >
                      Edit
                    </Button>
                    <ConfirmDelete onClick={() => this.DeleteTodo(x)} />
                  </div>
                );
              }
            })}
        </div>
        {/* 
        <div className="flex w-full">
          <Button
            onClick={() => this.changeFilterType('all')}
            className="flex-1 rounded-none"
            variant={filterType === 'all' ? 'destructive' : 'default'}
          >
            All
          </Button>
          <Button
            onClick={() => this.changeFilterType('pending')}
            variant={filterType === 'pending' ? 'destructive' : 'default'}
            className="flex-1 rounded-none"
          >
            Pending
          </Button>
          <Button
            onClick={() => this.changeFilterType('completed')}
            variant={filterType === 'completed' ? 'destructive' : 'default'}
            className="flex-1 rounded-none"
          >
            Completed
          </Button>
        </div> */}

        <TodoFilter
          filterType={filterType}
          changeFilterType={this.changeFilterType}
        />
        <Button
          className="w-full"
          disabled={page >= Math.ceil(todoList.length / 5)}
          onClick={() =>
            this.setState(({ page }) => {
              return { page: page + 1 };
            })
          }
        >
          Next
        </Button>
        <Button
          className="w-full"
          onClick={() =>
            this.setState(({ page }) => {
              return { page: page - 1 };
            })
          }
          disabled={page <= 1}
        >
          Previous
        </Button>
      </div>
    );
  }
}
