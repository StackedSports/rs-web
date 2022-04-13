import { useState } from 'react';

import { Collapse, Stack, Box } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
/* import { Dropdown, DropdownButton } from 'react-bootstrap'; */


import { SearchableOptionSelected } from 'UI/Forms/Inputs/SearchableOptions';
import Dropdown from 'UI/Widgets/Dropdown';
import Button from '../Buttons/Button';

/**
 * Renders section containing the selected filters and colapse section with dropdown filters
 * @param {boolean} props.open controls the state of the panel expand/collapse 
 * @param {object} props.filters object with the filters options and labels isUnique
 * @param {function} props.onFilterChange callback function to be called when an option is selected from the dropdown returns the selected options object
 */
export const PanelFilters = (props) => {

  const [selectedFilters, setSelectedFilters] = useState({});
  
  const handleOptionsChange = (filter, filterName, isUnique) => {

    setSelectedFilters(oldSelectFilters => {
      const newSelectFilters = { ...oldSelectFilters };
      newSelectFilters[filterName] || (newSelectFilters[filterName] = []);

      if (newSelectFilters[filterName].includes(filter)) {
        newSelectFilters[filterName] = newSelectFilters[filterName].filter(item => item !== filter);
      } else {
        newSelectFilters[filterName].push(filter);
      }

      if (isUnique) {
        newSelectFilters[filterName] = newSelectFilters[filterName].slice(-1);
      }

      if (newSelectFilters[filterName].length === 0) {
        delete newSelectFilters[filterName];
      }

      if (isUnique && newSelectFilters[filterName]) {
        props.onFilterChange({ ...newSelectFilters, [filterName]: newSelectFilters[filterName][0] });
      } else {
        props.onFilterChange(newSelectFilters);
      }

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

      props.onFilterChange(newSelectFilters);

      return newSelectFilters;
    })
  }

  const getContent = (options, filterName, isUnique) => (
    <Dropdown.List>
      {options.map((option) => (
        <Dropdown.Item
          key={option.id}
          name={option.name}
          onClick={() => handleOptionsChange(option, filterName, isUnique)}
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
              style={{ marginLeft: 0 }}
              key={filter.id}
              item={`${props.filters[key].label}: ${filter.name}`}
              onRemove={(e) => onRemoveFilter(key, filter)}
            />
          )))}
      </Stack>

      <Collapse in={props.open}>
        <Stack direction='row' gap={2} pb={2} flexWrap='wrap'>
          {props.filters && Object.keys(props.filters).map(filterName => {
            const filter = props.filters[filterName];
            return (
              <Box key={filterName}>
                <Dropdown
                  header={() => getHeader(filter.label)}
                  content={() => getContent(filter.options, filterName, filter.isUnique)}
                />
              </Box>
            )
          })}
        </Stack>
      </Collapse>
    </>
  )
}
