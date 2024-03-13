import { Button } from '@/components/ui/button';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

function TodoFilter({ filterType, changeFilter }) {
  console.log('todoFilter render');
  return (
    <div className="flex w-full">
      <Button
        className="flex-1 rounded-none"
        variant={filterType === 'all' ? 'destructive' : 'default'}
        onClick={() => changeFilter('all')}
      >
        All
      </Button>
      <Button
        className="flex-1 rounded-none"
        variant={filterType === 'pending' ? 'destructive' : 'default'}
        onClick={() => changeFilter('pending')}
      >
        Pending
      </Button>
      <Button
        className="flex-1 rounded-none"
        variant={filterType === 'completed' ? 'destructive' : 'default'}
        onClick={() => changeFilter('completed')}
      >
        Completed
      </Button>
    </div>
  );
}

TodoFilter.propTypes = {
  filterType: PropTypes.oneOf(['all', 'pending', 'completed']).isRequired,
  changeFilter: PropTypes.func.isRequired,
};

export default memo(TodoFilter);
