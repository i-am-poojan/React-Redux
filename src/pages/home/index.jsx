import React, { Component, createRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { v4 as uuidv4 } from 'uuid';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const perPage = 5;
export default class Home extends Component {
  inputRef = createRef();
  editRef = createRef();
  state = {
    todoList: [],
    filterType: 'all',
    editMode: 0,
    page: 1,
    totalPages: 0,
    error: null,
  };

  async componentDidMount() {
    this.loadTodo(1);
  }
  loadTodo = async (currentPage, filterType = 'all') => {
    try {
      let url = `http://localhost:3000/todoList?_page=${currentPage}&_per_page=${perPage}`;
      if (filterType != 'all') {
        url += `&isDone=${filterType === 'complated' ? 1 : 0}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      this.setState({
        todoList: json.data,
        totalPages: json.pages,
        page: currentPage,
        filterType,
        error: null,
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  addTodo = async event => {
    try {
      event.preventDefault();
      const input = this.inputRef.current;

      const res = await fetch('http://localhost:3000/todoList', {
        method: 'POST',
        body: JSON.stringify({
          text: input.value,
          isDone: false,
          error: null,
        }),
        headers: {
          'Content-type': 'application/json',
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
          input.value = '';
        },
      );
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  toggleTodo = async x => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${x.id}`, {
        method: 'PUT',
        body: JSON.stringify(x),
        headers: {
          'Content-type': 'application/json',
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
    } catch (error) {
      this.setState({ error: error.message });
    }
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
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  filterTodo = filterType => {
    this.setState({ filterType });
  };

  render() {
    const { todoList, filterType, editMode, page, totalPages, error } =
      this.state;
    return (
      <div className="flex flex-col items-center h-screen">
        <h2>Todo App</h2>
        <form className="flex" onSubmit={this.addTodo}>
          <Input className="rounded-r-none" ref={this.inputRef} required />
          <Button className="rounded-l-none">Add Todo</Button>
        </form>

        <div className="flex-col items-center w-[90vw] gap-4 flex-1">
          {todoList.map(x => {
            if (
              filterType === 'all' ||
              (filterType === 'pending' && x.isDone === false) ||
              (filterType === 'complated' && x.isDone === true)
            )
              return (
                <div className="flex items-center gap-4" key={x.id}>
                  <Checkbox
                    checked={x.isDone}
                    onCheckedChange={() =>
                      this.toggleTodo({ ...x, isDone: !x.isDone })
                    }
                  />
                  {editMode === x.id ? (
                    <form
                      className="flex w-full"
                      onSubmit={e => {
                        e.preventDefault();
                        this.toggleTodo({
                          ...x,
                          text: this.editRef.current.value,
                          isDone: false,
                        });
                      }}
                    >
                      <Input
                        className="flex-1 mr-1"
                        ref={this.editRef}
                        defaultValue={x.text}
                      />
                      <Button type="submit">Save</Button>
                    </form>
                  ) : (
                    <p className={`flex-1 ${x.isDone ? 'line-through' : ''}`}>
                      {x.text}
                    </p>
                  )}

                  <Button onClick={() => this.setState({ editMode: x.id })}>
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="default" className="m-1">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => this.deleteTodo(x)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              );
          })}
          <div className="flex flex-col mx-auto gap-1 w-full">
            <Button
              type="button"
              disabled={page >= totalPages}
              onClick={() => this.loadTodo(page + 1)}
            >
              next
            </Button>
            <Button
              disabled={page <= 1}
              type="button"
              onClick={() => this.loadTodo(page - 1)}
            >
              previous
            </Button>
          </div>
        </div>

        <div className="flex w-full">
          <Button
            className="rounded-none flex-1"
            type="button"
            variant={filterType === 'all' ? 'destructive' : 'default'}
            onClick={() => this.loadTodo(1, 'all')}
          >
            All
          </Button>
          <Button
            className="rounded-none flex-1"
            variant={filterType === 'pending' ? 'destructive' : 'default'}
            type="button"
            onClick={() => this.loadTodo(1, 'pending')}
          >
            Pending
          </Button>
          <Button
            className="rounded-none flex-1"
            variant={filterType === 'complated' ? 'destructive' : 'default'}
            type="button"
            onClick={() => this.loadTodo(1, 'complated')}
          >
            Complated
          </Button>
        </div>
        {error && (
          <div className="absolute top-0 right-0 bg-red-600 rounded-3xl text-white p-2">
            {error}
          </div>
        )}
      </div>
    );
  }
}
