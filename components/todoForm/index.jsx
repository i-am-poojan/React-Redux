import PropTypes from 'prop-types';
import React, { forwardRef, memo } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

function TodoForm({ addTodo }, ref) {
  console.log('render addTodo');
  return (
    <div>
      <form onSubmit={addTodo} className="flex w-full max-w-sm items-center">
        <Input
          type="text"
          className="rounded-r-none"
          ref={ref}
          // value={todoText}
          // onChange={this.changeText}
        />
        <Button type="submit" className="rounded-l-none">
          Button
        </Button>
      </form>
    </div>
  );
}
TodoForm.PropTypes = {
  addTodo: PropTypes.func.isRequired,
};
export default memo(forwardRef(TodoForm));
