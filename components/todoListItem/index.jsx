import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import ConfirmDelete from '../confirmDelete';

const TodoListItem = ({ x, toggleComplete, DeleteTodo }) => {
  console.log('todoListitem');
  return (
    <div key={x.id} className="flex items-center">
      <Checkbox checked={x.isDone} onCheckedChange={() => toggleComplete(x)} />
      <p className="flex-1 px-4">{x.text}</p>
      {/* <Button type="button" onClick={() => DeleteTodo(x)}>
        Delete
      </Button> */}
      <ConfirmDelete onClick={() => DeleteTodo(x)} />
    </div>
  );
};

TodoListItem.PropTypes = {
  x: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isDone: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  DeleteTodo: PropTypes.func.isRequired,
};

export default memo(TodoListItem);
