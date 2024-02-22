import React, { Component, createRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

export default class Home extends Component {
  state = {
    todoList: [],
    todoText: '',
  };

  changeText = event => {
    this.setState({ todoText: event.target.value });
  };

  addTodo = event => {
    event.preventDefault();
    this.setState(({ todoText, todoList }) => {
      return {
        todoList: [
          ...todoList,
          { id: new Date().valueOf(), text: todoText, isDone: false },
        ],
        todoText: '',
      };
    });
  };

  toggleComplate = item => {
    this.setState(({ todoList }, props) => {
      const index = todoList.findIndex(x => x.id === item.id);
      return {
        todoList: [
          ...todoList.slice(0, index),
          { ...item, isDone: !item.isDone },
          ...todoList.slice(index + 1),
        ],
      };
    });
  };

  deleteTodo = item => {
    this.setState(({ todoList }, props) => {
      const index = todoList.findIndex(x => x.id === item.id);
      return {
        todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
      };
    });
  };
  render() {
    const { todoText, todoList } = this.state;
    return (
      <div className="flex flex-col items-center gap-4 m-4 min-h-[95vh]">
        <h1>Todo App </h1>
        <form
          onSubmit={this.addTodo}
          className="flex max-w-sm w-full items-center"
        >
          <Input
            className="rounded-r-none"
            value={todoText}
            onChange={this.changeText}
          />
          <Button type="sumbit" className="rounded-l-none">
            Button
          </Button>
        </form>
        <div className=" gap-4 flex flex-col w-full flex-1">
          {todoList.map(item => {
            return (
              <div key={item.id} className="flex items-center">
                <Checkbox
                  type="checkbox"
                  checked={item.isDone}
                  onCheckedChange={() => this.toggleComplate(item)}
                />
                <p className="flex-1 px-4">{item.text}</p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Delete</Button>
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
                      <AlertDialogAction onClick={() => this.deleteTodo(item)}>
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            );
          })}
        </div>
        <div className="flex w-full ">
          <Button className="flex-1 rounded-none " variant="destructive">
            All
          </Button>
          <Button className="flex-1 rounded-none">Pending</Button>
          <Button className="flex-1 rounded-none">Complated</Button>
        </div>
      </div>
    );
  }
}
