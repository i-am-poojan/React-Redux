// import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import TodoListItem from '../todoListItem';

// const TodoList = ({ todoList, filterType, toggleComplete, DeleteTodo }) => {
//   console.log('render todoList');
//   return (
//     <div className="flex flex-col gap-6 w-full p-6 flex-1">
//       {todoList
//         // .filter(x => {
//         //   switch (filterType) {
//         //     case 'pending':
//         //       return x.isDone === false;
//         //     case 'complated':
//         //       return x.isDone === true;
//         //     default:
//         //       return true;
//         //   }
//         // })
//         .map(x => {
//           if (
//             filterType === 'all' ||
//             (filterType === 'pending' && x.isDone === false) ||
//             (filterType === 'completed' && x.isDone === true)
//           ) {
//             return (
//               <TodoListItem
//                 key={x.id}
//                 x={x}
//                 DeleteTodo={DeleteTodo}
//                 toggleComplete={toggleComplete}
//               />
//             );
//           }
//         })}
//     </div>
//   );
// };

// TodoList.PropTypes = {
//   filterType: PropTypes.oneOf(['all', 'completed', 'pending']).isRequired,
//   toggleComplete: PropTypes.func.isRequired,
//   DeleteTodo: PropTypes.func.isRequired,
//   x: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     isDone: PropTypes.bool.isRequired,
//     text: PropTypes.string.isRequired,
//   }).isRequired,
// };
// export default memo(TodoList);
