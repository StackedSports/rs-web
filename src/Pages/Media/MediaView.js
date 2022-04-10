import { useState, useRef, useEffect, useMemo } from 'react'
import { Stack, Typography, Box, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom';


import Button from 'UI/Widgets/Buttons/Button'
import MediaPreview from 'UI/Widgets/Media/MediaPreview'
import DataTable from 'UI/Tables/DataTable'

import { mediaRoutes } from 'Routes/Routes';

import { columnsMedias, columnsPlaceHolders } from './MediaViewTableConfig'

/**
 * 
 * @param {object[]} items array of objects to display
 * @param {string} items.id unique identifier for the item
 * @param {string} items.name name of the item
 * @param {string} items.type type of the item
 * @returns 
 */
export const MediaView = ({ items, isLoading = false, isGrid, title, type = 'media', disablePagination = false }) => {
    const columns = useMemo(() => type === 'media' ? columnsMedias : columnsPlaceHolders, [type])

    const boxRef = useRef();
    const [sort, setSort] = useState('createdAt');
    const [selectedItems, setSelectedItems] = useState([]);
    const [ItemsLimit, setItemsLimit] = useState(10);

    // const observer = useRef(
    //     new ResizeObserver(entries => {
    //         entries.forEach(entry => {
    //             if (showAll)
    //                 setItemsLimit(items?.length)
    //             else
    //                 setItemsLimit(Math.floor(entry.contentRect.width / 250));
    //         })
    //     })
    // );

    // useEffect(() => {
    //     if (boxRef.current) {
    //         observer.current.observe(boxRef.current)
    //     }
    //     return () => {
    //         observer.current.disconnect()
    //     }
    // }, [boxRef, observer])


    

    return (
        <Box width='100%' pb={2} ref={boxRef}>
            <Box >
                <Stack direction='row' alignItems='center' justifyContent='space-between' mb={1}>
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
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
                {isLoading && (
                    <Box
                        height='300px'
                        sx={{ display: 'grid', placeItems: 'center' }}
                    >
                        <CircularProgress />
                    </Box>
                )}
                {!isLoading && (isGrid ? (
                    <Stack gap={2} direction='row' flexWrap='wrap' >
                        {items && items.map(item => (
                            <MediaPreview
                                key={item.id}
                                type={type}
                                media={item}
                            />
                        ))}
                    </Stack>
                ) : (
                    <DataTable
                        items={items}
                        columns={columns}
                        checkboxSelection
                        hidePagination={disablePagination}
                    />
                ))}
            </Box>

        </Box>
    )

}
