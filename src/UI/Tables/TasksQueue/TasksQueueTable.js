import React from 'react'

import { DataGridPro } from '@mui/x-data-grid-pro';
import { columns } from './TasksQueueTableConfig';

export const TasksQueueTable = (props) => {

  return (
    <DataGridPro
        {...props}
        columns={columns}
        hideFooter
    />
  )
}

export default TasksQueueTable
