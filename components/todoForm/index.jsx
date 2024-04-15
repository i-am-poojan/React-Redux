import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const TodoForm = ({ addTodo }, ref) => {
  console.log('Todoform render');
  return (
    <div>
      <form onSubmit={addTodo} className="flex w-full max-w-sm items-center">
        <Input className="rounded-r-none" ref={ref} required />
        <Button type="submit" className="rounded-l-none">
          Button
        </Button>
      </form>
    </div>
  );
};

TodoForm.PropTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default memo(forwardRef(TodoForm));
