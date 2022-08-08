import React, { useState, useEffect, useRef, ReactElement } from 'react';

import { Collapse, Stack, Box } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import lodash from 'lodash';

import { SearchableOptionSelected } from 'UI/Forms/Inputs/SearchableOptions';
import DateRangePicker from 'UI/Forms/Inputs/DateRangePicker';
import { Dropdown } from '../DropdownMui/Dropdown';
import { IPanelFilterOption, IPanelFilters, IPanelSelectedFilterOption } from 'Interfaces';

type PanelFiltersProps = {
	open: boolean;
	filters: IPanelFilters;
	selectedFilters?: Record<string, IPanelSelectedFilterOption[]>;
	onFilterChange: (filters: Record<string, IPanelSelectedFilterOption[]>) => void;
	setFilter?: { filterName: string, filter: any, option: IPanelFilterOption };
}

/**
 * Renders section containing the selected filters and colapse section with dropdown filters
 * @param {boolean} props.open controls the state of the panel expand/collapse 
 * @param {object} props.filters object with the filters options and labels
 * @param {function} props.onFilterChange callback function to be called when an option is selected from the dropdown returns the selected options object
 */
export const PanelFilters: React.FC<PanelFiltersProps> = (props) => {

	const firstRender = useRef(true);
	const [selectedFilters, setSelectedFilters] = useState(props.selectedFilters || {});

	useEffect(() => {
		if (lodash.isEqual(props.selectedFilters, selectedFilters) || !(props.selectedFilters instanceof Object)) return
		if (!props.selectedFilters && lodash.isEmpty(selectedFilters)) return

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
				handleOptionsChange(filterName, option);
			}
		}
	}, [props.setFilter]);

	const getItemLabel = (filterKey: string, option: IPanelFilterOption): string => {
		const filter = props.filters[filterKey];
		if (!filter.optionsLabel) return option['name']
		if (filter.optionsLabel instanceof Function) {
			return filter.optionsLabel(option)
		} else if (filter.optionsLabel in option) {
			return option[filter.optionsLabel]
		} else
			return option.label
	}

	const handleOptionsChange = (filterKey: string, option: IPanelFilterOption) => {

		const filter = props.filters[filterKey];
		const _selectedOption = { ...option, itemLabel: getItemLabel(filterKey, option), value: filter.optionsValue(option) };

		const _selectedFilters = Object.assign({}, selectedFilters)

		if (_selectedFilters[filterKey]) {
			if (filter.type === 'date' && _selectedOption.value.includes(null)) {
				delete _selectedFilters[filterKey]
			}
			else if (filter.isUnique) {
				_selectedFilters[filterKey] = [_selectedOption]
			} else {
				if (_selectedFilters[filterKey].find(f => f.itemLabel === _selectedOption.itemLabel)) {
					_selectedFilters[filterKey] = _selectedFilters[filterKey].filter(item => item.itemLabel !== _selectedOption.itemLabel)
				} else {
					_selectedFilters[filterKey].push(_selectedOption)
				}
			}
		} else {
			_selectedFilters[filterKey] = [_selectedOption]
		}

		if (_selectedFilters[filterKey] && _selectedFilters[filterKey].length === 0) {
			delete _selectedFilters[filterKey];
		}

		setSelectedFilters(_selectedFilters)
	}

	const onRemoveFilter = (filterKey: string, filter: IPanelSelectedFilterOption) => {


		setSelectedFilters(oldSelectFilters => {
			const newSelectFilters = { ...oldSelectFilters };
			newSelectFilters[filterKey] = newSelectFilters[filterKey].filter(item => item !== filter);

			if (newSelectFilters[filterKey].length === 0) {
				delete newSelectFilters[filterKey];
			}
			return newSelectFilters;
		})
	}

	return (
		<>
			<Stack direction='row' flexWrap='wrap' pb={1} >
				{Object.keys(selectedFilters).map(key =>
					selectedFilters[key].map((filter, index) => (
						<SearchableOptionSelected
							style={{ marginLeft: 0 }}
							key={index + key}
							item={`${key}: ${filter.itemLabel}`}
							disabled={filter.disabled}
							onRemove={() => onRemoveFilter(key, filter)}
						/>
					)))}
			</Stack>

			< Collapse in={props.open}>
				<Stack direction='row' gap={2} pb={2} flexWrap='wrap' alignItems='center' >
					{
						props.filters && Object.keys(props.filters).map(filterKey => {
							const filter = props.filters[filterKey];

							if (filter.type === 'hidden') return
							else if (filter.type === 'date')
								return (
									<DateRangePicker
										key={filterKey}
										label={filter.label}
										format={filter.dateFormat}
										disableFuture={filter.disableFuture}
										onChange={(date: string) => handleOptionsChange(filterKey, ({ id: date, value: date }))
										}
										endIcon={< KeyboardArrowDown />}
									/>
								)
							else
								return (
									<Dropdown
										key={filterKey}
										onClick={(option) => handleOptionsChange(filterKey, option)}
										getOptionLabel={(option) => getItemLabel(filterKey, option)}
										{...{ ...filter, type: undefined }}
									/>
								)
						})}
				</Stack>
			</Collapse>
		</>
	)
}
