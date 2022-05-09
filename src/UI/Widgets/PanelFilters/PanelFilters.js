import { useState, useEffect, useRef } from 'react';

import { Collapse, Stack, Box } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import lodash from 'lodash';

import { SearchableOptionSelected } from 'UI/Forms/Inputs/SearchableOptions';
import Dropdown from 'UI/Widgets/Dropdown';
import Button from '../Buttons/Button';
import DateRangePicker from 'UI/Forms/Inputs/DateRangePicker';

/**
 * Renders section containing the selected filters and colapse section with dropdown filters
 * @param {boolean} props.open controls the state of the panel expand/collapse 
 * @param {object} props.filters object with the filters options and labels isUnique
 * @param {function} props.onFilterChange callback function to be called when an option is selected from the dropdown returns the selected options object
 */
export const PanelFilters = (props) => {

	const externalChange = useRef(false);
	const firstRender = useRef(true);
	const [selectedFilters, setSelectedFilters] = useState(props.selectedFilters || {});

	useEffect(() => {
		if (!props.selectedFilters)
			return
		console.log("external Change", props.selectedFilters)
		externalChange.current = true;
		setSelectedFilters(props.selectedFilters)

	}, [props.selectedFilters])

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return
		}

		if (externalChange.current) {
			externalChange.current = false;
			return
		}
		console.log("Calling onFilterChange")
		if (props.onFilterChange && props.onFilterChange instanceof Function)
			props.onFilterChange(Object.assign({}, selectedFilters))
	}, [selectedFilters])

	useEffect(() => {
		if (props.setFilter) {
			console.log(props.setFilter);
			const { filterName, filter, option } = props.setFilter;
			if (filterName && filter && option) {
				handleOptionsChange(filterName, option, filter);
			}
		}
	}, [props.setFilter]);

	const handleOptionsChange = (filterName, option, filter) => {
		console.log(filterName)
		console.log(option)

		let filters = Object.assign({}, selectedFilters)

		if (filters[filterName]) {
			if (filter.isUnique) {
				filters[filterName] = [option]
			} else {
				if (filters[filterName].find(f => f.id === option.id)) {
					filters[filterName] = filters[filterName].filter(item => item !== option)
				} else {
					filters[filterName].push(option)
				}
			}
		} else {
			filters[filterName] = [option]
		}

		console.log(filters)

		setSelectedFilters(filters)

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

		setSelectedFilters(oldSelectFilters => {
			const newSelectFilters = { ...oldSelectFilters };
			newSelectFilters[filterName] = newSelectFilters[filterName].filter(item => item !== filter);

			if (newSelectFilters[filterName].length === 0) {
				delete newSelectFilters[filterName];
			}

			return newSelectFilters;
		})
	}


	const getOptionLabel = (filter, option) => {

		if (filter.optionsLabel && filter.optionsLabel instanceof Function) {
			return filter.optionsLabel(option);
		} else if (filter.optionsLabel && filter.optionsLabel instanceof String) {
			console.log(filter.optionsLabel)
			return option[filter.optionsLabel];
		} else {
			return option.name;
		}
	}

	const getContent = (filter, filterName) => {

		return (<Dropdown.List>
			{filter.options.map((option) => (
				<Dropdown.Item
					key={option.id}
					name={getOptionLabel(filter, option)}
					onClick={() => handleOptionsChange(filterName, option, filter)}
				/>
			))}
		</Dropdown.List>);
	};

	return (
		<>
			<Stack direction='row' flexWrap='wrap' pb={1}>
				{selectedFilters && Object.keys(selectedFilters).map(key =>
					selectedFilters[key].map((filter, index) => (
						<SearchableOptionSelected
							style={{ marginLeft: 0 }}
							key={index + key}
							item={`${props.filters[key].label}: ${getOptionLabel(props.filters[key], filter)}`}
							disabled={filter.disabled}
							onRemove={(e) => onRemoveFilter(key, filter)}
						/>
					)))}
			</Stack>

			<Collapse in={props.open}>
				<Stack direction='row' gap={2} pb={2} flexWrap='wrap' alignItems='center'>
					{props.filters && Object.keys(props.filters).map(filterName => {
						const filter = props.filters[filterName];
						if (filter.type === 'date')
							return (
								<DateRangePicker
									label={filter.label}
									format={filter.format}
									onChange={(date) => handleOptionsChange(filterName, date, filter)}
									endIcon={<KeyboardArrowDown />}
								/>
							)
						else
							return (
								<Box key={filterName}>
									<Dropdown
										header={() => <Button name={filter.label} variant='outlined' endIcon={<KeyboardArrowDown />} />}
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
