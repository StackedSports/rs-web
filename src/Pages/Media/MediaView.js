import { useState, useRef, useEffect, useMemo } from 'react'
import { Stack, Typography, Box, CircularProgress } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { KeyboardArrowDown } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import Button from 'UI/Widgets/Buttons/Button'
import MediaPreview from 'UI/Widgets/Media/MediaPreview'
import DataTable from 'UI/Tables/DataTable'
import { mediaRoutes } from 'Routes/Routes';
import { format } from 'date-fns';





/**
 * 
 * @param {object[]} items array of objects to display
 * @param {string} items.id unique identifier for the item
 * @param {string} items.name name of the item
 * @param {string} items.type type of the item
 * @returns 
 */
export const MediaView = ({ items, isLoading = false, isGrid, title, type = 'media', showAll = false }) => {

    const boxRef = useRef();
    const [sort, setSort] = useState('createdAt');
    const [selectedItems, setSelectedItems] = useState([]);
    const [ItemsLimit, setItemsLimit] = useState(10);

    const observer = useRef(
        new ResizeObserver(entries => {
            entries.forEach(entry => {
                if (showAll)
                    setItemsLimit(items?.length)
                else
                    setItemsLimit(Math.floor(entry.contentRect.width / 250));
            })
        })
    );

    useEffect(() => {
        if (boxRef.current) {
            observer.current.observe(boxRef.current)
        }
        return () => {
            observer.current.disconnect()
        }
    }, [boxRef, observer])


    const columnsMedias = [
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
        },
        {
            field: 'urls',
            headerName: 'File',
            width: 60,
            renderCell: (params) => <img height={'50px'} width='50px' style={{ objectFit: 'contain' }} src={params.value?.original} />,
            align: 'center',
        },
        {
            field: 'owner',
            headerName: 'Owner',
            width: 160,
            valueGetter: (params) =>
                `${params.value.first_name || ''} ${params.value?.last_name || ''}`,
        },
        {
            field: 'updated_at',
            headerName: 'Last Modified',
            valueGetter: (params) => format(new Date(params.value), 'MM/dd/yyyy'),
            flex: 1,
        },
    ];

    const columnsPlaceHolders = [
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
        },
        {
            field: 'updated_at',
            headerName: 'Last Modified',
            valueGetter: (params) => format(new Date(params.value), 'MM/dd/yyyy'),
            flex: 1,
        },
    ];

    return (
        <Box width='100%' pb={2} ref={boxRef}>

            {
                isLoading ? (
                    <Box
                        height='500px'
                        sx={{ display: 'grid', placeItems: 'center' }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box >
                        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={1}>
                            <Typography variant='subtitle1' color='text.secondary'>
                                {title}
                            </Typography>
                            <Box>
                                <Button
                                    component={Link}
                                    to={mediaRoutes.media}
                                    name='View More'
                                    variant='text'
                                />
                            </Box>
                        </Stack>
                        {
                            isGrid ? (
                                <Stack gap={2} direction='row' flexWrap='wrap' >
                                    {
                                        (items?.slice(0, ItemsLimit)).map(item => (
                                            <MediaPreview
                                                key={item.id}
                                                type={type}
                                                media={item}
                                            />
                                        ))
                                    }
                                </Stack>
                            ) : type === 'placeholder' ?
                                (
                                    <DataTable
                                        items={items?.slice(0, ItemsLimit)}
                                        columns={columnsPlaceHolders}
                                        checkboxSelection
                                        hidePagination={!showAll}
                                    />
                                )
                                :
                                (
                                    <DataTable
                                        items={items?.slice(0, ItemsLimit)}
                                        columns={columnsMedias}
                                        checkboxSelection
                                        hidePagination={!showAll}
                                    />
                                )
                        }
                    </Box>
                )
            }

        </Box>
    )

}
