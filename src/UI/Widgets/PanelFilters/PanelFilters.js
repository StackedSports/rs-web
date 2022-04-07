import { useState } from 'react';

import { Collapse, Stack, Box } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
/* import { Dropdown, DropdownButton } from 'react-bootstrap'; */


import { SearchableOptionSelected } from 'UI/Forms/Inputs/SearchableOptions';
import Dropdown from 'UI/Widgets/Dropdown';
import Button from '../Buttons/Button';

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

    const onRemoveFilter = (filterName, filter) => {
        setSelectedFilters(oldSelectFilters => {
            const newSelectFilters = { ...oldSelectFilters };
            newSelectFilters[filterName] = newSelectFilters[filterName].filter(item => item !== filter);

            if (newSelectFilters[filterName].length === 0) {
                delete newSelectFilters[filterName];
            }

            onFilterChange(newSelectFilters);

            return newSelectFilters;
        })
    }

    const getContent = (options, filterName) => (
        <Dropdown.List>
            {options.map((option) => (
                <Dropdown.Item
                    key={option.id}
                    name={option.name}
                    onClick={() => handleOptionsChange(option, filterName)}
                />
            ))}
        </Dropdown.List>
    )

    const getHeader = (label) => (<Button name={label} variant='outlined' endIcon={<KeyboardArrowDown />} />)

    return (
        <>
            <Stack direction='row' flexWrap='wrap' pb={1}>
                {selectedFilters && Object.keys(selectedFilters).map(key =>
                    selectedFilters[key].map((filter, index) => (
                        <SearchableOptionSelected
                          style={{marginLeft: 0}}
                          key={filter.id}
                          item={`${filters[key].label}: ${filter.name}`}
                          onRemove={(e) => onRemoveFilter(key, filter)}
                        />
                    )))}
            </Stack>

            <Collapse in={open}>
                <Stack direction='row' gap={2} pb={2} flexWrap='wrap'>
                    {filters && Object.keys(filters).map(filterName => {
                        const filter = filters[filterName];
                        return (
                            <Box key={filterName}>
                                <Dropdown
                                    header={() => getHeader(filter.label)}
                                    content={() => getContent(filter.options, filterName)}
                                />
                            </Box>
                        )
                    })}
                </Stack>
            </Collapse>
        </>
    )
}
