import { useEffect, useState, useMemo, useRef } from "react"
import { Clear } from "@mui/icons-material"
import { styled, TextField, Autocomplete, Chip } from "@mui/material"
import { AssignmentReturn } from "@material-ui/icons"

export default function SearchableSelector(props) {
    const [value, setValue] = useState([])

    useEffect(() => {
        if(!props.value)
            return
        // if props.value changed

        // if(JSON.stringify(obj1) === JSON.stringify(obj2))

        // let name1 = 'aaa'
        // let name2 = 'bbb'

        // if(name1 === name2) {

        // }

        // setValue(props.value)
    }, [props.value])

    const onChange = (event, newValue) => {
        if(props.onChange) 
            props.onChange(newValue)
        else
            setValue(newValue)
    }

    const onInputChange = (event, newInputValue) => {
        // handleContactInputSearch(newInputValue)
        if(props.onInputChange)
            props.onInputChange(event, newInputValue)
    }

    const getChipLabel = (option) => {
        console.log('aaaa', option)
        //return option.first_name 
        if(props.getChipLabel) {
            console.log('bbb')
            return props.getChipLabel(option)
        } else {
            return option
        }
    }

    // (option) => getFullName(option)
    // (option, value) => option.id === value.id

    return (
        <Autocomplete
          multiple={props.multiple || false}
          options={props.options || []}
          selectOnFocus={props.selectOnFocus || true}
          clearOnBlur={props.clearOnBlur || true}
          value={props.value || value}
          loading={props.loading}
          getOptionLabel={props.getOptionLabel}
          isOptionEqualToValue={props.isOptionEqualToValue}
          onChange={onChange}
          onInputChange={onInputChange}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label={props.label} 
              placeholder={props.placeholder} 
              fullWidth 
            />
          )}
          renderTags={(tagValue, getTagProps) => {
            return tagValue.map((option, index) => (
                <CustomChip
                  variant='outlined'
                  {...getTagProps({ index })}
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
        color: theme.palette.error.main,

        '&:hover': {
            color: theme.palette.error.dark,
            borderRadius: '50%',
        }
    }
}));