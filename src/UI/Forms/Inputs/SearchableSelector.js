import { useEffect, useState } from "react"
import { Clear } from "@mui/icons-material"
import { styled, TextField, Autocomplete, Chip, Avatar } from "@mui/material"

import lodash from "lodash"

export default function SearchableSelector(props) {
    const [value, setValue] = useState(props.multiple ? [] : null)
    const [options, setOptions] = useState([])

    useEffect(() => {
        if (!props.options)
            return

        setOptions(oldOptions => {
            return lodash.uniqBy(oldOptions.concat(props.options), 'id')
        })
    }, [props.options])

    useEffect(() => {
        if (!props.value)
            return

        setOptions(oldOptions => {
            return lodash.uniqBy(oldOptions.concat(props.options), 'id')
        })
        setValue(props.value)
        // if props.value changed
    }, [props.value])

    const onChange = (event, newValue) => {
        if (props.onChange)
            props.onChange(newValue)
        else
            setValue(newValue)
    }

    const onInputChange = (event, newInputValue) => {
        if (props.onInputChange)
            props.onInputChange(event, newInputValue)
    }

    const getChipLabel = (option) => {
        if (props.getChipLabel) {
            return props.getChipLabel(option)
        } else {
            return option
        }
    }

    const Tag = props.variant === 'contained' ? Chip : CustomChip

    return (
        <Autocomplete
          style={props.style}
            multiple={props.multiple || false}
            options={props.options || []}
            selectOnFocus={props.selectOnFocus || true}
            clearOnBlur={props.clearOnBlur || true}
            value={props.value}
            loading={props.loading}
            getOptionLabel={props.getOptionLabel}
            isOptionEqualToValue={props.isOptionEqualToValue || ((option, value) => option?.id === value?.id)}
            onChange={onChange}
            onInputChange={onInputChange}
            renderOption={props.renderOption}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.label}
                    placeholder={props.placeholder}
                    fullWidth
                    onKeyPress={(event) => {
                        //params.onKeyPress(event)
                        props.onKeyPress(event)
                    }}
                />
            )}
            renderTags={(tagValue, getTagProps) => {
                return tagValue.map((option, index) => (
                    <Tag
                      variant={props.variant || 'outlined'}
                      {...getTagProps({ index })}
                      avatar={props.getChipAvatar ? (
                        <Avatar
                          alt={getChipLabel(option)} 
                          src={props.getChipAvatar(option)}
                        />
                      ) : null}
                      label={getChipLabel(option)}
                      deleteIcon={<Clear />}
                    />
                ));
            }}
        />
    )
}

const CustomChip = styled(Chip)(({ theme }) => ({
    border: "1px solid #d8d8d8",
    height: 50,
    width: "max-content",
    fontWeight: 600,
    borderRadius: 4,
    paddingLeft: 16,
    paddingRight: 16,
    margin: 8,

    '.MuiChip-deleteIcon': {
        color: 'red',//theme.palette.error.main,
        width: 16,
        height: 16,
        '&:hover': {
            color: theme.palette.error.dark,
            borderRadius: '50%',
        }
    }
}));