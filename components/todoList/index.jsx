import PropTypes from 'prop-types';
import React, { memo } from 'react';
import TodoListItem from '../todoListItem';

function TodoList({ todoList, filterType, toggleTodo, deleteTodo,  }) {
  console.log('render todoList');
  return (
    <div className="flex flex-col gap-6 w-full p-6 flex-1">
      {todoList.map(x => {
        if (
          filterType === 'all' ||
          (filterType === 'pending' && x.isDone === false) ||
          (filterType === 'completed' && x.isDone === true)
        ) {
          return (
            <TodoListItem
              x={x}
              key={x.id}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isDone: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  filterType: PropTypes.oneOf(['all', 'pending', 'completed']).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default memo(TodoList);
