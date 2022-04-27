import { useState, useEffect } from 'react';

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

	useEffect(() => {
		if (props.setFilter) {
			const { filterName, filter, option } = props.setFilter;
			if (filterName && filter && option) {
				handleFilterChange(filterName, filter, option);
			}
		}
	}, [props.setFilter]);

	const handleOptionsChange = (filterName, filter, option) => {
		console.log(filterName)
		console.log(option)

		let filters = Object.assign({}, selectedFilters)

		if (filters[filterName]) {
			if (filter.isUnique) {
				filters[filterName] = [option]
			} else {
				filters[filterName].push(option)
			}
		} else {
			filters[filterName] = [option]
		}

		console.log(filters)

		setSelectedFilters(filters)

		props.onFilterChange(filters)

		// return
		// setSelectedFilters(oldSelectFilters => {
		//   const newSelectFilters = { ...oldSelectFilters };
		//   newSelectFilters[filter.name] || (newSelectFilters[filter.name] = []);

		//   if (newSelectFilters[filter.name].includes(filter)) {
		//     newSelectFilters[filter.name] = newSelectFilters[filter.name].filter(item => item !== filter);
		//   } else {
		//     newSelectFilters[filter.name].push(filter);
		//   }

		//   if (filter.isUnique) {
		//     newSelectFilters[filter.name] = newSelectFilters[filter.name].slice(-1);
		//   }

		//   if (newSelectFilters[filter.name].length === 0) {
		//     delete newSelectFilters[filter.name];
		//   }

		//   if (filter.isUnique && newSelectFilters[filter.name]) {
		//     props.onFilterChange({ ...newSelectFilters, [filter.name]: newSelectFilters[filter.name][0] });
		//   } else {
		//     props.onFilterChange(newSelectFilters);
		//   }

		//   return newSelectFilters;
		// })
	}

	const onRemoveFilter = (filterName, filter) => {
		let filters = Object.assign({}, selectedFilters)


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

	const getContent = (filter, filterName) => {

		const getName = (option) => {
			if (filter.optionsLabel instanceof Function) {
				return filter.optionsLabel(option);
			} else if (filter.optionsLabel instanceof String) {
				return option[filter.optionsLabel];
			} else {
				return option.name;
			}
		}


		return (<Dropdown.List>
			{filter.options.map((option) => (
				<Dropdown.Item
					key={option.id}
					name={getName(option)}
					onClick={() => handleOptionsChange(filterName, filter, option)}
				/>
			))}
		</Dropdown.List>);
	}

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
									content={() => getContent(filter, filterName)}
								/>
							</Box>
						)
					})}
				</Stack>
			</Collapse>
		</>
	)
}
