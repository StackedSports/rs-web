import './SearchBar.css'
import { useState, useRef, useEffect } from 'react'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearIcon from '@mui/icons-material/Clear';

import { debounce } from '@mui/material';
import { StyledBox, StyledSearchIcon, StyledTextInput, StyledClearIcon } from './SearchBarStyled'

export const MiniSearchBar = (props) => {
    const [expanded, setExpanded] = useState(false)
    const [input, setInput] = useState('')
    const inputRef = useRef(null)
    const isInternalChange = useRef(false)

    useEffect(() => {
        if (props.value !== undefined && !isInternalChange.current)
            setInput(props.value)
        isInternalChange.current = false
    }, [props.value])


    const onInputChange = (e) => {
        isInternalChange.current = true
        setInput(e.target.value)


        if (props.searchOnChange) {
            if (e.target.value === '')
                props.onClear()
            else
                props.onSearch(e.target.value)
        }

    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter' && props.onSearch)
            props.onSearch(input)
    }

    const onClear = (e) => {
        setInput('')
        setExpanded(false)
        isInternalChange.current = true

        if (props.onClear)
            props.onClear()
    }

    const onBoxClick = () => {
        if (!expanded) {
            setExpanded(true)

            if (inputRef.current) {
                setTimeout(() => inputRef.current.focus(), 200)
            }
        }
    }

    return (
        <StyledBox expanded={expanded ? 1 : undefined} onClick={onBoxClick}>
            <StyledSearchIcon expanded={expanded ? 1 : undefined} />
            <StyledTextInput
                ref={inputRef}
                expanded={expanded ? 1 : undefined}
                type='text'
                value={input}
                onChange={onInputChange}
                onKeyPress={onKeyPress}
                placeholder={props.placeholder}
            />
            {expanded && <StyledClearIcon expanded={expanded ? 1 : undefined} onClick={onClear} />}
        </StyledBox>
    )
}

export default function SearchBar(props) {
    const [input, setInput] = useState(props.value || '')
    const isInternalChange = useRef(false)

    useEffect(() => {
        if (props.value !== undefined && !isInternalChange.current)
            setInput(props.value)
        isInternalChange.current = false
    }, [props.value])

    const onInputChange = (e) => {
        isInternalChange.current = true
        setInput(e.target.value)

        if (props.onChange && props.onChange instanceof Function)
            props.onChange(e.target.value)

    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter' && props.onSearch instanceof Function)
            props.onSearch(input)
    }

    const onClear = (e) => {
        isInternalChange.current = true
        setInput('')

        if (props.onChange)
            props.onChange('')

        if (props.onClear)
            props.onClear()
    }

    return (
        <div className='SearchBar' style={props.style}>
            <SearchOutlinedIcon />
            <input
                type='text'
                value={input}
                onChange={onInputChange}
                onKeyPress={onKeyPress}
                placeholder={props.placeholder} />
            {!props.icon && input && input !== '' && (
                <ClearIcon onClick={onClear} style={{ fontSize: 18, cursor: props.cursorClearIcon || "default", }} />
            )}
            {props.icon && <props.icon style={{ fontSize: 18, cursor: props.cursorClearIcon || "default", }} />}
        </div>
    )
}