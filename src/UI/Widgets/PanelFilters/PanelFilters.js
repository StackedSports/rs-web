import { useState, useEffect, useRef } from 'react';

import { Collapse, Stack, Box } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import lodash from 'lodash';

import { SearchableOptionSelected } from 'UI/Forms/Inputs/SearchableOptions';
import DateRangePicker from 'UI/Forms/Inputs/DateRangePicker';
import { Dropdown } from '../DropdownMui/Dropdown';

/**
 * Renders section containing the selected filters and colapse section with dropdown filters
 * @param {boolean} props.open controls the state of the panel expand/collapse 
 * @param {object} props.filters object with the filters options and labels isUnique
 * @param {function} props.onFilterChange callback function to be called when an option is selected from the dropdown returns the selected options object
 */
export const PanelFilters = (props) => {

	const firstRender = useRef(true);
	const [selectedFilters, setSelectedFilters] = useState(props.selectedFilters || {});

	useEffect(() => {
		//console.log("No changes detected");
		if (lodash.isEqual(props.selectedFilters, selectedFilters)) return
		if (!props.selectedFilters && selectedFilters === {}) return

		//console.log("external Change happens", props.selectedFilters)
		setSelectedFilters(props.selectedFilters || {})
	}, [props.selectedFilters])

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return
		}

		if (props.onFilterChange && props.onFilterChange instanceof Function) {
			props.onFilterChange(Object.assign({}, selectedFilters))
		}
	}, [selectedFilters])

	useEffect(() => {
		if (props.setFilter) {
			const { filterName, filter, option } = props.setFilter;
			if (filterName && filter && option) {
				handleOptionsChange(filterName, option, filter);
			}
		}
	}, [props.setFilter]);

	const getOptionLabel = (filter, option) => {

		if (filter.optionsLabel && filter.optionsLabel instanceof Function) {
			return filter.optionsLabel(option);
		} else if (filter.optionsLabel && (typeof filter.optionsLabel === 'string' || filter.optionsLabel instanceof String)) {
			return option[filter.optionsLabel];
		} else {
			return option.name;
		}
	}

	const handleOptionsChange = (filterName, option, filter) => {
		//console.log(filterName)
		//console.log(option)
		option = { ...option, itemLabel: getOptionLabel(filter, option) }
		let filters = Object.assign({}, selectedFilters)

		if (filters[filterName]) {
			if (filter.type === 'date' && option.includes(null)) {
				delete filters[filterName]
			}
			else if (filter.isUnique) {
				filters[filterName] = [option]
			} else {
				if (filters[filterName].find(f => f.id === option.id)) {
					filters[filterName] = filters[filterName].filter(item => item.id !== option.id)
				} else {
					filters[filterName].push(option)
				}
			}
		} else {
			filters[filterName] = [option]
		}

		if (filters[filterName] && filters[filterName].length === 0) {
			delete filters[filterName];
		}

		//console.log(filters)
		setSelectedFilters(filters)
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
	//console.log(props.filters)

	return (
		<>
			<Stack direction='row' flexWrap='wrap' pb={1}>
				{selectedFilters && Object.keys(selectedFilters).map(key =>
					selectedFilters[key].map((filter, index) => (
						<SearchableOptionSelected
							style={{ marginLeft: 0 }}
							key={index + key}
							item={`${props.filters[key].label}: ${filter.itemLabel || getOptionLabel(props.filters[key], filter)}`}
							disabled={filter.disabled}
							onRemove={(e) => onRemoveFilter(key, filter)}
						/>
					)))}
			</Stack>

			<Collapse in={props.open}>
				<Stack direction='row' gap={2} pb={2} flexWrap='wrap' alignItems='center'>
					{props.filters && Object.keys(props.filters).map(filterName => {
						const filter = props.filters[filterName];

						if (filter.type === 'hidden') return
						else if (filter.type === 'date')
							return (
								<DateRangePicker
									key={filterName}
									label={filter.label}
									format={filter.format}
									disableFuture={filter.disableFuture}
									onChange={(date) => handleOptionsChange(filterName, ({ startDate: date[0], endDate: date[1] }), filter)}
									endIcon={<KeyboardArrowDown />}
								/>
							)
						else
							return (
								<Dropdown
									key={filterName}
									onClick={(option) => handleOptionsChange(filterName, option, filter)}
									getOptionLabel={(option) => getOptionLabel(filter, option)}
									{...filter}
								/>
							)
					})}
				</Stack>
			</Collapse>
		</>
	)
}
