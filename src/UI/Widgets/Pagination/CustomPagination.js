import { MenuItem, Pagination, Select, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'

export const CustomPagination = (props) => {
    const { currentPage, perPage, totalPages, totalItems, onPerPageChange, onPageChange, disabled, perPageOptions } = props

    const itemsPerPageOptions = props.perPageOptions || [25, 50, 75, 100, 200]

    const handlePerPage = (value) => {
        if (itemsPerPageOptions.includes(value)) {
            return value
        } else {
            // get the closest value in the array
            return itemsPerPageOptions.reduce((prev, curr) => {
                return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
            })
        }
    }

    return (
        <Stack
            justifyContent="space-between"
            alignItems="center"
            sx={{
                position: "sticky",
                bottom: 0,
                bgcolor: 'background.default',
                flexDirection: 'row',
                paddingBlock: 1,
                marginTop: 'auto',
                px: 1,
            }}
        >
            <Stack
                gap={1}
                direction='row'
                alignItems='center'
            >
                <Typography variant='subtitle2'>
                    Items per page:
                </Typography>
                <Select
                    variant='standard'
                    disableUnderline
                    value={handlePerPage(props.perPage)}
                    onChange={(e) => onPerPageChange(e.target.value)}
                >
                    {
                        itemsPerPageOptions.map((value) => {
                            return (
                                <MenuItem key={value} value={value}>{value}</MenuItem>
                            )
                        })
                    }
                </Select>
            </Stack>

            <Pagination
                count={props.totalPages}
                page={props.currentPage}
                onChange={props.onPageChange}
                disabled={props.disabled}
            />

            <Typography variant="body2" color="textSecondary" component="div">
                {(currentPage - 1) * perPage + 1} - {Math.min(currentPage * perPage, totalItems)} of {totalItems}
            </Typography>
        </Stack>
    )
}
