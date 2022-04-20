import { useEffect, useState, useMemo, useRef } from "react"
import { Clear } from "@mui/icons-material"
import { styled, TextField, Autocomplete, Chip } from "@mui/material"
import { AssignmentReturn } from "@material-ui/icons"
import lodash from "lodash"

export default function SearchableSelector(props) {
    const [value, setValue] = useState([])
    const [options,setOptions] = useState([])

    useEffect(() => {
        if(!props.options)
            return

        setOptions(oldOptions =>{
            return lodash.uniqBy(oldOptions.concat(props.options), 'id')
        })
    }, [props.options])

    useEffect(() => {
        if(!props.value)
            return

        setValue(props.value)
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
        if(props.onInputChange)
            props.onInputChange(event, newInputValue)
    }

    const getChipLabel = (option) => {
        if(props.getChipLabel) {
            return props.getChipLabel(option)
        } else {
            return option
        }
    }

    return (
        <Autocomplete
          multiple={props.multiple || false}
          options={options}
          selectOnFocus={props.selectOnFocus || true}
          clearOnBlur={props.clearOnBlur || true}
          value={props.value || value}
          loading={props.loading}
          getOptionLabel={props.getOptionLabel}
          isOptionEqualToValue={props.isOptionEqualToValue}
          onChange={onChange}
          onInputChange={onInputChange}
          renderOption={props.renderOption}
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