import React, { useState, useEffect, useRef } from 'react';

import { Collapse, Stack, Box } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import lodash from 'lodash';

import { SearchableOptionSelected } from 'UI/Forms/Inputs/SearchableOptions';
import DateRangePicker from 'UI/Forms/Inputs/DateRangePicker';
import { Dropdown } from '../DropdownMui/Dropdown';
import { IFilterOption } from 'Interfaces';

interface IFilterBase {
	label: string;
	isUnique?: boolean;
}

interface IFilterTypeDate extends IFilterBase {
	type: 'date';
	optionsLabel: (option: unknown[]) => string;
	format?: string;
	disableFuture?: boolean;
}

interface IFilterTypeHidden extends IFilterBase {
	type: 'hidden';
}


interface IFilterTypeDropdown extends IFilterBase {
	type?: 'dropdown';
	options: IOption[];
	onSearch?: (text: string) => void;
	optionsLabel?: ((option: any) => string);
}

interface IOption extends IFilterOption<unknown> {
	name?: string;
	id?: string
}

type IFilter = IFilterTypeDropdown | IFilterTypeDate | IFilterTypeHidden
export type IPanelFilters = Record<string, IFilter>
export type ISelectedFilters = Record<string, (IOption & { disabled?: boolean })[]>

export interface IPanelFilterProps {
	open?: boolean;
	filters?: IPanelFilters;
	selectedFilters?: ISelectedFilters;
	onFilterChange?: (selectedFilters: ISelectedFilters) => void;
	setFilter?: (selectedFilters: ISelectedFilters) => void;
}

/**
 * Renders section containing the selected filters and colapse section with dropdown filters
 * @param {boolean} props.open controls the state of the panel expand/collapse 
 * @param {object} props.filters object with the filters options and labels isUnique
 * @param {function} props.onFilterChange callback function to be called when an option is selected from the dropdown returns the selected options object
 */
export const PanelFilters = (props: IPanelFilterProps): JSX.Element => {

	const firstRender = useRef(true);
	const [selectedFilters, setSelectedFilters] = useState(props.selectedFilters || {});

	useEffect(() => {
		if (lodash.isEqual(props.selectedFilters, selectedFilters)) return
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

	/* 	useEffect(() => {
			if (props.setFilter) {
				const { filterName, filter, option } = props.setFilter;
				if (filterName && filter && option) {
					handleOptionsChange(filterName, option, filter);
				}
			}
		}, [props.setFilter]); */

	const getOptionLabel = (filter: IFilter, option: IOption & { label?: string }): string => {
		const value = option.value
		let label = ''
		switch (filter.type) {
			case "date":
				if (value instanceof Array)
					label = filter.optionsLabel(value)
				else
					throw new Error("Expected array")
				break
			case "hidden":
				break
			default:
				if (filter.optionsLabel instanceof Function)
					label = filter.optionsLabel(option)
				else if ('label' in option)
					label = option.label
				else if ('name' in option)
					label = option.name
		}
		return label
	}

	const handleOptionsChange = (filterName: string, option: IOption, filter: IFilter) => {
		// console.log(filterName)
		// console.log(option)
		option = { ...option, label: getOptionLabel(filter, option) }
		let filters = Object.assign({}, selectedFilters)

		if (filters[filterName]) {
			if (filter.type === 'date' && option.value instanceof Array && option.value.includes(null)) {
				delete filters[filterName]
			}
			else if (filter.isUnique) {
				filters[filterName] = [option]
			} else {
				if (filters[filterName].find(f => f.label === option.label)) {
					filters[filterName] = filters[filterName].filter(item => item.label !== option.label)
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

		setSelectedFilters(filters)
	}

	const onRemoveFilter = (filterName: string, option: IOption) => {

		setSelectedFilters(oldSelectFilters => {
			const newSelectFilters = { ...oldSelectFilters };
			newSelectFilters[filterName] = newSelectFilters[filterName].filter(item => item.label !== option.label);

			if (newSelectFilters[filterName].length === 0) {
				delete newSelectFilters[filterName];
			}
			return newSelectFilters;
		})
	}

	return (
		<>
			<Stack id="selected-filters-stack" direction='row' flexWrap='wrap' pb={1}>
				{props.filters && selectedFilters && Object.keys(selectedFilters).map(key =>
					selectedFilters[key].map((filter, index) => {
						// console.log(props.filters[key])
						// console.log(filter)
						// getOptionLabel(props.filters[key], filter)
						if (props?.filters?.[key].label)
							return (
								<SearchableOptionSelected
									style={{ marginLeft: 0 }}
									key={index + key}
									item={`${props.filters[key].label}: ${filter.label || getOptionLabel(props.filters[key], filter)}`}
									disabled={filter.disabled}
									onRemove={() => onRemoveFilter(key, filter)}
								/>
							)
					}))}
			</Stack>

			<Collapse in={props.open}>
				<Stack direction='row' gap={2} pb={2} flexWrap='wrap' alignItems='center'>
					{props.filters && Object.keys(props.filters).map(filterName => {
						const filter = props.filters?.[filterName];
						if (!filter) return

						if (filter.type === 'hidden') return
						else if (filter.type === 'date')
							return (
								<DateRangePicker
									key={filterName}
									label={filter.label}
									format={filter.format}
									disableFuture={filter.disableFuture}
									onChange={(date) => handleOptionsChange(filterName, ({ label: filter.optionsLabel(date), value: date }), filter)}
									endIcon={<KeyboardArrowDown />}
								/>
							)
						else
							return (
								<Dropdown
									key={filterName}
									onClick={(option) => handleOptionsChange(filterName, option, filter)}
									getOptionLabel={(option) => getOptionLabel(filter, option)}
									selectionModel={selectedFilters[filterName]}
									checkboxSelection
									showSearchInput
									{...filter}
								/>
							)
					})}
				</Stack>
			</Collapse>
		</>
	)
}
