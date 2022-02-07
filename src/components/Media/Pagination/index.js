import React from "react";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationOutlined(props) {

    const [page, setPage] = React.useState(1);


    return (
        <Stack spacing={2}>
            <Pagination onChange={(e,value)=>{
                props.onPaginationChange(value);
                setPage(value);
                e.stopPropagation()
            }}
                        page={page}
                        count={53}  siblingCount={0} color="primary" />
        </Stack>
    );
}
