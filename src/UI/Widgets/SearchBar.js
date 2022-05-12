import './SearchBar.css'
import { useState, useRef } from 'react'

import { Box } from '@material-ui/core';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { styled, TextField, Autocomplete, Chip, Avatar } from "@mui/material"

import { StyledBox, StyledSearchIcon, StyledTextInput, StyledClearIcon } from './SearchBarStyled'

export const MiniSearchBar = (props) => {
    const [expanded, setExpanded] = useState(false)
    const [input, setInput] = useState('')
    const inputRef = useRef(null)

    const onInputChange = (e) => {
        setInput(e.target.value)

        // TODO: this is broken for some reason
        if (props.searchOnChange) {
            if (e.target.value === '')
                props.onClear()
            else
                props.onSearch(e.target.value)
        }

    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter')
            props.onSearch(input)
    }

    const onClear = (e) => {
        setInput('')
        setExpanded(false)

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
        <StyledBox expanded={expanded} onClick={onBoxClick}>
            <StyledSearchIcon expanded={expanded} />
            <StyledTextInput
                ref={inputRef}
                expanded={expanded}
                type='text'
                value={input}
                onChange={onInputChange}
                onKeyPress={onKeyPress}
                placeholder={props.placeholder}
            />
            {expanded && <StyledClearIcon expanded={expanded} onClick={onClear} />}
        </StyledBox>
    )
}

export default function SearchBar(props) {
    const [input, setInput] = useState('')

    const onInputChange = (e) => {
        setInput(e.target.value)

        // TODO: this is broken for some reason
        if (props.searchOnChange) {
            if (e.target.value === '')
                props.onClear()
            else
                props.onSearch(e.target.value)
        }

    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter')
            props.onSearch(input)
    }

    const onClear = (e) => {
        setInput('')

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