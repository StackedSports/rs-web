 // @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';

import { Collapse, Stack } from '@mui/material';
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

type IOption = ({ id: string | number } & ({ label: string } | { name: string })) | ({ value: unknown } & ({ label: string } | { name: string }))
type ISelectedOption = IFilterOption<unknown> & { disabled?: boolean }

type IFilter = IFilterTypeDropdown | IFilterTypeDate | IFilterTypeHidden
export type IPanelFilters = Record<string, IFilter>
export type ISelectedFilters = Record<string, ISelectedOption[]>

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

	const getOptionLabel = (filter: IFilter, option: IOption): string => {
		const value = 'id' in option ? option.id : option.value
		let label = 'name' in option ? option.name : option.label

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
		}
		return label
	}

	const handleOptionsChange = (filterName: string, option: IOption) => {
		const value = 'value' in option ? option.value : option.id
		const filter = props.filters?.[filterName]

		if (!filter) return

		const selectedOption: IFilterOption<unknown> = { ...option, label: getOptionLabel(filter, option), value: value }
		let filters = Object.assign({}, selectedFilters)

		if (filters[filterName]) {
			if (filter.type === 'date' && selectedOption.value instanceof Array && selectedOption.value.includes(null)) {
				delete filters[filterName]
			}
			else if (filter.isUnique) {
				filters[filterName] = [selectedOption]
			} else {
				if (filters[filterName].find(f => f.label === selectedOption.label)) {
					filters[filterName] = filters[filterName].filter(item => item.label !== selectedOption.label)
				} else {
					filters[filterName].push(selectedOption)
				}
			}
		} else {
			filters[filterName] = [selectedOption]
		}

		if (filters[filterName] && filters[filterName].length === 0) {
			delete filters[filterName];
		}

		setSelectedFilters(filters)
	}

	const onRemoveFilter = (filterName: string, selectedOption: ISelectedOption) => {

		setSelectedFilters(oldSelectFilters => {
			const newSelectFilters = { ...oldSelectFilters };
			newSelectFilters[filterName] = newSelectFilters[filterName].filter(item => item.label !== selectedOption.label);

			if (newSelectFilters[filterName].length === 0) {
				delete newSelectFilters[filterName];
			}
			return newSelectFilters;
		})
	}

	return (
		<>
			<Stack id="selected-filters-stack" direction='row' flexWrap='wrap' pb={1}>
				{props.filters && selectedFilters && Object.keys(selectedFilters).map(filterName =>
					selectedFilters[filterName].map((selectedOption, index) => {
						if (props.filters?.[filterName].label)
							return (
								<SearchableOptionSelected
									style={{ marginLeft: 0 }}
									key={index + filterName}
									item={`${props.filters[filterName].label}: ${selectedOption.label}`}
									disabled={selectedOption.disabled}
									onRemove={() => onRemoveFilter(filterName, selectedOption)}
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
									onChange={(date: [string, string]) => handleOptionsChange(filterName, ({ label: filter.optionsLabel(date), value: date }))}
									endIcon={<KeyboardArrowDown />}
								/>
							)
						else
							return (
								<Dropdown
									key={filterName}
									onClick={(option: IOption) => handleOptionsChange(filterName, option)}
									getOptionLabel={(option: IOption) => getOptionLabel(filter, option)}
									selectionModel={selectedFilters[filterName]}
									checkboxSelection
									showSearchInput
									options={filter.options}
									label={filter.label}
								/>
							)
					})}
				</Stack>
			</Collapse>
		</>
	)
}
