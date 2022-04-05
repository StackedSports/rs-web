import { useState } from 'react';

import { Collapse, Stack, Box, Typography } from '@mui/material';
import { DropDown } from './Dropdown';

import { SearchableOptionSelected } from 'UI/Forms/Inputs/SearchableOptions';

/**
 * Renders section containing the selected filters and colapse section with dropdown filters
 * @param {boolean} open controls the state of the panel expand/collapse 
 * @param {object} filters object with the filters options and labels
 * @param {function} onOptionSelected callback function to be called when an option is selected from the dropdown returns the selected options object
 */
export const PanelFilters = ({ open, filters, onFilterChange }) => {

    const [selectedFilters, setSelectedFilters] = useState({});

    const handleOptionsChange = (filter, filterName) => {

        setSelectedFilters(oldSelectFilters => {
            const newSelectFilters = { ...oldSelectFilters };
            newSelectFilters[filterName] || (newSelectFilters[filterName] = []);
            if (newSelectFilters[filterName].includes(filter)) {
                newSelectFilters[filterName] = newSelectFilters[filterName].filter(item => item !== filter);
            } else {
                newSelectFilters[filterName].push(filter);
            }

            if (newSelectFilters[filterName].length === 0) {
                delete newSelectFilters[filterName];
            }

            onFilterChange(newSelectFilters);
            return newSelectFilters;
        })
    }


    return (
        <>

            <Stack direction='row' spacing={2} py={1}>
                <>

                </>
            </Stack>

            <Collapse in={open}>
                <Stack direction='row' spacing={2} py={2}>
                    {
                        Object.keys(filters).map(filterName => {
                            const filter = filters[filterName];
                            return (
                                <Box key={filterName}>
                                    <DropDown
                                        label={filter.label}
                                        options={filter.options}
                                        onOptionSelected={(option) => handleOptionsChange(option, filterName)}
                                    />
                                </Box>
                            )
                        })
                    }
                </Stack>
            </Collapse>
        </>
    )
}
