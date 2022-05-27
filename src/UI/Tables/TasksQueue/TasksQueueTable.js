import { Link } from 'react-router-dom';
import { DataGridPro, GridRow } from '@mui/x-data-grid-pro';
import { columns } from './TasksQueueTableConfig';
import { messageRoutes } from 'Routes/Routes';

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
    //components={{
    //  Row: props => <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`${messageRoutes.details}/${props.rowId}`} ><GridRow {...props} /></Link>
    //}}
    />
  )
}

export default TasksQueueTable
