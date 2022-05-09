

import { DataGridPro } from '@mui/x-data-grid-pro';
import { columns } from './TasksQueueTableConfig';

export const TasksQueueTable = (props) => {

  const handleOnRowsScrollEnd = (params) => {
    if (!props.apiPagination) return;
    if (props.apiPagination.currentPage < props.apiPagination.totalPages && !props.loading) {
      console.log("fetching next page");
      props.apiPagination.getPage(props.apiPagination.currentPage + 1);
    }
  };

  return (
    <DataGridPro
      {...props}
      columns={columns}
      hideFooter
      onRowsScrollEnd={handleOnRowsScrollEnd}
    />
  )
}

export default TasksQueueTable
