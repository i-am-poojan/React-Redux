import { Button } from '@/components/ui/button';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

const TodoFilter = ({ filterType, changeFilterType }) => {
  console.log('render todoFilter');
  return (
    <div className="flex w-full">
      <Button
        onClick={() => changeFilterType('all')}
        className="flex-1 rounded-none"
        variant={filterType === 'all' ? 'destructive' : 'default'}
      >
        All
      </Button>
      <Button
        onClick={() => changeFilterType('pending')}
        variant={filterType === 'pending' ? 'destructive' : 'default'}
        className="flex-1 rounded-none"
      >
        Pending
      </Button>
      <Button
        onClick={() => changeFilterType('completed')}
        variant={filterType === 'completed' ? 'destructive' : 'default'}
        className="flex-1 rounded-none"
      >
        Completed
      </Button>
    </div>
  );
};

TodoFilter.PropTypes = {
  filterType: PropTypes.oneOf(['all', 'pending', 'complated']).isRequired,
  changeFilterType: PropTypes.func.isRequired,
};
export default memo(TodoFilter);
