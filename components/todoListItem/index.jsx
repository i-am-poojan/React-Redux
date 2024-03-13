import React, { memo } from 'react';
import { Checkbox } from '../ui/checkbox';
import PropTypes from 'prop-types';
import ConfirmDelete from '../confirmDelete';
import { Button } from '../ui/button';

function TodoListItem({ x, deleteTodo, toggleTodo }) {
  console.log('todo list item render');
  return (
    <div key={x.id} className="flex items-center">
      <Checkbox
        type="checkbox"
        checked={x.isDone}
        onCheckedChange={() => toggleTodo(x)}
      />
      <p className="flex-1 px-5">{x.text}</p>
      <ConfirmDelete onClick={() => deleteTodo(x)} />
    </div>
  );
}

TodoListItem.propTypes = {
  // Correct prop types declaration
  x: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    isDone: PropTypes.bool,
  }).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default memo(TodoListItem);
