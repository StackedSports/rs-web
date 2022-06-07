import { useEffect, useState, useRef } from "react"
import { Input, InputAdornment, IconButton, styled } from "@mui/material"
import { Clear, Check, Edit } from "@mui/icons-material"

export const EditableLabel = (props) => {
    const [value, setValue] = useState('')
    const [editable, setEditable] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        if(props.value ==! undefined || props.value != null) 
        setValue(props.value)
    }, [props.value])

    const onEdit = (e) => {
        console.log('cliquei')
        props.onEdit(value)
        setEditable(false)
    }

    const onCancel = (e) => {
        setValue(props.value)
        setEditable(false)
    }

    const setEditableTrue = () => {
        setEditable(true)
        inputRef.current.focus()
    }

    return (
        <StyledInput
            multiline
            variant={editable ? "outlined" : "standard"}
            editable={editable ? "true" : undefined}
            inputRef={inputRef}
            disableUnderline={true}
            value={value}
            readOnly={!editable}
            onChange={(e) => setValue(e.target.value)}
            onClick={setEditableTrue}
            onBlur={onCancel}
            placeholder={props.placeholder}
            startAdornment={props.startAdornment}
            endAdornment={
                <InputAdornment position="end">
                    {!editable ?
                        <Edit /> :
                        <>
                            <IconButton color='error' onMouseDown={onCancel} >
                                <Clear />
                            </IconButton>
                            <IconButton color='success' onMouseDown={onEdit} >
                                <Check />
                            </IconButton>
                        </>
                    }

                </InputAdornment>
            }
        />
    )
}

export default EditableLabel

const StyledInput = styled(Input)(({ theme, editable }) => ({

    '& .MuiInputBase-input': {
        fontWeight: 'bold',

        '&:read-only': {
            cursor: 'pointer',
        },
    },

    ' .MuiInputAdornment-positionEnd': {
        visibility: editable ? 'visible' : 'hidden',
        cursor: 'pointer',
    },

    '&:hover .MuiInputAdornment-positionEnd': {
        visibility: 'visible',
    },
}));
